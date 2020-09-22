import user from '../controllers/userController';

export default function user (app) {
    
    // We must create routes for user
    app.route('/notes') 
        .get(notebook.getAllNotes)
        .post(notebook.createNote);

    app.route('/notes/:noteId')
        .get(notebook.getNote)
        .put(notebook.updateNote)
        .delete(notebook.deleteNote);
};