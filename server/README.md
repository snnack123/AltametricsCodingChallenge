# NestJS + TypeScript + Prisma + PostrgeSQL + GraphQL

This application constitutes a prototype intended for the development of a server-side application using technologies such as NestJS, TypeScript, Prisma, PostgreSQL, and GraphQL. The primary objective is to establish a server that serves the client application by providing methods to retrieve information from the database.

These constitute the procedural steps required to perform the cloning of the project and its initiation:
- Create a docker image by running this command: ```docker run --name postgres --publish 5432:5432 --env POSTGRES_PASSWORD=asdasdas --detach postgres:15.2-bullseye```
- Navigate to the 'server' directory and execute ```npm i``` to install the packages.
- Execute ```npm run start:dev``` in the terminal to initiate the application.

## Main implemented routes
- ```http://localhost:3000/api``` - At this route, the Swagger interface can be accessed, showcasing the implementation of all CRUD operations for users and invoices, as well as authentication, registration, and token verification methods.
- ```http://localhost:3000/graphql``` - At this route, the GraphQL interface can be accessed, providing a comprehensive view of the implemented queries, mutations, and schema for efficient data retrieval and manipulation.
