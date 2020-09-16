// import home from './home.js';
// import notes from './notes.js';
import homeController from '/Users/dylanfurner/Desktop/haircutUber/controllers/homeController.js';
import notebook from '../controllers/notebookController';

export default (app) => {
    console.log('we made it to here');
    //GET request
    app.route('/home') 
        .get(homeController.getHome);
   app.route('/notes') 
   .get(notebook.getAllNotes)
   .post(notebook.createNote);

app.route('/notes/:noteId')
   .get(notebook.getNote)
   .put(notebook.updateNote)
   .delete(notebook.deleteNote);
};


// module.export 