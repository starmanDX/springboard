$(async function () {
  const $createAccountForm = $("#create-account-form"),
    $favoritedStories = $("#favorited-articles"),
    $filteredArticles = $("#filtered-articles"),
    $allStoriesList = $("#all-articles-list"),
    $navUserProfile = $("#nav-user-profile"),
    $allArticles = $('.articles-container'),
    $userProfile = $("#user-profile"),
    $submitForm = $("#submit-form"),
    $ownStories = $("#my-articles"),
    $navWelcome = $("#nav-welcome"),
    $loginForm = $("#login-form"),
    $navLogOut = $("#nav-logout"),
    $navSubmit = $("#nav-submit"),
    $navLogin = $("#nav-login"),
    $body = $("body");

  let storyList = null,
    currentUser = null;

  await checkIfLoggedIn();

  // event listener for clicking Login in the nav
  $navLogin.on("click", function () {
    // shows the login/creation forms and hides all stories
    $loginForm.slideToggle();
    $createAccountForm.slideToggle();
    $allStoriesList.toggle();
  });

  // event listener for logging in
  $loginForm.on("submit", async function (e) {
    e.preventDefault();
    const username = $("#login-username").val();
    const password = $("#login-password").val();

    // creates a user instance from the User login static method using the
    // username and password passed to the form
    const userInstance = await User.login(username, password);

    // sets the current user to the newly created user instance in JS and localStorage,
    // then runs login logic
    currentUser = userInstance;
    syncCurrentUserToLocalStorage();
    loginAndSubmitForm();
  });

  // event listener for signing up a new user
  $createAccountForm.on("submit", async function (e) {
    e.preventDefault();
    const name = $("#create-account-name").val();
    const username = $("#create-account-username").val();
    const password = $("#create-account-password").val();

    // creates a new user instance in the API using the username and password passed
    // to the form
    const newUser = await User.create(username, password, name);

    // sets the current user to the newly created user instance in JS and localStorage,
    // then runs login logic
    currentUser = newUser;
    syncCurrentUserToLocalStorage();
    loginAndSubmitForm();
  });

  // event listener for submitting an article
  $submitForm.on("submit", async function (e) {
    e.preventDefault();
    const title = $("#title").val();
    const url = $("#url").val();
    const hostName = getHostName(url);
    const author = $("#author").val();
    const username = currentUser.username

    // creates a new story object using addStory with passed params
    const storyObject = await storyList.addStory(currentUser, {
      title,
      author,
      url,
      username
    });

    // creates and appends HTML for the new story
    const $li = $(`
      <li id="${storyObject.storyId}" class="id-${storyObject.storyId}">
        <span class="star">
          <i class="far fa-star"></i>
        </span>
        <a class="article-link" href="${url}" target="a_blank">
          <strong>${title}</strong>
        </a>
        <small class="article-hostname ${hostName}">(${hostName})</small>
        <small class="article-author">by ${author}</small>
        <small class="article-username">posted by ${username}</small>
      </li>
    `);
    $allStoriesList.prepend($li);

    // resets and hides the submission form
    $submitForm.trigger("reset");
    $submitForm.slideUp("slow");
  });

  // event listener for starring stories as favorites
  $allArticles.on("click", ".star", async function (e) {
    if (currentUser) {
      const $target = $(e.target);
      const $closestLi = $target.closest("li");
      const storyId = $closestLi.attr("id");

      // if story is already favorited
      if ($target.hasClass("fas")) {
        // remove the story from the user's favorites and change the star type
        await currentUser.removeFavorite(storyId);
        $target.closest("i").toggleClass("fas far");
      } else {
        // add the story to the user's favorites and change the star type
        await currentUser.addFavorite(storyId);
        $target.closest("i").toggleClass("fas far");
      }
    }
  });

  // event listener for clicking the user profile in the nav
  $navUserProfile.on("click", function () {
    // hides everything except the user's profile info
    hideElements();
    $userProfile.show();
  });

  // event listener for clicking Submit in the nav
  $navSubmit.on("click", function () {
    if (currentUser) {
      // hides everything except the stories list and submission form
      hideElements();
      $allStoriesList.show();
      $submitForm.slideToggle();
    }
  });

  // event listener for clicking Favorites in the nav
  $body.on("click", "#nav-favorites", function () {
    // hides everything except the user's favorited stories
    hideElements();
    if (currentUser) {
      generateFavorites();
      $favoritedStories.show();
    }
  });

  // event listener for clicking the homepage header in the nav
  $body.on("click", "#nav-all", async function () {
    // hides everything except the stories list
    hideElements();
    await generateStories();
    $allStoriesList.show();
  });

  // event listener for clicking My Stories in the nav
  $body.on("click", "#nav-my-stories", function () {
    // hides everything except the user's created stories
    hideElements();
    if (currentUser) {
      $userProfile.hide();
      generateMyStories();
      $ownStories.show();
    }
  });

  // event listener for deleting a user created story
  $ownStories.on("click", ".trash-can", async function (e) {
    const $closestLi = $(e.target).closest("li");
    const storyId = $closestLi.attr("id");

    // removes the story from the API and reloads the stories
    await storyList.removeStory(currentUser, storyId);
    await generateStories();
    hideElements();
    $allStoriesList.show();
  });

  // event listener for logging out
  $navLogOut.on("click", function () {
    // clears localStorage and refreshes the page
    localStorage.clear();
    location.reload();
  });

  /**
   * On page load, checks local storage to see if the user is already logged in.
   * Renders page information accordingly.
   */

  async function checkIfLoggedIn() {
    //get token and username from localStorage if they exist
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    // get an instance of User with passed params
    currentUser = await User.getLoggedInUser(token, username);

    // generates stories
    await generateStories();

    // creates profile for current user and sets the nav
    if (currentUser) {
      generateProfile();
      showNavForLoggedInUser();

    }
  }

  /**
   * A rendering function to run to reset the forms and hide the login info
   */

  function loginAndSubmitForm() {
    // hides/resets the login and user creation forms and shows all stories
    $loginForm.hide();
    $createAccountForm.hide();
    $loginForm.trigger("reset");
    $createAccountForm.trigger("reset");
    $allStoriesList.show();

    // updates the nav bar and creates a user profile
    showNavForLoggedInUser();
    generateProfile();
  }

  /**
   * Creates a new user profile
   */

  function generateProfile() {
    $("#profile-name").text(`Name: ${currentUser.name}`);
    $("#profile-username").text(`Username: ${currentUser.username}`);
    $("#profile-account-date").text(
      `Account Created: ${currentUser.createdAt.slice(0, 10)}`
    );

    // sets the nav bar to show the username
    $navUserProfile.text(`${currentUser.username}`);
  }

  /**
   * Creates and displays stories
   */

  async function generateStories() {
    // creates a StoryList instance, updates the global variable, and clears the current list
    const storyListInstance = await StoryList.getStories();
    storyList = storyListInstance;
    $allStoriesList.empty();

    // creates and appends HTML for each new story
    for (let story of storyList.stories) {
      const result = generateStoryHTML(story);
      $allStoriesList.append(result);
    }
  }

  /**
   * A render method to render HTML for an individual Story instance
   * - story: an instance of Story
   * - isOwnStory: was the story posted by the current user
   */

  function generateStoryHTML(story, isOwnStory) {
    let hostName = getHostName(story.url);
    let starType = isFavorite(story) ? "fas" : "far";

    // create HTML for delete icon
    const trashCanIcon = isOwnStory ?
      `<span class="trash-can">
          <i class="fas fa-trash-alt"></i>
        </span>` :
      "";

    // create HTML for the story
    const storyMarkup = $(`
      <li id="${story.storyId}">
        ${trashCanIcon}
        <span class="star">
          <i class="${starType} fa-star"></i>
        </span>
        <a class="article-link" href="${story.url}" target="a_blank">
          <strong>${story.title}</strong>
          </a>
        <small class="article-author">by ${story.author}</small>
        <small class="article-hostname ${hostName}">(${hostName})</small>
        <small class="article-username">posted by ${story.username}</small>
      </li>
    `);

    return storyMarkup;
  }

  /**
   * Creates the favorites list
   */

  function generateFavorites() {
    // clears the current favorites list
    $favoritedStories.empty();

    // displays if the user has no current favorites
    if (currentUser.favorites.length === 0) {
      $favoritedStories.append("<h5>No favorites added!</h5>");
    } else {
      for (let story of currentUser.favorites) {
        // appends each favorited story to the favorites list
        let favoriteHTML = generateStoryHTML(story, false, true);
        $favoritedStories.append(favoriteHTML);
      }
    }
  }

  /**
   * Creates the user's stories list
   */

  function generateMyStories() {
    // clears the current user stories list
    $ownStories.empty();

    // displays if the user has no created stories
    if (currentUser.ownStories.length === 0) {
      $ownStories.append("<h5>You haven't created any stories yet.</h5>");
    } else {
      for (let story of currentUser.ownStories) {
        // appends each user created story to the user created stories list
        let ownStoryHTML = generateStoryHTML(story, true);
        $ownStories.append(ownStoryHTML);
      }
    }

    $ownStories.show();
  }


  /**
   * Hides all elements in the elementsArr array
   */

  function hideElements() {
    const elementsArr = [
      $submitForm,
      $allStoriesList,
      $filteredArticles,
      $ownStories,
      $userProfile,
      $favoritedStories,
      $loginForm,
      $createAccountForm,
      $userProfile
    ];
    // hides each element in the elementsArr array
    elementsArr.forEach($elem => $elem.hide());
  }

  /**
   * Shows the Logged In User nav bar
   */

  function showNavForLoggedInUser() {
    // hides the login nav bar and shows the nav bar for a logged in user
    $navLogin.hide();
    $userProfile.hide();
    $(".main-nav-links, #user-profile").toggleClass("hidden");
    $navWelcome.show();
    $navLogOut.show();
  }

  /**
   * Checks if a specified story is in the user's favorites list
   */

  function isFavorite(story) {
    let favoriteStories = new Set();
    if (currentUser) {
      favoriteStories = new Set(currentUser.favorites.map(obj => obj.storyId));
    }
    return favoriteStories.has(story.storyId);
  }

  /**
   * Pulls the hostname from a URL
   */

  function getHostName(url) {
    let hostName;
    if (url.indexOf("://") > -1) {
      hostName = url.split("/")[2];
    } else {
      hostName = url.split("/")[0];
    }
    if (hostName.slice(0, 4) === "www.") {
      hostName = hostName.slice(4);
    }
    return hostName;
  }

  /**
   * Adds current user info to localStorage
   */

  function syncCurrentUserToLocalStorage() {
    if (currentUser) {
      // adds token and username of current use to localStorage
      localStorage.setItem("token", currentUser.loginToken);
      localStorage.setItem("username", currentUser.username);
    }
  }
});