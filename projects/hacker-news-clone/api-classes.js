const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/**
 * This class maintains the list of individual Story instances
 *  It also has some methods for fetching, adding, and removing stories
 */

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /**
   * This method is designed to be called to generate a new StoryList.
   *  It:
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.*
   */

  static async getStories() {
    // query the /stories endpoint (no auth required) and create Story instances
    // from each returned story object
    const response = await axios.get(`${BASE_URL}/stories`);
    const stories = response.data.stories.map(story => new Story(story));

    // create a StoryList instance using the new array of stories
    const storyList = new StoryList(stories);
    return storyList;
  }

  /**
   * Adds a story to the stories list
   */

  async addStory(user, newStory) {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/stories`,
      data: {
        token: user.loginToken,
        story: newStory,
      }
    });

    // create a Story instance from the returned story object and add the
    // story to the stories and user's stories lists
    newStory = new Story(response.data.story);
    this.stories.unshift(newStory);
    user.ownStories.unshift(newStory);

    return newStory;
  }

  /**
   * Deletes a specified story from the story list
   */

  async removeStory(user, storyId) {
    await axios({
      url: `${BASE_URL}/stories/${storyId}`,
      method: "DELETE",
      data: {
        token: user.loginToken
      },
    });

    // remove specified story form the stories and user's stories lists
    this.stories = this.stories.filter(story => story.storyId !== storyId);
    user.ownStories = user.ownStories.filter(s => s.storyId !== storyId);
  }
}

/**
 * The User class represents the current user.
 *  There are helper methods to signup (create), login, and getLoggedInUser
 */

class User {
  constructor(userObj) {
    this.username = userObj.username;
    this.name = userObj.name;
    this.createdAt = userObj.createdAt;
    this.updatedAt = userObj.updatedAt;

    // these are all set to defaults, not passed in by the constructor
    this.loginToken = "";
    this.favorites = [];
    this.ownStories = [];
  }

  /* Create and return a new user.
   *
   * Makes POST request to API and returns newly-created user.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async create(username, password, name) {
    const response = await axios.post(`${BASE_URL}/signup`, {
      user: {
        username,
        password,
        name,
      }
    });

    // create a new User instance from the returned response and
    // attach the token to the newUser instance
    const newUser = new User(response.data.user);
    newUser.loginToken = response.data.token;

    return newUser;
  }

  /* Login in user and return user instance.

   * - username: an existing user's username
   * - password: an existing user's password
   */

  static async login(username, password) {
    const response = await axios.post(`${BASE_URL}/login`, {
      user: {
        username,
        password,
      }
    });

    // create a new User instance from the returned response
    const existingUser = new User(response.data.user);

    // instantiate Story instances for the user's favorites and ownStories
    existingUser.favorites = response.data.user.favorites.map(s => new Story(s));
    existingUser.ownStories = response.data.user.stories.map(s => new Story(s));

    // attach the token to the newUser instance for convenience
    existingUser.loginToken = response.data.token;

    return existingUser;
  }

  /** Get user instance for the logged-in-user.
   *
   * This function uses the token & username to make an API request to get details
   *   about the user. Then it creates an instance of user with that info.
   */

  static async getLoggedInUser(token, username) {
    // if we don't have user info, return null
    if (!token || !username) return null;

    // call the API
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      params: {
        token
      }
    });

    // instantiate the user from the API information
    const existingUser = new User(response.data.user);

    // attach the token to the newUser instance for convenience
    existingUser.loginToken = token;

    // instantiate Story instances for the user's favorites and ownStories
    existingUser.favorites = response.data.user.favorites.map(s => new Story(s));
    existingUser.ownStories = response.data.user.stories.map(s => new Story(s));

    return existingUser;
  }

  /**
   * Gets user details from the API and attaches them to the current user
   */

  async getUser() {
    const response = await axios.get(`${BASE_URL}/users/${this.username}`, {
      params: {
        token: this.loginToken
      }
    });

    // attaches returned details to the current user
    this.name = response.data.user.name;
    this.createdAt = response.data.user.createdAt;
    this.updatedAt = response.data.user.updatedAt;

    // creates new Story instances from the returned response and attaches them 
    // to the current user
    this.favorites = response.data.user.favorites.map(s => new Story(s));
    this.ownStories = response.data.user.stories.map(s => new Story(s));

    return this;
  }

  /**
   * Adds a story to the user's favorite stories
   */

  addFavorite(storyId) {
    // runs addOrRemoveFavorite as a POST
    return this.addOrRemoveFavorite(storyId, "POST");
  }

  /**
   * Removes a story from the user's favorite stories
   */

  removeFavorite(storyId) {
    // runs addOrRemoveFavorite as a DELETE
    return this.addOrRemoveFavorite(storyId, "DELETE");
  }

  /**
   * Add or remove a favorited story based on passed params
   */
  async addOrRemoveFavorite(storyId, addOrRemove) {
    await axios({
      url: `${BASE_URL}/users/${this.username}/favorites/${storyId}`,
      method: addOrRemove,
      data: {
        token: this.loginToken
      }
    });

    // updates the current user
    await this.getUser();
    return this;
  }
}

/**
 * Class to represent a single story.
 */

class Story {

  /**
   * The constructor is designed to take an object for better readability / flexibility
   * - storyObj: an object that has story properties in it
   */

  constructor(storyObj) {
    this.author = storyObj.author;
    this.title = storyObj.title;
    this.url = storyObj.url;
    this.username = storyObj.username;
    this.storyId = storyObj.storyId;
    this.createdAt = storyObj.createdAt;
    this.updatedAt = storyObj.updatedAt;
  }
}