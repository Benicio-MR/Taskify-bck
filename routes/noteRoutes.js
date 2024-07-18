import { Router } from "express";
import NoteController from "../controllers/NoteController.js"; 

const noteRoutes = Router();

/*===================================GET======================================*/
// /notes
noteRoutes.get('/', NoteController.getAllTypes);
noteRoutes.get('/:id', NoteController.GetById);
/*==================================POST======================================*/
// /notes/add/text
noteRoutes.post('/add/text', NoteController.addTxt);

/*===================================PUT======================================*/
// /notes/text/update/:name
noteRoutes.put('/text/update/:id', NoteController.updateTxtByName);

/*=================================DELETE=====================================*/
// /notes/delete/:name
noteRoutes.delete('/delete/:name', NoteController.deleteByName);

export default noteRoutes;