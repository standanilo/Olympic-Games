import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Requests = new Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String
        },
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        country: {
            type: String
        },
        mail: {
            type: String
        },
        type: {
            type: String
        }
    }
);

export default mongoose.model('Requests', Requests, 'requests');