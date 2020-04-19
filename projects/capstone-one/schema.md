# Database Schema

## Users Table

id - int, primary key
username - text, unique, not null
password - text, not null

## Favorites Table

id - int, primary key
location - text, not null
path - text, not null
title - text, not null
excerpt - text, not null
image - text
published_date - date, not null
favorited_by - int, foreign key references users.id