import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Servidor levantado EN PUERTO ' + PORT);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

