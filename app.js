var express = require('express');
var config = require('./config.js');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// TODO add database
var db = require('./db.js');
var request = require('request');

app.get('/', function(msg, res) {
  db.dbsize(function(err, count) {
    res.send("There are " + count +
      " messages in the MESSAGES dictionary\n");
  })
});

/**
 *
 */
app.post('/', function(req, res) {

  // TODO Sanitize Inputs
  var msg_id = req.body['Id']; //# The unique ID for this message
  var totals_number = req.body['TotalParts']; //# Which part of the message it is
  var part_number = req.body['PartNumber']; //# Which part of the message it is
  var data = req.body['Data']; //# The data of the message

  // Save stuff
  db.set(msg_id + ":TotalParts", totals_number);
  db.get(msg_id + ":Parts", function(err, parts) {
    if (!parts) {
      parts = new Array(totals_number);
    } else {
      parts = JSON.parse(parts);
    };
    parts[part_number] = data;
    //
    db.set(msg_id + ':Parts', JSON.stringify(parts));

    // Build Response
    var areAllPartsIn = true;
    for (var i = 0, len = totals_number; i < len; i++) {
      if (!parts[i]) {
        areAllPartsIn = false;
      }
    }
    if (areAllPartsIn) {
      var options = {
        url: config.endpoint + '/' + msg_id,
        method: "POST",
        headers: {
          'x-gameday-token': req.get('API_Token')
        },
        formData: 'data=' + (parts.join('') + "\n")
      };
      console.log('options', options);
      request.post(options, function(error, response, body) {
        console.log(arguments);
        if (!error && response.statusCode == 200) {
          console.log(body); // Show the HTML for the Google homepage.
        }
      });
    }
    return res.send('OK\n');

  });

});

app.listen(config.port, function() {});
