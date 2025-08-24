# Codeucation
## Description
Codeucation is a digital platform that supports secondary school teachers in teaching Python programming. It provides a learning environment where students complete coding exercises, while teachers can track progress and manage classes without needing advanced programming skills. Teachers can also follow the courses themselves, enabling them to fully master the material before teaching it. The platform integrates an automatic code testing system, offering instant feedback. With its user-friendly interface and practical tools, Codeucation strengthens both teaching and learning in computer science education.
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

To start the front-end development server, run <br>
`cd frontend` <br>
`npm run dev`

To run the back-end server, run <br>
`cd backend` <br>
`node index.js`

## License
This project is licensed under the terms described in the [LICENSE.txt](./LICENSE.txt) file.

## Test credentials
Use the following credentials to log in and test the application:

| Role    | Email                                         | Password |
| ------- | --------------------------------------------- | -------- |
| Teacher | leraar1@test.be | test123  |

### Note
- These credentials are for testing purposes only.

## Test exercises
Use the following solutions for the exercises to try the code testing system:

### Hello World!
```
def main():
    return 'Hello, world!'
```

#### Test an almost right function
```
def main():
    return 'Hello, world'
```

### Fibonacci
```
def fibonacci(n):
    result = []
    a, b = 0, 1
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result 
```

#### Fibonacci recursive
```
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

def fibonacci(n):
    return [fib(i) for i in range(n)]
```

### Priemgetallen
```
def is_prime(n):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True
```
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

14. **Searching by ID in MongoDB**  
    Used [How to search by ID in MongoDB](https://www.geeksforgeeks.org/how-to-search-by-id-in-mongodb/).

15. **MongoDB Compass Mongosh commands**  
    Used [MongoDB Shell Documentation](https://www.mongodb.com/docs/mongodb-shell/run-commands/) for running shell commands in MongoDB.

16. **Understanding `__v` in Mongoose**  
    Referred to [Stack Overflow: What is the `__v` field in Mongoose?](https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose)

17. **Mongoose CRUD Operations & MVC Architecture**  
    Followed [Mastering Backend Development with Node.js, MongoDB Integration, Mongoose CRUD Operations, and MVC Architecture](https://dev.to/imsushant12/mastering-backend-development-with-nodejs-mongodb-integration-mongoose-crud-operations-and-mvc-architecture-36k4)
18. **Toggling Hidden Property in MongoDB with Mongoose**  
    Used [ChatGPT](https://chatgpt.com/share/685143a3-7b78-800c-b5e7-77b7dea4cb16)
    - Discussed and resolved the issue of `hidden` property updates not persisting after page refresh.
    - Ensured proper fetching from `ClassroomCourse` using `Promise.all()` in `getClassroomById`.
    - Fixed backend to correctly return visibility status stored in MongoDB.
19. **Stop click event when clicking eye icon**  
    Used [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) to avoid router direction to course page when clicking the eye icon that hides or shows the course for students.
20. **Skulpt Python compiler**  
    Followed [Skulpt documentation](https://skulpt.org/docs/index.html)

21. **Dynamically loading script with promise**  
    Followed [How to use promises until a JS library has loaded](https://stackoverflow.com/questions/73426866/how-to-use-promises-to-wait-until-a-javascript-library-has-loaded)

22. **Dynamically loading external scripts (article)**  
    Based on [Easily Load an External Script Using JavaScript – Aaron Smith](https://aaronsmith.online/articles/easily-load-an-external-script-using-javascript)

23. **Skulpt npm package & CDN**  
    Used [jsDelivr Skulpt package](https://www.jsdelivr.com/package/npm/skulpt)

24. **CodeMirror editor**  
    Used [CodeMirror official site](https://codemirror.net/) for integrating the code editor with syntax highlighting

25. **Vue language support for CodeMirror**  
    Used [codemirror/lang-vue GitHub repository](https://github.com/codemirror/lang-vue)

26. **CodeMirror One Dark theme**  
    Implemented [One Dark theme for CodeMirror](https://www.npmjs.com/package/@codemirror/theme-one-dark)

27. **Apply padding to arrow in select item**  
    Used [StackOverflow - Padding doesn't apply to select html tag dropdown arrow](https://stackoverflow.com/questions/70162260/padding-doesnt-apply-to-select-html-tag-dropdown-arrow) apply padding to the selection arrow.

28. **Speeding up mongoose queries**  
    Used [MongooJS - Faster Mongoose queries with Lean](<https://mongoosejs.com/docs/tutorials/lean.html#:~:text=The%20lean%20option%20tells%20Mongoose,POJOs)%2C%20not%20Mongoose%20documents.>) to create quicker queries

29. **Links to URLs containing parantheses in Marksdown**  
    Used [Meta - Links to URLs containing parantheses](https://meta.stackexchange.com/questions/13501/links-to-urls-containing-parentheses) to link to URLs in marksdown when containing parantheses.

30. **Using Mongoose**  
    Used [Mongoose doucmentation](https://mongoosejs.com/docs/) to use the mongoose library.