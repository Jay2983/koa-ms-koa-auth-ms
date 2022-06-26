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
The end user provides a username and a password and the credentials are sent to the server-side
The server-side Koa app then checks the credentials against the database
If they are correct, the end user is redirected to /auth/status
If they are incorrect, the end user is redirected to /auth/login



**What is Koa?**
Koa is a web framework for Node.js.

Although it’s designed by the same team that created Express, it’s much lighter than Express though - so it comes with very little out of the box. It’s really just a tiny wrapper on top of Node’s HTTP module. Koa allows you - the developer - to pick and choose the tools you want to use from the community.

It has native support for async/await, which makes it easier and faster to develop an API since you don’t have to deal with callbacks and callback hell.

Finally, since Koa has similar patterns to Express, it’s relatively easy to pick up if you’ve worked at all with Express.
