import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Schedules = new Schema(
    {
        sport: {
            type: String
        },
        hour: {
            type: String
        },
        date: {
            type: Date
        },
        round: {
            type: String
        },
        gender: {
            type: String
        },
        delegate: {
            type: Array
        },
        location: {
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

export default mongoose.model('Schedules', Schedules, 'schedules');