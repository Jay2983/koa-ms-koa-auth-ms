-- #MAC Users
-- Pre-requisite:
-- Install PG SQL using brew
-- brew install postgresql
-- Login
-- psql -U postgres
-- Create a user and database
CREATE database koa_api_auth;
CREATE USER koa_api_auth WITH PASSWORD 'koa_api_auth';
-- Create roles as superuser if the above doesnt work
--CREATE ROLE dummy WITH LOGIN SUPERUSER PASSWORD '123456'; -- This is for testing
