![GitHub CI](https://github.com/Jay2983/koa-ms-koa-auth-ms/actions/workflows/node.js.yml/badge.svg)

**This repo has been created using the create koa application.**

**Pre-Reqs:**
 - Postgres DB running on 5432(default port)
 - Postgres DB with the DB name koa_api_auth
 Use the below script if using for the first time ->  CREATE DATABASE koa_api_auth;

The repo include the nodejs microservice for user auth and exposes the below api's:

**Routes:**

URL	                HTTP Verb	    Authenticated?	    Result
/auth/register	     GET	             No	                Render the register view
/auth/register	     POST	            No	                Register a new user
/auth/login	        GET	             No	                Render the login view
/auth/login	        POST	            No	                Log a user in
/auth/status	       GET	            Yes	                Render the status page
/auth/logout	       GET	            Yes	                Log a user out

**Full Authentication flow:**
First flow:
User submits auth credentials (username and password), which are then sent to the server via a POST request to /auth/login.
passport.authenticate() is called and the credentials are checked against the user info stored in the database.
If the credentials are correct, passport.serializeUser() is fired and the user id is serialized to the Redis session store via the ctx.login() method.
Finally, a cookie is generated, which is sent back with the response to the client and that cookie is then set.

Second flow:
An authenticated user hits a route requiring a user to be authenticated (like /auth/status).
isAuthenticated() is called, which then verifies that (a) a user is in session and (b) that user is found within the database (via passport.deserializeUser()).
If correct, the end user is allowed to view the route and the appropriate response is sent.



**What is Koa?**
Koa is a web framework for Node.js.

Although it’s designed by the same team that created Express, it’s much lighter than Express though - so it comes with very little out of the box. It’s really just a tiny wrapper on top of Node’s HTTP module. Koa allows you - the developer - to pick and choose the tools you want to use from the community.

It has native support for async/await, which makes it easier and faster to develop an API since you don’t have to deal with callbacks and callback hell.

Finally, since Koa has similar patterns to Express, it’s relatively easy to pick up if you’ve worked at all with Express.
