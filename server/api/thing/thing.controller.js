/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';
var fs = require("fs");
var _ = require('lodash');
var Thing = require('./thing.model');
var sh = require('shelljs');
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }




// Get list of things
exports.index = function(req, res) {
  Thing.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.json(200, things);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Thing.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
	
	
	var position = 1100;
var file_path = './myallow.txt';
var new_text = "\nallow " + thing.name + ';' ;

fs.readFile(file_path, function read(err, data) {
    if (err) {
        throw err;
    }
    var file_content = data.toString();
    file_content = file_content.substring(position);
    var file = fs.openSync(file_path,'a+');
    var bufferedText = new Buffer(new_text+file_content);
    fs.writeSync(file, bufferedText, 0, bufferedText.length);
    fs.close(file);
	
	//var code = sh.exec('node -v').output;
	//sh.exec('cd C:\\API\\Nginx\\nginx-1.9.2');sh.exec('nginx -s stop');
    //console.log(code+"YYYYYYYYYYYYYYYYYYYYYYYEEEEEEEEEEEEEEE");

exec("nginx -s stop", puts);
	
	
	
});
	
	
	
	
	
    return res.json(201, thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Thing.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}