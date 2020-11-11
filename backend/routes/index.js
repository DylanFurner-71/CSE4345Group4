// import home from './home.js';
// import notes from './notes.js';
import * as homeController from '../controllers/homeController.js';
import * as notebook from '../controllers/notebookController.js';
import * as user from '../controllers/userController.js';
import * as stylist from '../controllers/stylistController.js';
import { errorHandler } from '../middleware/error.js';
import { protectStylist, protectUser } from '../middleware/auth.js';
const passport = require("passport");

export default app => {
    console.log('we made it to here');
    app.use(passport.initialize());
// Passport config
require("../config/passport")(passport);
    //GET request
    app.route('/home').get(homeController.getHome);
    app.route('/notes').get(notebook.getAllNotes).post(notebook.createNote);

    app.route('/notes/:noteId')
        .get(notebook.getNote)
        .put(notebook.updateNote)
        .delete(notebook.deleteNote);

    app.route('/users').get(user.getUsers);
    app.route('/users/:id').put(protectUser, user.updateUser);
    app.route('/users/change/:userId').post(protectUser, user.changePassword);
    app.route('/users/forgotPassword').post(user.forgotPassword);
    app.route('/users/resetPassword/:resettoken').put(user.resetPassword);
    app.route('/users/register').post(user.createUser);
    app.route('/users/login/').post(user.userLogin);
    app.route('/users/me').get(protectUser, user.getMe);
    app.route('/stylists/login/').post(stylist.stylistLogin)
    app.route('/stylists').get(stylist.getStylists);
    app.route('/stylists/:id').put(protectStylist, stylist.updateStylist);
    app.route('/stylists/change/:stylistId').post(
        protectStylist,
        stylist.changePassword
    );
    app.route('/stylists/forgotPassword').post(stylist.forgotPassword);
    app.route('/stylists/resetPassword/:resettoken').put(stylist.resetPassword);
    app.route('/stylists/me').get(protectStylist, stylist.getMe);
    app.route('/stylists/register/create').post(stylist.createStylist);
    app.route('/stylists/login/').post(stylist.stylistLogin);
    app.route('/stylists/:email').get(stylist.getStylist);
    //this one right here, kirk (go to the stylistController for the logic if
    //you want to see)
    app.route('/stylists/search').get(stylist.searchStylist);

    app.use(errorHandler);
};

// module.export
