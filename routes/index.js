// import home from './home.js';
// import notes from './notes.js';
import * as homeController from "../controllers/homeController.js";
import * as notebook from "../controllers/notebookController.js";
import * as user from "../controllers/userController.js";
import * as stylist from "../controllers/stylistController.js";
import { errorHandler } from "../middleware/error.js";
import { protectStylist, protectUser } from "../middleware/auth.js";

export default (app) => {
  console.log("we made it to here");
  //GET request
  app.route("/home").get(homeController.getHome);
  app.route("/notes").get(notebook.getAllNotes).post(notebook.createNote);
  app.route("/users").get(user.getUsers);
  app.route("/users/:id").put(protectUser, user.updateUser);
  app.route("/users/change/:userId").post(user.changePassword);
  app.route("/users/register").post(user.createUser);
  app.route("/users/login/").post(user.userLogin);

  app.route("/stylists").get(stylist.getStylists);
  app.route("/stylists/:id").put(protectStylist, stylist.updateStylist);
  app.route("/stylists/change/:stylistId").post(stylist.changePassword);
  app.route("/stylists/register/create").post(stylist.createStylist);
  app.route("/stylists/login/").post(stylist.stylistLogin);

  //this one right here, kirk (go to the stylistController for the logic if
  //you want to see)
  app.route("/stylists/search").get(stylist.searchStylist);

  // app.use(errorHandler);
};

// module.export
