/*eslint-disable*/
// import home from './home.js';
// import notes from './notes.js';
import * as homeController from '../controllers/homeController.js';
import * as notebook from '../controllers/notebookController.js';
import * as user from "../controllers/userController.js";
import * as stylist from "../controllers/stylistController.js";



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

   app.route("/users").get(user.getUsers);
   app.route("/users/:userId").post(user.changePassword);
   app.route("/users/register").post(user.createUser);
   app.route("/users/login").get(user.userLogin);

 
   app.route("/stylists").get(stylist.getStylists);
   app.route("/stylist/stylistId").post(stylist.changePassword);
   app.route("/stylists/register").post(stylist.createStylist);
   app.route("/stylist/login").get(stylist.stylistLogin);
   app.route("/stylist/review").get(stylist.getReviews);
   app.route("/stylist/postreview").post(stylist.postReviews);

};


// module.export 