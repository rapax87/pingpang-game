const ApiBuilder = require('claudia-api-builder'),
	AWS = require('aws-sdk');

var api = new ApiBuilder(),
		dynamoDb = new AWS.DynamoDB.DocumentClient();
var entity = 'matches';

api.post('/' + entity, function (request) { // SAVE your game
		var parameters = {
			TableName: entity,
				Item: {
					id: request.body.id,
					date: request.body.date, // your game date
					players: request.body.players
			}
		};
		return dynamoDb.put(parameters).promise(); // returns dynamo result
}, { success: 201 }); // returns HTTP status 201 - Created if successful

api.get('/' + entity, function (request) { // GET all users
	return dynamoDb.scan({ TableName: entity }).promise()
	   .then(response => response.Items)
});

api.patch('/' + entity + '/{id}', (request) => { //PATCH your game
	let params = {
		TableName: entity,
		Item: {
			id: request.pathParams.id,
			date: request.body.date, //your game date
			players: request.body.players
		}
	};
	return dynamoDb.put(params).promise();
}, {success: 201});

api.delete('/' + entity + '/{id}', (request) => { //DELETE your game
	let id = request.pathParams.id;
	let params = {
		TableName: entity,
		Key: {
			id: id,
		}
	};

	return dynamoDb.delete(params).promise()
				   .then(() => {
					   return 'Deleted ' + entity +' with id "' + id + '"';
				   });
}, {success: 201});

module.exports = api;
