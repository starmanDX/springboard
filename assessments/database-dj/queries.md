Make sure you download the starter code and run the following:

```sh
  psql < movies.sql
  psql movies_db
```

In markdown, you can place a code block inside of three backticks (```) followed by the syntax highlighting you want, for example

```sql

SELECT * FROM users;

```

Using the `movies_db` database, write the correct SQL queries for each of these tasks:

1.  The title of every movie.
    ```sql

    SELECT title FROM movies;

    ```

2.  All information on the G-rated movies.
    ```sql

    SELECT * FROM movies WHERE rating = 'G';

    ```

3.  The title and release year of every movie, ordered with the oldest movie first.
    ```sql

    SELECT title, release_year FROM movies ORDER BY release_year;

    ```
    
4.  All information on the 5 longest movies.
    ```sql

    SELECT * FROM movies ORDER BY runtime DESC LIMIT 5;

    ```

5.  A query that returns the columns of `rating` and `total`, tabulating the total number of G, PG, PG-13, and R-rated movies.
    ```sql

    SELECT rating, COUNT(rating) total FROM movies GROUP BY rating;

    ```

6.  A table with columns of `release_year` and `average_runtime`, tabulating the average runtime by year for every movie in the database. The data should be in reverse chronological order (i.e. the most recent year should be first).
    ```sql

    SELECT  release_year, AVG(runtime) average_runtime FROM movies GROUP BY release_year ORDER BY release_year DESC;

    ```

7.  The movie title and studio name for every movie in the database.
    ```sql

    SELECT title, name FROM movies JOIN studios on movies.studio_id=studios.id;

    ```

8.  The star first name, star last name, and movie title for every matching movie and star pair in the database.
    ```sql

    SELECT first_name, last_name, title FROM stars, movies, roles WHERE stars.id=roles.star_id AND movies.id=roles.movie_id;

    ```

9.  The first and last names of every star who has been in a G-rated movie. The first and last name should appear only once for each star, even if they are in several G-rated movies. *IMPORTANT NOTE*: it's possible that there can be two *different* actors with the same name, so make sure your solution accounts for that.
    ```sql

    SELECT first_name, last_name FROM stars, movies, roles WHERE stars.id=roles.star_id AND movies.id=roles.movie_id AND movies.rating='G' GROUP BY stars.id;

    ```

10. The first and last names of every star along with the number of movies they have been in, in descending order by the number of movies. (Similar to #9, make sure that two different actors with the same name are considered separately).
    ```sql

    SELECT first_name, last_name, COUNT(*) count FROM stars, movies, roles WHERE stars.id=roles.star_id AND movies.id=roles.movie_id GROUP BY stars.id;

    ```

### The rest of these are bonuses

11. The title of every movie along with the number of stars in that movie, in descending order by the number of stars.
    ```sql

    SELECT title, COUNT(*) stars FROM stars, movies, roles WHERE stars.id=roles.star_id AND movies.id=roles.movie_id GROUP BY movies.id ORDER BY stars DESC;

    ```

12. The first name, last name, and average runtime of the five stars whose movies have the longest average.
    ```sql

    SELECT first_name, last_name, AVG(runtime) avg_runtime FROM stars, movies, roles WHERE stars.id=roles.star_id AND movies.id=roles.movie_id GROUP BY stars.id ORDER BY avg_runtime DESC LIMIT 5;

    ```

13. The first name, last name, and average runtime of the five stars whose movies have the longest average, among stars who have more than one movie in the database.
    ```sql

    SELECT first_name, last_name, AVG(runtime) avg_runtime FROM stars, movies, roles WHERE stars.id=roles.star_id AND movies.id=roles.movie_id GROUP BY stars.id HAVING COUNT(*) > 1 ORDER BY avg_runtime DESC LIMIT 5;

    ```

14. The titles of all movies that don't feature any stars in our database.
    ```sql

    SELECT title FROM movies FULL JOIN roles ON movies.id=roles.movie_id WHERE star_id IS NULL;

    ```

15. The first and last names of all stars that don't appear in any movies in our database.
    ```sql

    SELECT first_name, last_name FROM stars FULL JOIN roles ON stars.id = roles.star_id WHERE roles.id IS NULL;

    ```

16. The first names, last names, and titles corresponding to every role in the database, along with every movie title that doesn't have a star, and the first and last names of every star not in a movie.
    ```sql

    SELECT first_name, last_name, title FROM stars LEFT JOIN roles on stars.id=roles.star_id FULL OUTER JOIN movies on movies.id=roles.movie_id;

    ```    