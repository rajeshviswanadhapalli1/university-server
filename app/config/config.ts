import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '';
const HASH_STRING = process.env.HASH_STRING || '';
export const config = {
    jwt : {
        JWT_SECRET : JWT_SECRET,
        JWT_EXPIRE : JWT_EXPIRE,
        HASH_STRING:HASH_STRING
    },
    mongodb : {
        uri : process.env.MONGO_URI
    }
   
}