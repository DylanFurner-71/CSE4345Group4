import user from '../controllers/userController';

export default function users (app) {
    app.route('/users') 
        .get(user.getUsers)
        .post(user.createUser);

};