import * as homeController from '../controllers/homeController.js';
import * as notebook from '../controllers/notebookController.js';
import * as user from '../controllers/userController.js';
import * as stylist from '../controllers/stylistController.js';
import { errorHandler } from '../middleware/error.js';
import { protectStylist, protectUser } from '../middleware/auth.js';

export default app => {
    console.log('we made it to here');
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

    app.route('/users/appointments/:id').get(user.getAppointments);
    app.route('/users/me').get(protectUser, user.getMe);

    app.route('/stylists').get(stylist.getStylists);
    app.route('/stylists/search').get(stylist.searchStylist);
    app.route('/stylists/:id')
        .put(protectStylist, stylist.updateStylist)
        .get(stylist.getOneStylist);
    app.route('/stylists/change/:stylistId').post(
        protectStylist,
        stylist.changePassword
    );
    app.route('/stylists/forgotPassword').post(stylist.forgotPassword);
    app.route('/stylists/resetPassword/:resettoken').put(stylist.resetPassword);
    app.route('/stylists/me').get(protectStylist, stylist.getMe);
    app.route('/stylists/register/').post(stylist.createStylist);
    app.route('/stylists/login/').post(stylist.stylistLogin);
    app.route('/stylists/services/:id/add').post(stylist.addService);
    app.route('/stylists/appointments/:id')
        .post(stylist.addAppointment)
        .get(stylist.getAppointments);

    //this one right here, kirk (go to the stylistController for the logic if
    //you want to see)

    app.use(errorHandler);
};

// module.export