# pingpang-game

npm install -g claudia

aws dynamodb create-table --table-name games \
  --attribute-definitions AttributeName=gameid,AttributeType=S \
  --key-schema AttributeName=gameid,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --region ap-southeast-2 \
  --query TableDescription.TableArn --output text
  
claudia create --region us-east-1 --api-module index --policies policy
  
curl https://your-service-url.execute-api.us-east-1.amazonaws.com/latest/games
  
curl -H "Content-Type: application/json" -X POST -d '{"gameId":"123", "date":"2018-12-21"}' https://your-service-url.execute-ap-southeast-2.amazonaws.com/latest/games
