import mongoose from 'mongoose'
import {configDotenv} from 'dotenv'

configDotenv()

export async function db(){
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database Connected Successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}


