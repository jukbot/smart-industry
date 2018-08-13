/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';

import { sharedStyles } from './shared-styles.js';

class MyView1 extends PolymerElement {
  static get template() {
    return html `
      ${sharedStyles}
      <style>
        :host {
          display: block;
          padding: 10px;
        }

        .gantt .grid-background {
  fill: none; }

.gantt .grid-header {
  fill: #ffffff;
  stroke: #e0e0e0;
  stroke-width: 1.4; }

.gantt .grid-row {
  fill: #ffffff; }

.gantt .grid-row:nth-child(even) {
  fill: #f5f5f5; }

.gantt .row-line {
  stroke: #ebeff2; }

.gantt .tick {
  stroke: #e0e0e0;
  stroke-width: 0.2; }
  .gantt .tick.thick {
    stroke-width: 0.4; }

.gantt .today-highlight {
  fill: #fcf8e3;
  opacity: 0.5; }

.gantt .arrow {
  fill: none;
  stroke: #666;
  stroke-width: 1.4; }

.gantt .bar {
  fill: #b8c2cc;
  stroke: #8D99A6;
  stroke-width: 0;
  transition: stroke-width .3s ease;
  user-select: none; }

.gantt .bar-progress {
  fill: #a3a3ff; }

.gantt .bar-invalid {
  fill: transparent;
  stroke: #8D99A6;
  stroke-width: 1;
  stroke-dasharray: 5; }
  .gantt .bar-invalid ~ .bar-label {
    fill: #555; }

.gantt .bar-label {
  fill: #fff;
  dominant-baseline: central;
  text-anchor: middle;
  font-size: 12px;
  font-weight: lighter; }
  .gantt .bar-label.big {
    fill: #555;
    text-anchor: start; }

.gantt .handle {
  fill: #ddd;
  cursor: ew-resize;
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s ease; }

.gantt .bar-wrapper {
  cursor: pointer;
  outline: none; }
  .gantt .bar-wrapper:hover .bar {
    fill: #a9b5c1; }
  .gantt .bar-wrapper:hover .bar-progress {
    fill: #8a8aff; }
  .gantt .bar-wrapper:hover .handle {
    visibility: visible;
    opacity: 1; }
  .gantt .bar-wrapper.active .bar {
    fill: #a9b5c1; }
  .gantt .bar-wrapper.active .bar-progress {
    fill: #8a8aff; }

.gantt .lower-text, .gantt .upper-text {
  font-size: 12px;
  text-anchor: middle; }

.gantt .upper-text {
  fill: #555; }

.gantt .lower-text {
  fill: #333; }

.gantt .hide {
  display: none; }

.gantt-container {
  position: relative;
  overflow: auto;
  font-size: 12px; }
  .gantt-container .popup-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    padding: 0;
    color: #959da5;
    border-radius: 3px; }
    .gantt-container .popup-wrapper .title {
      border-bottom: 3px solid #a3a3ff;
      padding: 10px; }
    .gantt-container .popup-wrapper .subtitle {
      padding: 10px;
      color: #dfe2e5; }
    .gantt-container .popup-wrapper .pointer {
      position: absolute;
      height: 5px;
      margin: 0 0 0 -5px;
      border: 5px solid transparent;
      border-top-color: rgba(0, 0, 0, 0.8); }

      </style>

      <div class="card">
       <svg id="gantt"></svg>
        <div class="circle">1</div>
        <h1>View One</h1>
        <button on-click="addData">Add Data</button>
        <button on-click="testAlert">Test Alert</button>
        <p>Ut labores minimum atomorum pro. Laudem tibique ut has.</p>
        <p>Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Cu mei vide viris gloriatur, at populo eripuit sit.</p>
      </div>
    `;
  }

  static get properties() {
    return {
      tasks: Array
    };
  }

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
    this.textContent = 'I\'m a custom element!';
    console.log('my-element created!');
  }

  ready() {
    super.ready();
    console.log('my-element is ready!');
    this.tasks = [{
      id: 'Task 1',
      name: 'Redesign website',
      start: '2018-01-28',
      end: '2018-01-31',
      progress: 20,
      dependencies: 'Task 2, Task 3'
    }]
    var gantt = new Gantt(this.$.gantt, this.tasks);
  }

  addData() {
    console.log('add data to chart')
    this.tasks.push({
      id: 'Task 2',
      name: 'Redesign website',
      start: '2018-02-28',
      end: '2018-02-31',
      progress: 0,
      dependencies: 'Task 2, Task 3'
    })
    var gantt = new Gantt(this.$.gantt, this.tasks);
  }

  testAlert() {
    swal({
      title: 'Error!',
      text: 'Do you want to continue',
      type: 'error',
      confirmButtonText: 'Cool'
    })
  }
}

window.customElements.define('my-view1', MyView1);