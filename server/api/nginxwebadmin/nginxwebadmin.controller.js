'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

var Nginxwebadmin = require('./nginxwebadmin.model');
var fs = require("fs");
var sh = require('shelljs');
var validator = require('validator');

 //var file_path = '/etc/nginx/includes/myallow.conf';
 
 // Configured in config module
 
 // Windows env 
 var file_path = config.nginx_conf_path_win; 
 
 // Linux env - CentOS 
 var file_path = config.nginx_conf_path; 
 
 


// Get list of nginxwebadmins
exports.index = function(req, res) {
  Nginxwebadmin.find(function (err, nginxwebadmins) {
    if(err) { return handleError(res, err); }
    return res.json(200, nginxwebadmins);
  });
};

// Get a single nginxwebadmin
exports.show = function(req, res) {
  Nginxwebadmin.findById(req.params.id, function (err, nginxwebadmin) {
    if(err) { return handleError(res, err); }
    if(!nginxwebadmin) { return res.send(404); }
    return res.json(nginxwebadmin);
  });
};

// Creates a new nginxwebadmin record in the DB.
exports.create = function(req, res) {
  
  
   var ipCheck =  validator.isIP(req.body.name, 4);
    if (ipCheck !== true) {
     handleError(res, req.body.name);
     return;
   }

  Nginxwebadmin.create(req.body, function(err, nginxwebadmin) {
    if(err) { return handleError(res, err); }
	/*
	var file_path = './myallow.txt';
	var new_text = "\nallow " + nginxwebadmin.name + ';' ;

	fs.readFile(file_path, function read(err, data) {
    if (err) {
        throw err;
    }
    var file_content = data.toString();
    //file_content = file_content.substring(position);
	fs.writeFile(file_path, '', function(){console.log('done purging')})
	
    var file = fs.openSync(file_path,'a+');
    var bufferedText = new Buffer(file_content+new_text);
    fs.writeSync(file, bufferedText, 0, bufferedText.length);
    fs.close(file);
	*/
	
	var position = 1100;
 
	var new_text = "\nallow " + nginxwebadmin.name + ';' ;

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
	
	
	// Run command to reload nginx conf file
        sh.exec('nginx -s reload');

		
    });
		
    return res.json(201, nginxwebadmin);
  });
};

// Updates an existing nginxwebadmin in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Nginxwebadmin.findById(req.params.id, function (err, nginxwebadmin) {
    if (err) { return handleError(res, err); }
    if(!nginxwebadmin) { return res.send(404); }
    var updated = _.merge(nginxwebadmin, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
	  
	
      return res.json(200, nginxwebadmin);
    });
  });
};

function readWriteAsync(datarep, file_path) {
  fs.readFile(file_path, 'utf-8', function(err, data){
    if (err) throw err;
    //console.log(datarep);
    var newValue = data.replace(datarep, '');

    fs.writeFile(file_path, newValue, 'utf-8', function (err) {
      if (err) throw err;
      console.log('filelistAsync complete');
    });
  });
}

function readWriteSync(datarep, file_path) {
  var data = fs.readFileSync(file_path, 'utf-8');

  var newValue = data.replace(datarep, '');

  fs.writeFileSync(file_path, newValue, 'utf-8');

  console.log('readFileSync complete');
}


// Deletes a nginxwebadmin from the DB.
exports.destroy = function(req, res) {
  Nginxwebadmin.findById(req.params.id, function (err, nginxwebadmin) {
    if(err) { return handleError(res, err); }
    if(!nginxwebadmin) { return res.send(404); }
    nginxwebadmin.remove(function(err) {
      if(err) { return handleError(res, err); }
	
	var del_text = 'allow ' + nginxwebadmin.name + ';' ;
	console.log(del_text);


    //var del_text = 'allow 192.168.78.88;';
   // readWriteSync(del_text, file_path);
   var re = new RegExp(del_text,"gim");
    //readWriteAsync(re, file_path);
   readWriteSync(re, file_path);
                sh.exec('nginx -s reload');
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}