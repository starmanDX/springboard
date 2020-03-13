# Data Modeling Exercise

In this exercise, you’ll be doing some data modeling and schema design! For each of these exercises, diagram what the tables and relationships should look like as well as some other things you might want to store/potential challenges with the model and/or information you are storing.

Once you’re satisfied with your design, write out the DDL operations you’d need in order to create the tables and columns that you’ve identified. Then try to insert some data into your database and ensure that it works the way you’d expect.

## Section 1: Schema Design

Note: Code Review

After completing these schemas, be sure to chat with your mentor and ask for a code review.

### Part One: Medical Center

Design the schema for a medical center.

- A medical center employs several doctors
- A doctors can see many patients
- A patient can be seen by many doctors
- During a visit, a patient may be diagnosed to have one or more diseases.

### Part Two: Craigslist

Design a schema for Craigslist! Your schema should keep track of the following

- The region of the craigslist post (San Francisco, Atlanta, Seattle, etc)
- Users and preferred region
- Posts: contains title, text, the user who has posted, the location of the posting, the region of the posting
- Categories that each post belongs to

### Part Three: Soccer League

Design a schema for a simple sports league. Your schema should keep track of

- All of the teams in the league
- All of the goals scored by every player for each game
- All of the players in the league and their corresponding teams
- All of the referees who have been part of each game
- All of the matches played between teams
- All of the start and end dates for season that a league has
- The standings/rankings of each team in the league (This doesn’t have to be its own table if the data can be captured somehow).

## Part 2: Schema Critique

We’ve provided you with a handful of SQL files that will create some databases and populate them with some data. Run each of the seed files and take a look at the data that’s generated. Next, think about how you could improve the schema. Finally, modify the original seed files based on your updated schema!

### Schema One: Outer Space

To get the data:

    $ psql < outer_space.sql

### Schema Two: Air Traffic

To get the data:

    $ psql < air_traffic.sql

### Schema Three: Music

To get the data:

    $ psql < music.sql
