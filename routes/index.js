// import home from './home.js';
// import notes from './notes.js';
import * as homeController from "../controllers/homeController.js";
import * as notebook from "../controllers/notebookController.js";
import * as user from "../controllers/userController.js";
import * as stylist from "../controllers/stylistController.js";

export default (app) => {
  console.log("we made it to here");
  //HOME
  app.route("/home").get(homeController.getHome);

  //NOTES
  app.route("/notes").get(notebook.getAllNotes).post(notebook.createNote);

  app
    .route("/notes/:noteId")
    .get(notebook.getNote)
    .put(notebook.updateNote)
    .delete(notebook.deleteNote);

  app.route("/users").get(user.getUsers);
  app.route("/users/:userId").post(user.changePassword);
  app.route("/users/register").post(user.createUser);

  app.route("/stylists").get(stylist.getStylists);
  app.route("/stylist/stylistId").post(stylist.changePassword);
  app.route("/stylists/register").post(stylist.createStylist);
};

// module.export
