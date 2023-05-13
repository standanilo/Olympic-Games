import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Athletes = new Schema(
    {
        fullname: {
            type: String
        },
        country: {
            type: String
        },
        sport: {
            type: String
        },
        discipline: {
            type: Array
        },
        gender: {
            type: String
        },
        index: {
            type: Number
        },
        medals: {
            type: Number
        }
    }
);

export default mongoose.model('Athletes', Athletes, 'athletes');