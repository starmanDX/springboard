# Blogly

This is a multi-unit exercise to practice SQLAlchemy with relationships. Each part corresponds to a unit so make sure that you complete one part and then go onto the next unit.

In it, you’ll build “Blogly”, a blogging application.

## Part One

### Installing Tools

    (env) $ pip install psycopg2-binary
    (env) $ pip install flask-sqlalchemy

### Create User Model

First, create a User model for SQLAlchemy. Put this in a models.py file.

It should have the following columns:

- id, an autoincrementing integer number that is the primary key
- first_name and last_name
- image_url for profile images

Make good choices about whether things should be required, have defaults, and so on.

### Create Flask App

Next, create a skeleton Flask app. You can pattern match from the lecture demo.

It should be able to import the User model, and create the tables using SQLAlchemy. Make sure you have the FlaskDebugToolbar installed — it’s especially helpful when using SQLAlchemy.

### Make a Base Template

Add a base template with slots for the page title and content. Your other templates should use this.

You can use Bootstrap for this project, but don’t spend a lot of time worrying about styling — this is not a goal of this exercise.

### Make Routes For Users

Note: We Won’t Be Adding Authentication

While this appliction will have “users”, we’re not going to be building login/logout, passwords, or other such thing in this application. Any visitor to the site should be able to see all users, add a user, or edit any user.

Make routes for the following:

GET /
Redirect to list of users. (We’ll fix this in a later step).
GET /users
Show all users.

    Make these links to view the detail page for the user.

    Have a link here to the add-user form.

GET /users/new
Show an add form for users
POST /users/new
Process the add form, adding a new user and going back to /users
GET /users/[user-id]
Show information about the given user.

    Have a button to get to their edit page, and to delete the user.

GET /users/[user-id]/edit
Show the edit page for a user.

    Have a cancel button that returns to the detail page for a user, and a save button that updates the user.

POST /users/[user-id]/edit
Process the edit form, returning the user to the /users page.
POST /users/[user-id]/delete
Delete the user.

### Add Testing

Add python tests to at least 4 of your routes.

## Further Study: Part One

There are two more big parts to this exercise—but if you feel like you’re ahead of the group, here is some further study for this part you can work on.

### Add Full Name Method

It’s likely that you refer to users by {{ user.first_name }} {{ user.last_name }} in several of your templates. This is mildly annoying to have to keep writing out, but a big annoyance awaits: what would happen if you added, say, a middle_name field? You’d have to find & fix this in every template.

Better would be to create a convenience method, get_full_name(), which you could use anywhere you wanted the users’ full name:

> > > u = User.query.first()

> > > u.first_name # SQLAlchemy attribute
> > > 'Jane'

> > > u.last_name # SQLAlchemy attribute
> > > 'Smith'

> > > u.get_full_name()
> > > 'Jane Smith'

Write this.

Change your templates and routes to use this.

### List Users In Order

Make your listing of users order them by last_name, first_name.

You can have SQLAlchemy do this—you don’t need to do it yourself in your route.

### Turn Full Name Into a “Property”

Research how to make a Python “property” on a class — this is something that is used like an attribute, but actually is a method. This will let you do things like:

> > > u = User.query.first()

> > > u.first_name # SQLAlchemy attribute
> > > 'Jane'

> > > u.last_name # SQLAclhemy attribute
> > > 'Smith'

> > > u.full_name # "property"
> > > 'Jane Smith'

## Part Two: Adding Posts

In this part, we’ll add functionality for blog posts using the one-to-many features of SQLAlchemy.

### Post Model

Next, add another model, for blog posts (call it Post).

Post should have an:

- id, like for User
- title
- content
- created_at a date+time that should automatically default to the when the post is created
- a foreign key to the User table

### Add Post Routes

GET /users/[user-id]/posts/new
Show form to add a post for that user.

POST /users/[user-id]/posts/new
Handle add form; add post and redirect to the user detail page.

GET /posts/[post-id]
Show a post.

    Show buttons to edit and delete the post.

GET /posts/[post-id]/edit
Show form to edit a post, and to cancel (back to user page).

POST /posts/[post-id]/edit
Handle editing of a post. Redirect back to the post view.

POST /posts/[post-id]/delete
Delete the post.

### Change the User Page

Change the user page to show the posts for that user.

### Testing

Update any broken tests and add more testing

### Celebrate!

Yay! Congratulations on the first big two parts.

## Further Study: Part Two

There are several possible additional tasks here.

### Make a Homepage

Change the homepage to a page that shows the 5 most recent posts.

### Show Friendly Date

When listing the posts (on the post index page, the homepage, and the user detail page), show a friendly-looking version of the date, like “May 1, 2015, 10:30 AM”.

### Using Flash Messages for Notifications

Use the Flask “flash message” feature to notify about form errors/successful submissions.

### Add a Custom “404 Error Page”

Research how to make a custom page that appears when a 404 error happens in Flask. Make such a page.

### Cascade Deletion of User

If you try to delete a user that has posts, you’ll get an IntegrityError — PostgreSQL raises an error because that would leave posts without a valid user_id.

When a user is deleted, the related posts should be deleted, too.

## Part Three: Add M2M Relationship

The last part will be to add a “tagging” feature.

### Tag Model

The site will have a table of tags — there should be an SQLAlchemy model for this:

- id
- name, (unique!)

There should also be a model for PostTag, which joins together a Post and a Tag. It will have foreign keys for the both the post_id and tag_id. Since we don’t want the same post to be tagged to the same tag more than once, we’ll want the combination of post + tag to be unique. It also makes sense that neither the post_id nor tag_id can be null. Therefore, we’ll use a “composite primary key” for this table— a primary key made of more than one field. You may have to do some research to learn how to do this in SQLAlchemy.

Add relationships so you can see the .tags for a post, and the .posts for a tag.

STOP and play around with this feature in IPython before continuing.

### Add Routes

GET /tags
Lists all tags, with links to the tag detail page.
GET /tags/[tag-id]
Show detail about a tag. Have links to edit form and to delete.
GET /tags/new
Shows a form to add a new tag.
POST /tags/new
Process add form, adds tag, and redirect to tag list.
GET /tags/[tag-id]/edit
Show edit form for a tag.
POST /tags/[tag-id]/edit
Process edit form, edit tag, and redirects to the tags list.
POST /tags/[tag-id]/delete
Delete a tag.

### Update Routes for Posts

Update the route that shows a post so that it shows all the tags for that post.

Update the routes for adding/editing posts so that it shows a listing of the tags and lets you pick which tag(s) apply to that post. (You can use whatever form element you want here: a multi-select, a list of checkboxes, or any other way you can solve this.

Hint

    Getting Multiple Values From Form

    The normal way to get a value from a form, request.form['key'], only returns one value from this form. To get all of the values for that key in the form, you’ll want to investigate .getlist.
