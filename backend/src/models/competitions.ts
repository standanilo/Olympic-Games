import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Competitions = new Schema(
    {
        sport: {
            type: String
        },
        discipline: {
            type: String
        },
        type: {
            type: String
        },
        format: {
            type: String
        },
        dateFrom: {
            type: Date
        },
        dateTo: {
            type: Date
        },
        location: {
            type: String
        },
        delegate: {
            type: Array
        },
        gender: {
            type: String
        },
        teams: {
            type: Array
        },
        finished: {
            type: Boolean
        }
    }
);

export default mongoose.model('Competitions', Competitions, 'competitions');