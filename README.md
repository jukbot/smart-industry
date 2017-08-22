# About IMES

[![Build Status](https://travis-ci.org/jukbot/smart-industry.svg?branch=master)](https://travis-ci.org/jukbot/smart-industry)
[![Build status](https://ci.appveyor.com/api/projects/status/9xe5idqvwiy1a812/branch/master?svg=true)](https://ci.appveyor.com/project/jukbot/smart-industry/branch/master)
[![GitHub (pre-)release](https://img.shields.io/github/release/jukbot/smart-industry/all.svg)](https://github.com/jukbot/smart-industry/releases/)
[![Waffle.io](https://img.shields.io/waffle/label/jukbot/smart-industry/in%20progress.svg)](https://waffle.io/jukbot/smart-industry)

### Demo User Login 

[Login here](https://smart-mes.firebaseapp.com/)


    E-mail: demo@imes.in.th
    Password: demouser


This template is a starting point for building apps using a drawer-based
layout. The layout is provided by `app-layout` elements.

This template, along with the `polymer-cli` toolchain, also demonstrates use
of the "PRPL pattern" This pattern allows fast first delivery and interaction with
the content at the initial route requested by the user, along with fast subsequent
navigation by pre-caching the remaining components required by the app and
progressively loading them on-demand as the user navigates through the app.

The PRPL pattern, in a nutshell:

* **Push** components required for the initial route
* **Render** initial route ASAP
* **Pre-cache** components for remaining routes
* **Lazy-load** and progressively upgrade next routes on-demand

### Migrating from Polymer Starter Kit v1?

[Check out our blog post that covers what's changed in PSK2 and how to migrate!](https://www.polymer-project.org/1.0/blog/2016-08-18-polymer-starter-kit-or-polymer-cli.html)

### Setup Project

##### Prerequisites

NodeJS version >= 6.x

    https://nodejs.org/en/

Install [polymer-cli](https://github.com/Polymer/polymer-cli):

    npm install -g polymer-cli

`Note: polymer-cli is not able to install with npm version 5.x.x for now. Please use yarn or npm version 4.x.x to install.`

Install bower:

    npm install -g bower


### Start the development server

This command serves the app at `http://localhost:8080` and provides basic URL
routing for the app:

    polymer serve --open


### Build

This command performs HTML, CSS, and JS minification on the application
dependencies, and generates a service-worker.js file with code to pre-cache the
dependencies based on the entrypoint and fragments specified in `polymer.json`.
The output files are in `build/default` which suitable for serving from a HTTP/2+Push compatible server.

Build the project: 

    polymer build

### Preview the build

This command serves the minified version of the app at `http://127.0.0.1:8081`
in an unbundled state, as it would be served by a push-compatible server:

    polymer serve --open

This command serves the production version of the app at `http://localhost:8080`
generated using fragment bundling:

    polymer serve build/default

### Run tests

This command will run
[Web Component Tester](https://github.com/Polymer/web-component-tester) against the
browsers currently installed on your machine.

    polymer test

### Adding a new view

You can extend the app by adding more views that will be demand-loaded
e.g. based on the route, or to progressively render non-critical sections
of the application.  Each new demand-loaded fragment should be added to the
list of `fragments` in the included `polymer.json` file.  This will ensure
those components and their dependencies are added to the list of pre-cached
components (and will have bundles created in the fallback `bundled` build).
