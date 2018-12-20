const ApiBuilder = require('claudia-api-builder'),
	AWS = require('aws-sdk');

var api = new ApiBuilder(),
		dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/games', function (request) { // SAVE your game
		var parameters = {
			TableName: 'games',
				Item: {
					gameid: request.body.gameId,
					date: request.body.date // your game date
			}
		};
		return dynamoDb.put(parameters).promise(); // returns dynamo result
}, { success: 201 }); // returns HTTP status 201 - Created if successful

api.get('/games', function (request) { // GET all users
	return dynamoDb.scan({ TableName: 'games' }).promise()
	   .then(response => response.Items)
});

api.patch('/games/{id}', (request) => { //PATCH your game
	let params = {
		TableName: 'games',
		Item: {
			gameid: request.pathParams.id,
			date: request.body.date //your game date
		}
	};
	return dynamoDb.put(params).promise();
}, {success: 201});

api.delete('/games/{id}', (request) => { //DELETE your game
	let id = request.pathParams.id;
	let params = {
		TableName: 'games',
		Key: {
			gameid: id,
		}
	};

	return dynamoDb.delete(params).promise()
				   .then(() => {
					   return 'Deleted game with id "' + id + '"';
				   });
}, {success: 201});

module.exports = api;
