import stylist from '../controllers/stylistController';

export default function stylist (app) {
    
    // We must create routes for stylist
    app.route('/notes') 
        .get(notebook.getAllNotes)
        .post(notebook.createNote);

    app.route('/notes/:noteId')
        .get(notebook.getNote)
        .put(notebook.updateNote)
        .delete(notebook.deleteNote);
};