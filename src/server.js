import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';

dotenv .config();

const app = express()
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json())


app.use("/api/notes", notesRoutes);


const PORT = process.env.PORT || 3000

connectDB()
.then(() => { 
    app.listen(PORT, () => {
  console.log('Servidor levantado EN PUERTO http://localhost:' + PORT);
})
    
}) 
