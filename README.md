# Express-Lemon: Back-End Boilerplate

1. [Description](#description) 
  * [Ideology](#ideology)
  * [Middleware Entities](#middleware-entities) 
  * [Services](#services)
  * [Commands](#commands)
2. [Installation](#installation)
  * [Requirements](#requirements)
  * [Installation Steps](#installation-steps)
  * [Running the package](#running-the-package)


# Description

Initial API Architecture. Contains a basic and must-have set of modules, services and configurations. 

## Ideology

Use Express Middlewares in order to split functionality and have logically separated parts. Each router/endpoint may have a chain of middlewares to validate data, load data from data sources, map data, check permissions and perform the main business logic.

Each Middleware function should have **the same name** through the whole chain set. 

**Example:** If a new request of user creation process passes multiple middleware functions, all of them should have the same name (`createOne(req, res, next)`)

**Exception: unrelated 'helper' middlewares*

Example:
```
appRoute.get('/:userId',
  authMiddleware.isAuthenticated,
  acl.getOne,
  validator.getOne,
  loader.getOne,
  controller.getOne,
);
```


## Middleware Entities
`./app/middlewares/`

Chain items to perform own specific functionality.

### Access Control (accessControl)

Checks if the current request may reach a business logic. This layer may check if a logged in user has permissions to perform this request. 

Example:
```
async getOne(req, res, next) {
    if (mainAcl.isAdmin(req.user)) {
      return next();
    }

    const userIdRequested   = req.params.userId;
    const userIdCurrent     = req.user._id.toString();

    if (userIdRequested === userIdCurrent) {
      return next();
    }

    return next(new Forbidden());
},
```

### Data Mappers (dataMappers)

Maps Outgoing/Incoming data for further processing by another function.

Example:
```
updateOne(req, res, next) {
    delete req.body.password;
    delete req.body.confirm_password;
    return next();
},
```

### Data Validators (dataValidators)

Validates incoming data according to installed rules to prevent invalid data from handling.

Example:
```
deleteOne(req, res, next) {
    req.assert('userId', 'Valid user id should be provided').notEmpty().isMongoId();
    mainValidator.handleValidationResult(mainValidator.validateErrorsSync(req), res, next);
},
```

### Entity Loaders (entityLoaders)

Loads/Gets required by business logic entities/objects from available data sources. The system may retrieve users or related entities from a database or process a data.

Stores and passes loaded entities in a special object inside the `req` (request) object. The **Entity Loader Service** should be used to sed all of the entities and pass within the request object.

Example:
```
async getOne(req, res, next) {
    try {
      const userFound = await UserService.findOne({ query: { _id: req.params.userId }, options: { lean: true } });
      if (!mainHelper.isObjectValid(userFound)) {
        throw new NotFound('user not found');
      }

      MainLoader.setEntities(req, { user: userFound });
      return next();

    } catch (err) {
      return next(err);
    }
},
```

## Services
`./app/services/`

Services perform single-minded focus functionality to be invoked inside the application for handling business logic.

- Authentication Service (access/refresh token flow)
- Crypto Service
- Database Service
- Email Service
- Entity Loader Service
- Log Service
- Response Service
- User Service

## Commands
`./commands`

- Admin User creation script  

# Installation

## Requirements

### Node

Visit https://nodejs.org for installation details.

### npm

Node Package Manager, should come bundled with node.

### MongoDB

Install MongoDB https://docs.mongodb.com/manual/installation/

## Installation Steps

### Clone the package

1. Create a folder with the chosen name
2. Run `$ git clone <package url> .`

### install dependencies

1. Go to the package root folder
2. Run `$ npm install`

### App Settings

1. Create `config/env/env.local` file and copy data from `config/env/env.local_example` 
2. Update settings according to your needs and environment specifications

### Test Environment Settings

1. Create `config/env/.env.test` file and copy data from `config/env/.env.test_example` 
2. Update settings according to your needs and environment specifications

## Running the package

`$ npm start:[environment]`

Example: `$ npm start:local`
