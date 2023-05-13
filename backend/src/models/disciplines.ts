import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Disciplines = new Schema(
    {
        sport: {
            type: String
        },
        discipline: {
            type: Array
        },
        type: {
            type: String
        },
        players: {
            type: String
        }
    }
);

export default mongoose.model('Disciplines', Disciplines, 'disciplines');