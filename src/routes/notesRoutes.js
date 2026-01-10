import express from "express";
import Note from "../models/Note.js";
const router = express.Router();

//Obtener todas las notas
router.get("/", async (req,res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
        
    } catch (error) {
        console.error("Error al obtener las notas", error)
        res.status(500).json({error: "Internal Server Error"})
        
    }
    
});

//Obtener una nota por su ID
router.get("/:id", async (req,res) => {
    try {
        const id = req.params.id
        const note = await Note.findById(id)
        if (!note) {
            return res.status(404).json({error: "Nota no encontrada"})
        }
        res.status(200).json(note)
        
    } catch (error) {
        console.error("Error al obtener la nota por ID", error)
        res.status(500).json({error: "Internal Server Error"})
        
    }
});

//Crear una nueva nota
router.post("/", async (req,res) => {
    try {
        const {title, description} = req.body
        const note = new Note({title, description})

        const savedNote = await note.save()
        res.status(201).json({ message: "Nota creada exitosamente", note: savedNote })
      
    } catch (error) {
        console.error("Error al crear una nueva nota", error)
        res.status(500).json({error: "Internal Server Error"})
        
    }

}); 

//Eliminar una noota por su ID
router.delete("/:id", async(req,res) => {
    try {
        const id = req.params.id
        const deletedNote = await Note.findByIdAndDelete(id)
        if (!deletedNote) return res.status(404).json({error: "Nota no encontrada"})
            res.status(200).json({message: "Nota eliminada exitosamente"})
        
        
    } catch (error) {
        console.error("Error al eliminar la nota", error)
        res.status(500).json({error: "Internal Server Error"})
        
    }
 
});
 
//Actualizar una nota 
router.put("/:id", async (req,res) => {
 try {
       const id = req.params.id
       const {title, description} = req.body
       const updatedNote = await Note.findByIdAndUpdate(
            id,
            {title, description},
            {new: true}
        )
        if (!updatedNote) return res.status(404).json({error: "Nota no actualizada correctamente"})
        res.status(200).json({message: "Nota actualizada exitosamente", note: updatedNote})
      
 } catch (error) {
    console.error("Error al actualizar la nota", error)
    res.status(500).json({error: "Internal Server Error"})
    
 } 
});


export default router;