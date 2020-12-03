import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Create database scheme for notes
 */
const TexasIdSchema = new Schema({
    LICENSE_TYPE: {
        type: mongoose.ObjectId,
        required: true,
    },

    LICENSE_NUMBER: {
        type: Number,
        required: true,
    },

    LICENSE_EXPIRATION_DATE: {
        type: Date,
        required: false,
    },

    COUNTY: {
        type: String,
        required: false,
    },

    NAME: {
        type: String,
        required: false,
    },
    MAILING_ADDRESS_LINE1: {
        type: String,
        required: false,
    },
    MAILING_ADDRESS_LINE2: {
        type: String,
        required: false,
        default: 'Appointment',
    },
    MAILING_ADDRESS_CITY_State_ZIP: {
        type: String,
        required: false,
        default: 'haircut',
    },
    PHONE_NUMBER: {
        type: Number,
        required: false,
        default: 0,
    },
    BUSINESS_NAME: {
        type: String,
        default: 'false',
    },
    BUSINESS_ADDRESS_LINE1: {
        type: String,
        default: 'buziness',
        required: false,
    },
    BUSINESS_ADDRESS_LINE2: {
        type: String,
        required: false,
        default: 'false',
    },
    BUSINESS_CITY_STATE_ZIP: {
        type: String,
        default: 'false',
    },
    
    BUSINESS_COUNTY_CODE: {
        type: Number,
        default: 'buziness',
        required: false,
    },
    BUSINESS_COUNTY: {
        type: String,
        required: false,
        default: 'false',
    },
    BUSINESS_ZIP: {
        type: String,
        required: false,
        default: 'false',
    },
    BUSINESS_PHONE:  {
        type: String,
        required: false,
        default: 'false',
    },
    LICENSE_SUBTYPE: {
        type: String,
        required: false,
        default: 'false',
    },
    CONTINUING_EDUCATION_FLAG: {
            type: String,
            required: false,
            default: 'false',
    },

},     { collection: 'texasId' }
);

export default mongoose.model('TexasId', TexasIdSchema);
{

}