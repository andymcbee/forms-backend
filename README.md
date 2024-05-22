Docs:
https://docs.google.com/document/d/1SQd1m78CATY3w7F9vTDdldcBIxDLJASFVHjO5B3ZKok/edit#heading=h.xrfi5rmmv12

server
https://docs.google.com/document/d/1IzJGApTgrwPwvpoF1hmCr138EEvmYvI4Eo5VtacVs8Q/edit

You can run this locally with docker like so. Be sure to add relevant .env files.

sudo docker compose -f docker-compose.local.yml up --build

You can run via github actions like so:

sudo docker compose up --build

If you want to test local, export the variables to your shell and then pass them in like so:

export DB_PASSWORD=password DB_NAME=mydatabase DB_HOST=db DB_USER=postgres KAFKA_BOOTSTRAP_SERVERS=kafka:9092 POSTMARK_API_KEY=API_KEY

sudo NODE_ENV=production DB_PASSWORD=$DB_PASSWORD DB_NAME=$DB_NAME DB_HOST=$DB_HOST DB_USER=$DB_USER KAFKA_BOOTSTRAP_SERVERS=$KAFKA_BOOTSTRAP_SERVERS POSTMARK_API_KEY=$POSTMARK_API_KEY docker compose up --build
