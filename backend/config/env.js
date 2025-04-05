import { config } from 'dotenv';

config({ path: `.env` });

export const {
    PORT, CLIENT_URI, NODE_ENV, API_URL,
    MONGO_URI,
    JWT_TOKEN, JWT_EXPIRES_IN,
    CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
} = process.env;