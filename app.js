var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// TODO add database
var db = require('./db.js');

app.get('/', function(msg, res) {
  res.send('Hello Unicorns!')
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});

/**
 *
 */
app.post('/', function(req, res) {

  // console.log(req.body); // your JSON
  // TODO Sanitize
  var msg_id = req.body['Id']; //# The unique ID for this message
  var totals_number = req.body['TotalParts']; //# Which part of the message it is
  var part_number = req.body['PartNumber']; //# Which part of the message it is
  var data = req.body['Data']; //# The data of the message
  /*
  // Input
  {
    "Id": string,
    "TotalParts": integer,
    "PartNumber": integer, // The first part is 0,
    "Data": string
  }
  // Stored as
  client.hmset('message_id_string', {
      'TotalParts': 2,
      'Data': ['part_one_string', 'part_two_string']
  });
  */
  // Save stuff
  db.set(msg_id + ":TotalParts", totals_number);

  // GET msg_id:Parts
  // if not exists,
  //   create new array
  // save in known position,
  db.get(msg_id + ":Parts", function(err, parts) {
    console.log('err', err);
    console.log('parts', parts, typeof parts);
    if (!parts) {
      parts = new Array(totals_number);
    } else {
      parts = JSON.parse(parts);
    };
    console.log('2parts', parts);
    parts[part_number] = data;
    // console.log('3parts', parts);
    db.set(msg_id + ':Parts', JSON.stringify(parts));

    // Build Response
    var areAllPartsIn = true;
    for (var i = 0, len = totals_number; i < len; i++) {
      console.log('parts[i]', parts[i]);
      if (!parts[i]) {
        areAllPartsIn = false;
      }
    }
    if (areAllPartsIn) {
      return res.send('OK all in...' + msg_id + ' ' + part_number + ' ' +
        data + "\n");
    } else {
      return res.send('OK not all are in yet\n');
    }
  });
  return;

  // # Try to get the parts of the message from the MESSAGES dictionary.
  // # If it's not there, create one that has None in both parts
  var parts = MESSAGES.get(msg_id, [None, None])

  // # store this part of the message in the correct part of the list
  parts[part_number] = data

  // # store the parts in MESSAGES
  MESSAGES[msg_id] = parts

  // # if both parts are filled, the message is complete
  if (parts_greater_or_equals_) {
    console.log("have both parts");
    //#app.logger.debug("got a complete message for %s" %msg_id)
  }
  // We can build the final message.
  result = parts[0] + parts[1];
  // # sending the response to the score calculator
  // # format:
  // #   url -> api_base/jFgwN4GvTB1D2QiQsQ8GHwQUbbIJBS6r7ko9RVthXCJqAiobMsLRmsuwZRQTlOEW
  // #   headers -> x-gameday-token = API_token
  // #   data -> EaXA2G8cVTj1LGuRgv8ZhaGMLpJN2IKBwC5eYzAPNlJwkN4Qu1DIaI3H1zyUdf1H5NITR
  // APP.logger.debug("ID: %s" % msg_id) APP.logger.debug("RESULT: %s" %
  //   result) url = API_BASE + '/' + msg_id console.log(url); // print url
  // console.log(result); // print result
  // msg = urllib2.msguest(url, data = result, headers = {
  //   'x-gameday-token': ARGS.API_token
  // }) resp = urllib2.urlopen(msg) resp.close()

});
