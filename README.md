# haircutUber
https://cheesecakelabs.com/blog/efficient-way-structure-react-native-projects/
Source
https://cloud.mongodb.com/v2/5f5ea857e59d5c55a72e081b#clusters

Requirements to run product
Sudo access? Yes
Cocoapods? Yes
Yarn? Not Required
Gem? Maybe
Jest? Yes
ESLint? Yes
MongoDB? Yes, until we deploy full time to azure


Jest install
install Jest using yarn:
yarn add --dev jest
Or npm:
npm install --save-dev jest

What is Jest?
Jest is a testing framework maintained by Facebook Inc. that serves to provide a logical, easy to use way to cover as many lines as possible in tests. While this may feel annoying at first it makes react and node development significantly easier to test. There is no base debugger in either of these languages so we have no way to verify our code is working the way we intended it to without it. 

ES Lint
This script checks our syntax and makes sure it is within the acceptable quality of the JavaScript Standard that we chose. This project will be using Google’s Javascript Node Eslint standard. Again, this feels very annoying but it will come in very handy. 

$ npm install eslint --save-dev
$ ./node_modules/.bin/eslint --init

https://dev.to/devdammak/setting-up-eslint-in-your-javascript-project-with-vs-code-2amfn

To install MongoDB: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
Follow this guide

To Deploy to azure:
https://docs.microsoft.com/en-us/azure/cosmos-db/create-mongodb-nodejs


ROUTES: 

    app.route('/notes')
        .get(notebook.getAllNotes)
        .post(notebook.createNote);

    app.route('/notes/:noteId')
        .get(notebook.getNote)
        .put(notebook.updateNote)
        .delete(notebook.deleteNote);
        
        
        standard syntax for a call would be
        app.get('/notes') gets notebook.getAllNotes
        app.post('/notes') would post a new note. not exactly sure on how we call it with parameters wiht mongo db but we will learn

Backend File Layout with explanations
notes-app/
├── controllers/
│ └── notebookController.js //this is the file that contains anything to do with notebooks. REST operations that pertain to notebooks are called here
├── models/ 
|  └── notebookModel.js //models store example schema. There will be many of these files
├── routes/
│ └── index.js
├── app.js
├── server.js
└── package.json

Running the Backend:
Npm install app
Npm run start 

Running the Front End:
This will likely be in a separate repository
Colors.css
https://clrs.cc/



