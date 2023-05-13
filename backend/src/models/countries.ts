import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Countries = new Schema(
    {
        name: {
            type: String
        },
        numOfAthletes: {
            type: Number
        },
        numGold: {
            type: Number
        },
        numSilver: {
            type: Number
        },
        numBronze: {
            type: Number
        }
    }
);

export default mongoose.model('Countries', Countries, 'countries');