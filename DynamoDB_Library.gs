/*
* Project Name : DynamoDB Library
* Author       : Aghisna12
* Date         : 27 - july - 2020 (08:22 WIB/INDONESIA)
* Update       : -
*/

class DynamoDB {
  /**
  * Initialize constructor for aws sdk.
  * @param {string} access_key - your aws access key
  * @param {string} secret_key - your aws secret key
  * @param {string} regions - your aws region
  */
  constructor(access_key, secret_key, regions) {
    this.awsRegion = regions;
    AWS.init(access_key, secret_key);
  }
  
  /**
  * Client request Aws DynamoDB
  * @param {String} actions - your DynamoDB Actions
  * @param {Object} payloads - query data request
  */
  requestDynamoDB(actions, payloads) {
    return AWS.request('dynamodb', this.awsRegion, actions, '', 'POST', payloads);
  }
  
  /**
  * Api Gateway for request Get Item
  * @param {Object}
  * @param {String Array}
  * @param {String}
  */
  getItem(_Key, _AttributesToGet, _TableName) {
    var items = {
      Key: _Key,
      AttributesToGet: _AttributesToGet,
      TableName: _TableName
    };
    return this.requestDynamoDB('DynamoDB_20120810.GetItem', items)
  }
  
  /**
  * Api Gateway for request Update Item
  * @param {Object}
  * @param {Object}
  * @param {String}
  */
  updateItem(_Key, _AttributeUpdates, _TableName) {
    var items = {
      Key: _Key,
      AttributeUpdates: _AttributeUpdates,
      TableName: _TableName,
      ReturnValues: 'ALL_NEW'
    };
    return this.requestDynamoDB('DynamoDB_20120810.UpdateItem', items)
  }
  
  /**
  * Api Gateway for request Delete Item
  * @param {Object}
  * @param {String}
  */
  deleteItem(_Key, _TableName) {
    var items = {
      Key: _Key,
      TableName: _TableName
    };
    return this.requestDynamoDB('DynamoDB_20120810.DeleteItem', items)
  }
}
