# pingpang-game

#Set AWS configure

aws configure

#Install claudia

npm install -g claudia

#Init

npm init -f

#Install dependency

npm install aws-sdk claudia-api-builder -S

#Create table

aws dynamodb create-table --table-name games \
  --attribute-definitions AttributeName=gameid,AttributeType=S \
  --key-schema AttributeName=gameid,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --region ap-southeast-2 \
  --query TableDescription.TableArn --output text
  
claudia create --region ap-southeast-2 --api-module index --policies policy

#Test
#Show all games 

curl https://your-service-url.execute-api.us-east-1.amazonaws.com/latest/games

#Record a new game 

curl -H "Content-Type: application/json" -X POST -d '{"gameId":"123", "date":"2018-12-21", "players": [{"name":"Tony", "score":21},{"name":"Tom", "score":19}]}' https://your-service-url.execute-ap-southeast-2.amazonaws.com/latest/games
