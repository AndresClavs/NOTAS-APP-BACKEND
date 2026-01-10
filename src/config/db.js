import mongoose from 'mongoose';

export const connectDB = async () => {
    try { 
        const dbUri = process.env.MONGODB_URI 

        mongoose.connect(dbUri)
        console.log("Conectado a la base de datos MongoDB");

    } catch (error) {
        console.error("Error al conectar la database", error);
        process.exit(1)
    }   
}