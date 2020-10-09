/*
* Project Name : DynamoDB Rest API
* Author       : Aghisna12
* Date         : 27 - july - 2020 (14:31 WIB/INDONESIA)
* Udate        : 9 - october - 2020 (11:00 WIB/INDONESIA)
*/

var token = "belajardb";
var access_key = "YOUR_ACCESS_KEY";
var secret_key = "YOUR_SECRET_KEY";
var region = "YOUR_DATABASE_REGION";// example : us-east-2

function get_last_id() {
  var dynamodb = new DynamoDB(access_key, secret_key, region);
  var i = 0;
  while (dynamodb) {
    var instance = dynamodb.getItem({user_id: {N: String(i)}}, ['id', 'nama', 'jenis_kelamin'], 'daftar_hadir');
    var database = JSON.parse(instance);
    if (database['Item']) {
      ++i;
    } else {
      return i;
    }
  }
  return -1;
}

function get_items() {
  var result = [];
  var dynamodb = new DynamoDB(access_key, secret_key, region);
  var index = get_last_id();
  if (index != -1) {
    for (var i = 0; i <= index; i++) {
      var instance = dynamodb.getItem({user_id: {N: String(i)}}, ['user_id', 'nama', 'jenis_kelamin'], 'daftar_hadir');
      var database = JSON.parse(instance);
      if (database['Item']) {
        result.push(database['Item']);
      }
    }
  }
  return JSON.stringify(result);
}

function update_item(_token, _nama, _jenis_kelamin) {
  if (_token == token) {
    var dynamodb = new DynamoDB(access_key, secret_key, region);
    var index = get_last_id();
    if (index != -1) {
      var instance = dynamodb.updateItem({user_id: {N: String(index)}}, {nama: {Value: {S: _nama}}, jenis_kelamin: {Value: {S: _jenis_kelamin}}}, 'daftar_hadir');
      return instance;
    }
  }
}

function delete_item(_token, _uid) {
  if (_token == token) {
    var dynamodb = new DynamoDB(access_key, secret_key, region);
    var instance = dynamodb.deleteItem({user_id: {N: _uid}}, 'daftar_hadir');
    return instance;
  }
}

function responseCors(data) {
  if (data) {
    return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    return ContentService.createTextOutput('error').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

function auth(_token) {
  if (_token == token) {
    return "success";
  }
  return "error";
}

function doGet(param) {
  var action = param.parameter.action;
  switch(action) {
    case "auth":
      var _token = param.parameter.token;
      return responseCors("initialize('" + auth(_token) + "');");
      break;
    case "add_item":
      var _token = param.parameter.token;
      var _nama = param.parameter.nama;
      var _jenis_kelamin = param.parameter.jenis_kelamin;
      return responseCors("response('" + update_item(_token, _nama, _jenis_kelamin) + "');");
      break;
    case "del_item":
      var _token = param.parameter.token;
      var _uid = param.parameter.uid;
      return responseCors("response('" + delete_item(_token, _uid) + "');");
      break;
    case "get_items":
      return responseCors("get_items('" + get_items() + "');");
      break;
    default:
      return responseCors("error");
  }
}

