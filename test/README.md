**TDD**
Test Driven Development (TDD) is an iterative development cycle that emphasizes writing automated tests before writing the actual code.

**Why?**
Helps break down problems into manageable pieces since you should have a better understanding of what you’re going to write
Forces you to write cleaner code
Prevents over coding
Red-Green-Refactor
TDD often follows the “Red-Green-Refactor” development cycle:

RED: Write a test, which should fail when you run it
GREEN: Write just enough code for the test to pass
REFACTOR: Refactor code and retest, again and again (if necessary)

Install steps:
npm install mocha chai chai-http --save-dev
npm install pg knex --save
knex migrate:latest --env development
knex seed:run --env development