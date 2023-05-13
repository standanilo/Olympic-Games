import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sports = new Schema(
    {
        name: {
            type: String
        }
    }
);

export default mongoose.model('Sports', Sports, 'sports');