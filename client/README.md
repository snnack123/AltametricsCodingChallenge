# React + TypeScript + Vite

This application constitutes a prototype aimed at developing a platform utilizing React, Vite, and TypeScript technologies, with the primary objective of efficiently managing the invoicing process.

These constitute the procedural steps required to perform the cloning of the project and its initiation:

- Please input the following command into a Git Bash terminal: ```git clone https://github.com/snnack123/AltametricsCodingChallenge.git```
- Navigate to the 'client' directory and execute ```npm i``` to install the packages.
- Execute ```npm run dev``` in the terminal to initiate the application.
- Open a web browser and enter ```http://localhost:5173/```.

## Main implemented routes
- ```/``` -  This route represents the homepage where, if the user is authenticated, it will display both the sidebar and the main navbar.
- ```/login``` - The login page. For this page, I utilized the Yup and Formik libraries for validations.
- ```/register``` - The register page. For this page, I utilized the Yup and Formik libraries for validations.
- ```/invoices``` - The page displays the table of invoices, enabling sorting based on various data types, and featuring pagination implemented through react-paginate to facilitate navigation between pages.

## Most important libraries
- React-paginate
- React-redux
- React-router-dom
- Tailwindcss
- Axios
- Yup
- Formik

## ENV example
VITE_API_URL =

## Unfinished work
- Technical debt - The code requires restructuring. In essence, it is advisable to generate several smaller components that are essential across multiple pages.
- Responsiveness - Need to make the left sidebar responsive.
