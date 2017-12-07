# Express-Lemon #

Initial API NodeJS Architecture Set based on ExpressJS Framework. 
The main idea is to split main functionality logically to a set of middlewares:

- data validators
- access control
- entity loaders
- data mappers

Contains the following list of services by default:

- authentication service (sign up, sing in)
- database service (MongoDB)
- log service

Commands:

- admin creation script 

## Requirements

### Node

Visit https://nodejs.org for installation details.

### npm

Node Package Manager, should come bundled with node.


### pm2/nodemon process managers
nodemon/pm2 will restart the server automatically on code change.

`$ npm install -g nodemon`

or

`$ npm install -g pm2`


### MongoDB

Install MongoDB https://docs.mongodb.com/manual/installation/

## Project Installation

### Go to the project directory & install the dependencies

`$ npm install`

### App Settings

`./config` copy `local.example.js` file content to newly created `local.js` file and perofrm changes if it's needed 

## Runing the project

`$ npm start`

or

`$ nodemon ./server.js`

or

`$ pm2 start ./bin/start_[server environment].json`
