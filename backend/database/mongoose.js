import mongoose from 'mongoose';
import { MONGO_URI } from '../config/env.js';

const connectToDatabase = async () => {
    if (!MONGO_URI) {
        throw new Error('MONGO_URI is required in the .env file.');
    }

    try {
        const connect = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
        
    } catch (error) {
        console.log(`Error connecting to the MongoDB: ${error}`);
    }
}

export default connectToDatabase;