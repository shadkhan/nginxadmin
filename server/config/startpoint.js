/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

	var fs = require('fs'); //Import fs module
	var lineReader = require('line-reader');
	var Promise = require('bluebird');

    var eachLine = Promise.promisify(lineReader.eachLine);
	 var filedata = [];
	 var regexp = require('node-regexp')
var re = regexp()
  
  
  .either('allow')
  .anythingBut('#')
  .end(';')
  .ignoreCase()
  .toRegExp();
		

var Nginxwebadmin = require('../api/nginxwebadmin/nginxwebadmin.model');
var User = require('../api/user/user.model');


Nginxwebadmin.find({}).remove(function() {
  
var i = 0;
var pathconf = 'C:\\API\\Nginx\\nginx-1.9.2\\conf\\includes\\myallow.conf';

//var pathconf = '/etc/nginx/includes/myallow.conf';

 eachLine(pathconf, function(line) {
	 //console.log(line);
	         if(re.test(line)) {				 
					line = line.replace('allow', "");
					line = line.replace(';', "");
					line = line.trim();
					filedata.push(line)	;
			 }
			}).then(function() {
			console.log('done'); 
				for (i = 0; i < filedata.length; i++) { 
				//     console.log("LINENO: "+ i + " -> " + filedata[i] + "<br>")
				//filedata.text[i] = filedata[i];
				//filedata._id[i] = i;
				
				Nginxwebadmin.create({	
				  name :  filedata[i],
					info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
				});
				
				
				}
			//var myJsonString = JSON.stringify(filedata);	
			
			
			//console.log(myJsonString);
			//res.json(myJsonString);
			}).catch(function(err) {
			console.error(err);
			});	
	

 
 
 
  
});

 	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});