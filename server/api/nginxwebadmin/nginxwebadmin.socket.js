/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var nginxwebadmin = require('./nginxwebadmin.model');

exports.register = function(socket) {
  nginxwebadmin.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  nginxwebadmin.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('nginxwebadmin:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('nginxwebadmin:remove', doc);
}