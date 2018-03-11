"use strict";
var RandomData = function() {
  var addToLane = function(chart, item) {
    var name = item.station;

    if (!chart.lanes[name]) chart.lanes[name] = [];

    var station = chart.lanes[name];

    var sublane = 0;
    while (isOverlapping(item, station[sublane])) sublane++;

    if (!station[sublane]) {
      station[sublane] = [];
    }

    station[sublane].push(item);
  };

  var isOverlapping = function(item, station) {
    if (station) {
      for (var i = 0; i < station.length; i++) {
        var t = station[i];
        if (item.start < t.end && item.end > t.start) {
          return true;
        }
      }
    }
    return false;
  };

  var parseData = function(data) {
    var i = 0,
      length = data.length,
      node;
    var chart = { lanes: {} };

    for (i; i < length; i++) {
      var item = data[i];

      addToLane(chart, item);
    }

    return collapseLanes(chart);
  };

  var collapseLanes = function(chart) {
    var lanes = [],
      items = [],
      laneId = 0;
    var now = new Date();

    for (var laneName in chart.lanes) {
      var station = chart.lanes[laneName];

      for (var i = 0; i < station.length; i++) {
        var subLane = station[i];

        lanes.push({
          id: laneId,
          label: i === 0 ? laneName : ""
        });

        for (var j = 0; j < subLane.length; j++) {
          var item = subLane[j];

          items.push({
            id: item.id,
            station: laneId,
            start: item.start,
            end: item.end,
            class: item.end > now ? "future" : "past",
            desc: item.desc,
            color: getRandomColor()
          });
        }

        laneId++;
      }
    }

    return { lanes: lanes, items: items };
  };

  var getRandomColor = function() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return "#" + ("000000" + color).slice(-6);
  };

  var randomNumber = function(min, max) {
    return Math.floor(Math.random(0, 1) * (max - min)) + min;
  };

  var generateRandomWorkItems = function() {
    var data = [];
    var laneCount = randomNumber(5, 7),
      totalWorkItems = randomNumber(20, 30),
      startMonth = randomNumber(0, 1),
      startDay = randomNumber(1, 28),
      totalMonths = randomNumber(4, 10);

    for (var i = 0; i < laneCount; i++) {
      var dt = new Date(2018, startMonth, startDay);
      for (var j = 0; j < totalWorkItems; j++) {
        var dtS = new Date(
          dt.getFullYear(),
          dt.getMonth(),
          dt.getDate() + randomNumber(1, 5),
          randomNumber(8, 16),
          0,
          0
        );

        var dateOffset = randomNumber(0, 7);
        var dt = new Date(
          dtS.getFullYear(),
          dtS.getMonth(),
          dtS.getDate() + dateOffset,
          randomNumber(dateOffset === 0 ? dtS.getHours() + 2 : 8, 18),
          0,
          0
        );

        var workItem = {
          id: i * totalWorkItems + j,
          name: "work item " + j,
          station: "Station " + i,
          start: dtS,
          end: dt,
          desc: "This is a description."
        };

        data.push(workItem);
      }
    }
    return data;
  };

  return parseData(generateRandomWorkItems());
};

/**
 * Allow library to be used within both the browser and node.js
 */
var root =
  typeof exports !== "undefined" && exports !== null ? exports : window;
root.randomData = RandomData;
