import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema(
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
        },
        numOfComp: {
            type: Number
        }
    }
);

export default mongoose.model('User', User, 'users');