# Codeucation
## Description
## Set-up guide
### Requirements
Make sure you have the following installed: <br>
**Node.js** (version 22 recommended)<br>
**npm** (version 10 recommended)

### Node installation

Check your node version with <br> `node -v`<br>

If you don't have Node.js and npm installed, download and install the latest stable version from [Node.js official website](https://nodejs.org/en/download/package-manager)

### Dependency installation

Check your npm version with <br> `npm -v`<br>

To install the dependencies, run the following command <br> `npm install`

### Running the application

To start the development server, run <br>
`npm run dev`
## License
This project is licensed under the terms described in the [LICENSE.txt](./LICENSE.txt) file.

## Test credentials
Use the following credentials to log in and test the application:

| Role    | Email                                         | Password |
| ------- | --------------------------------------------- | -------- |
| Teacher | leraar1@test.be | test123  |
| Student | leerling1@test.be | test123  |

### Note
- Student accounts follow the pattern leerling[number]@test.be (e.g., leerling2@test.be, leerling3@test.be), all with the password test123.
- These credentials are for testing purposes only.

## References

1. **Creating .gitignore file**  
   Used [gitignore.io](https://www.toptal.com/developers/gitignore) to generate a `.gitignore` file for a Node.js project.

2. **NPM Installation Guide**  
   Followed the guide from [NodeSource](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/) for installing NPM in both back-end and front-end directories.

3. **Installing Vite**  
   Followed the official [Vite Getting Started Guide](https://vitejs.dev/guide/) to scaffold the project using Vite.

4. **Setting up Vue with Vite**  
   Used the official [Vue 3 + Vite template](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) to create a new Vue application powered by Vite.

5. **Vue.js Documentation**  
   Referred to the [Vue 3 official documentation](https://vuejs.org/guide/introduction.html) for component setup, reactivity system, and project structure.

6. **Vue.js Router Installation**  
   Created router using the [Vue Router Guide](https://router.vuejs.org/guide/).

7. **MongoDB Connection**  
   The connection code for MongoDB Atlas was adapted from the official [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/).

8. **How to Connect MongoDB Using Mongoose**  
   Followed [How to connect MongoDB using Mongoose in Node.js](https://medium.com/@finnkumar6/how-to-connect-mongodb-using-mongoose-in-node-js-like-a-pro-a-fresh-and-modern-approach-6470c69aec16).

9. **Creating Models with Node**  
   Utilized techniques from [Node.js models and database](https://javascript.plainenglish.io/node-js-models-and-database-3836f0c7f2da).

10. **Building a RESTful API with MVC Architecture**  
    Based on [Building a RESTful API with Node.js, Express and MongoDB using MVC](https://medium.com/@Prathmesh_Chavan/building-a-restful-api-with-node-js-express-and-mongodb-using-mvc-architecture-c418143a882a).

11. **Hashing Passwords**  
    Used bcrypt techniques from [Hashing passwords with Node.js and MongoDB](https://www.izertis.com/en/-/hashing-passwords-with-nodejs-and-mongodb-bcrypt).

12. **Express Session Management**  
    Found information in the official [Express.js Middleware Documentation](https://expressjs.com/en/resources/middleware/session.html) and [How to Implement Session Management in Node.js Applications](https://dev.to/saint_vandora/how-to-implement-session-management-in-nodejs-applications-5emm).

13. **Authentication System**  
    Based on my own application 'BugBytes':  
    - [BugBytes (front-end)](https://github.com/EHB-MCT/web2-course-project-front-end-RyanVankriekinge)  
    - [BugBytes (back-end)](https://github.com/EHB-MCT/web2-course-project-back-end-RyanVankriekinge)