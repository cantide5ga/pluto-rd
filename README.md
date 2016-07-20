# Pluto Rd
In progress dead simple blogging library with word cloud navigation.

Lib consumers will:
- implement a driver to return Entries and Keywords (call a database, pull from file system, static code, whatever!)
- use well defined selectors to style
- optionally use JSX to structure the view
- optionally use Typescript definitions with Typings
- optionally use a Browserified script instead of npm

##Demo
From project root, execute `npm run build`, start a local server, and navigate to /reference/

Uses plain js, a Browserified bundle, and connects to static data.