import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Create database scheme for notes
 */
const AppointmentSchema = new Schema({
    stylist: {
        type: mongoose.ObjectId,
        required: true,
    },

    user: {
        type: mongoose.ObjectId,
        required: true,
    },

    startDate: {
        type: Date,
        required: false,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: false,
        default: Date.now,
    },
    title: {
        type: String,
        required: false,
        default: 'Some Title',
    },
    category: {
        type: String,
        required: false,
        default: 'haircut',
    },
    location: {
        type: String,
        required: false,
        default: 'Home',
    },
    allday: {
        type: Boolean,
        required: false,
        default: false,
    },
});

export default mongoose.model('Appointment', AppointmentSchema);
