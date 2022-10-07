# Building a menu application with Eleventy

This repo contains an example Express server that allows the user to build a list of menus, and then displays those menus using Eleventy as a static site generator.

## Building

First, populate the `.env` file with values. Only `ELEVENTY_ROOT_DIRECTORY` is required - everything else is optional. Secondly, create a new SQlite database. An init script can be found at `db/init.sql`.

Then, run `npm install` followed by `npm run serve` to start the Express server.

## Usage

Navigate to http://localhost:3000/menu to add a new "menu" to the application. Once saved, the server will attempt to run Eleventy's build scripts at the location stored in `ELEVENTY_ROOT_DIRECTORY`. It will add `menus` to the global data, allowing the values to be used anywhere in the Eleventy site.