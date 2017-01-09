# Restful API

An API to manage a user persistence layer with basic CRUD (create, read, update and delete) functionality. An individual user have the following attributes:

**id** - *A unique user id*  
**email** - *A users email address*  
**forename** - *A users first name*  
**surname** - *A users last name*  
**createdAt** - *The date and time the user was added*

The app is deployed to Heroku at https://infinite-tundra-39507.herokuapp.com/api/users.

## Prerequisites
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://docs.mongodb.com/manual/installation/)

## Installation
From the command line:
```
$ git clone https://github.com/yyl29/restful-api
$ cd restful-api
$ npm install
```

## Usage
To start the server locally:
```
$ npm start
```

Then go to http://localhost:3000/api in your browser. The API can be consumed using [Postman](https://www.getpostman.com). The endpoints are:

Endpoint          | Usage
------------------|------------------------
GET /users        | Get all users
GET /users/{id}   | Get a user
POST /users       | Create a user
PUT /users{id}    | Change a user's details
DELETE /users{id} | Remove a user

## Test
From the command line:
```
$ npm test
```

And generate a coverage report with:
```
$ npm test --coverage
```
