import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Records = new Schema(
    {
        discipline: {
            type: String
        },
        result: {
            type: String
        },
        athlete: {
            type: String
        },
        country: {
            type: String
        },
        venue: {
            type: String
        },
        year: {
            type: Number
        },
        gender: {
            type: String
        }
    }
);

export default mongoose.model('Records', Records, 'records');