#!/usr/bin/node
"use strict";

var fs = require("fs");
fs.readFile("schema/message.json", "utf8", function(error, data) {
  var Ajv = require('ajv');
  var ajv = Ajv({"allErrors": true});
  var schema = ajv.compile( JSON.parse(data) );

  fs.readFile("test-corpus/messages.json", "utf8", function(error, data) {
    var messages = JSON.parse(data);
    for (var i = 0; i < messages.length; i++)
    {
      if (schema(messages[i].message) === messages[i].correct)
      {
        console.log((i+1) + " ok - " + messages[i].message.event);
      }
      else
      {
        console.log((i+1) + "not ok - " + messages[i].message.event + " (should " +
          (messages[i].correct ? "pass)" : "fail)") );
      }
    }
  });
});