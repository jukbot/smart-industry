# App Status

[![Build Status](https://travis-ci.org/jukbot/smart-industry.svg?branch=master)](https://travis-ci.org/jukbot/smart-industry)

## What is Polymer ?

Polymer is a lightweight library built on top of the web standards-based [Web Components](http://webcomponents.org/) API's, and makes it easier to build your very own custom HTML elements. Creating reusable custom elements - and using elements built by others - can make building complex web applications easier and more efficient. By being based on the Web Components API's built in the browser (or [polyfilled](https://github.com/webcomponents/webcomponentsjs) where needed), Polymer elements are interoperable at the browser level, and can be used with other frameworks or libraries that work with modern browsers.

Among many ways to leverage custom elements, they can be particularly useful for building reusable UI components. Instead of continually re-building a specific navigation bar or button in different frameworks and for different projects, you can define this element once using Polymer, and then reuse it throughout your project or in any future project.

Polymer provides a declarative syntax to easily create your own custom elements, using all standard web technologies - define the structure of the element with HTML, style it with CSS, and add interactions to the element with JavaScript.

Polymer also provides optional two-way data-binding, meaning:

1. When properties in the model for an element get updated, the element can update itself in response.
2. When the element is updated internally, the changes can be propagated back to the model.

Polymer is designed to be flexible, lightweight, and close to the web platform - the library doesn't invent complex new abstractions and magic, but uses the best features of the web platform in straightforward ways to simply sugar the creation of custom elements.

In addition to the Polymer library for building your own custom elements, the Polymer project includes a collection of [pre-built elements](https://elements.polymer-project.org) that you can  drop on a page and use immediately, or use as starting points for your own custom elements.


The PRPL pattern, in a nutshell:

* **Push** components required for the initial route
* **Render** initial route ASAP
* **Pre-cache** components for remaining routes
* **Lazy-load** and progressively upgrade next routes on-demand

### Migrating from Polymer Starter Kit v1?

[Check out our blog post that covers what's changed in PSK2 and how to migrate!](https://www.polymer-project.org/1.0/blog/2016-08-18-polymer-starter-kit-or-polymer-cli.html)

### Setup

##### Prerequisites

NodeJS version >= 6.x

    https://nodejs.org/en/

Install [polymer-cli](https://github.com/Polymer/polymer-cli):

    npm install -g polymer-cli

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
The minified files are output to the `build/unbundled` folder, and are suitable
for serving from a HTTP/2+Push compatible server.

In addition the command also creates a fallback `build/bundled` folder,
generated using fragment bundling, suitable for serving from non
H2/push-compatible servers or to clients that do not support H2/Push.

    polymer build --add-service-worker

### Preview the build

This command serves the minified version of the app at `http://localhost:8080`
in an unbundled state, as it would be served by a push-compatible server:

    polymer serve build/unbundled

This command serves the minified version of the app at `http://localhost:8080`
generated using fragment bundling:

    polymer serve build/bundled

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
