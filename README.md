# Simplified Stock Market BE
## Technical Stack :star2:
- NodeJs
- Express
- MySQL
- sequelize
- ws
- Docker

## Architecture
The application follows the MVC architecture by which Controllers and Models organized in the folder of their type.

## Features :dancer:
- Listens to bitfinex ticker websocket
- Process messages received and send websocket messages to web client subscribers
- Take a snapshot of the stock market data every 30 seconds and persist to database

## Decision-Making :thinking:
One of the key decisions made for the delivery of this project is dockerization. The project being dockerized made it easier to deploy without the reviewer having to install resources like the database and be agnostic in any operating system. Same with working on FE, I have chosen libraries I am more familiar with.

## Installation :gear:
1. Clone this repository
2. Install docker
3. Build and start the application with `docker-compose up --build`

Your client can now listen to the server ws

### 
## Things I would like to implement if I had more time :mag:
- Currently, the symbol is being set as an environment variable, given more time we can make it as an additional parameter being sent from the FE to make the graphs more dynamic as per the choosing of the user
- Security: it would be better if there is also authentication before sending ws data to the client, could do this by validating the access_token