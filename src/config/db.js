import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI?.trim();

    console.log("Mongo URI usada:", dbUri);

    if (!dbUri) {
      throw new Error("MONGODB_URI no está definida");
    }

    await mongoose.connect(dbUri);

    console.log("Conectado a la base de datos MongoDB");
  } catch (error) {
    console.error("Error al conectar la database:", error.message);
    process.exit(1);
  }
};
