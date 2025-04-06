import mongoose from 'mongoose';

const connectDb = async()=>{

    mongoose.connection.on('connected',()=> console.log('Connected to MongoDB'));
    await mongoose.connect(`${process.env.MONGODB_URI}/authentication`);
}

export default connectDb;