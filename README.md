# Nodejs ToDo List

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|CORS           | Cors accepted values            | "*"      |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0


# Getting started
- Clone the repository
```
git clone  https://github.com/mammadsafar/todoList.git
```
- Install dependencies
```
cd todoList
npm install
npm install nodemon
```
- Build and run the project
```
npm start
```

- Set dependencies
```
Set mongodbUrl for DataBase at config/config.js
Set secretKey for session at config/config.js
```
Navigate to `http://localhost:3001`




# Common Issues

## npm install fails
The current solution has an example for using a private npm repository. if you want to use the public npm repository, remove the .npmrc file.


