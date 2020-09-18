// import home from './home.js';
// import notes from './notes.js';
import * as homeController from '../controllers/homeController.js';
import * as notebook from '../controllers/notebookController.js';

export default (app) => {
    console.log('we made it to here');
    //HOME
    app.route('/home').get(homeController.getHome);
    

    //NOTES
    app.route('/notes').get(notebook.getAllNotes);
    app.route('/notes').post(notebook.createNote);
    
    app.route('/notes/:noteId').get(notebook.getNote);
    app.route('/notes/:noteId').put(notebook.updateNote);
    app.route('/notes/:noteId').delete(notebook.deleteNote);
};


// module.export 