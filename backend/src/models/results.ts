import mongoose from 'mongoose';
import Athletes from './athletes';

const Schema = mongoose.Schema;

let Results = new Schema(
    {
        sport: {
            type: String
        },
        discipline: {
            type: String
        },
        gender: {
            type: String
        },
        round: {
            type: String
        },
        team: {
            type: Object
        },
        result: {
            type: String
        }
    }
);

export default mongoose.model('Results', Results, 'results');