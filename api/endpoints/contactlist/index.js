'use strict';

var util = require('util');
var logger = require('logentries-logformat')('suite-sdk');

var OFFSET = 0;
var LIMIT = 1000000;

var ContactList = function(request) {
  this._request = request;
};

ContactList.prototype.all = function(customerId, options) {
  logger.log('contactlist_all');
  return this._request.get(customerId, '/contactlist', options);
};

ContactList.prototype.get = function(customerId, contactListId, options) {
  logger.log('contactlist_get');
  return this._request.get(customerId, '/contactlist/' + contactListId, options);
};

ContactList.prototype.create = function(customerId, name, contactIds, options) {
  var url = '/contactlist';
  logger.log('contactlist_create');
  return this._request.post(customerId, url, {
    key_id: 'id',
    name: name,
    external_ids: contactIds
  }, options);
};

ContactList.prototype.append = function(customerId, contactListId, contactIds, options) {
  var url = '/contactlist/' + contactListId + '/add';
  logger.log('contactlist_append');
  return this._request.post(customerId, url, {
    key_id: 'id',
    external_ids: contactIds
  }, options);
};

ContactList.prototype.list = function(customerId, contactListId, offset, limit, options) {
  offset = offset || OFFSET;
  limit = limit || LIMIT;
  var url = util.format('/contactlist/%s/contacts/?offset=%s&limit=%s', contactListId, offset, limit);
  logger.log('contactlist_list');
  return this._request.get(customerId, url, options);
};

ContactList.create = function(request) {
  return new ContactList(request);
};

module.exports = ContactList;
