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
        default: null,
    },

    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
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
    booked: {
        type: Boolean,
        default: false,
    },
    canceled: {
        type: Boolean,
        default: false,
    },
    allday: {
        type: Boolean,
        required: false,
        default: false,
    },
});

export default mongoose.model('Appointment', AppointmentSchema);
