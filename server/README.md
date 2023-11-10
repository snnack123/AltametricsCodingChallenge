# NestJS + TypeScript + Prisma + PostrgeSQL + GraphQL

This application constitutes a prototype intended for the development of a server-side application using technologies such as NestJS, TypeScript, Prisma, PostgreSQL, and GraphQL. The primary objective is to establish a server that serves the client application by providing methods to retrieve information from the database.

These constitute the procedural steps required to perform the cloning of the project and its initiation:
- Create a docker image by running this command: ```docker run --name **DATABASE_USER** --publish 5432:5432 --env POSTGRES_PASSWORD=**DATABASE_PASSWORD** --detach postgres:15.2-bullseye```
- Create a ```.env``` file based on ```.env.example``` and change **DATABASE_USER**, **DATABASE_PASSWORD** and **DATABASE_NAME**
- Open DBeaver and create a localhost connection and a database called **DATABASE_NAME**
- Navigate to the 'server' directory and execute ```npm i``` to install the packages.
- Execute ```npx prisma migrate deploy``` to apply migrations to the database.
- Execute ```npm run seed``` to add content to the database.
- Execute ```npm run start:dev``` in the terminal to initiate the application.

## Main implemented routes
- ```http://localhost:3000/api``` - At this route, the Swagger interface can be accessed, showcasing the implementation of all CRUD operations for users and invoices, as well as authentication, registration, and token verification methods.
- ```http://localhost:3000/graphql``` - At this route, the GraphQL interface can be accessed, providing a comprehensive view of the implemented queries, mutations, and schema for efficient data retrieval and manipulation.

## ENV example

DATABASE_URL="postgresql://**DATABASE_USER**:**DATABASE_PASSWORD**@localhost:5432/**DATABASE_NAME**" <br>
JWT_SECRET=
