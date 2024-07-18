import {Tnote} from "../models/index.js";
import { Op } from 'sequelize';

class NoteController {
   static async getAllTypes(req, res) {
      try {
         const altnotes = await Tnote.findAll({order: [['title', 'ASC']]})
         res.status(200);
         console.log(altnotes);
         res.json(altnotes);
      } catch (error) {
         res.status(500);
         console.log(error);
         return
      }
   }
   static async addTxt(req, res) {
      try {
         const {title, text} = req.body;
         if(!title || !text) {
            res.status(400);
            res.json({err: 'Fill the empty properties'});
            return
         }
         const isonote = await Tnote.findOne({
            where: {
               title: title
            }
         });
         if(isonote) {
            res.status(400).json("There's already a note with this name")
            return
         }
         if (title.indexOf(' ') !== -1) {
            const ntnote = await Tnote.create({title: underlineit(title.toLowerCase()), description: text});
            res.status(200);
            res.json({message: 'The requested note has been created successfully!'}); 
         } else {
            const ntnote = await Tnote.create({title: title.toLowerCase(), description: text});
            res.status(200);
            res.json({message: 'The requested note has been created successfully!', islist: false}); 
         }
      } catch (error) {
         res.status(500);
         console.log(error);
         return
      }
   }
   static async updateTxtByName(req, res) {
      try {
         const {id} = req.params;
         const {ntitle, ntext} = req.body;
         const rtitle = ntitle.toLowerCase();
         console.log(rtitle);
         if(!ntitle || !ntext) {
            res.status(400).json({message: 'Fill the empty spaces.'});
            return
         }
         if(ntitle.indexOf(' ')) {
            const param = await Tnote.findOne({where: {id: id}})
            console.log(param.title)
            const isonote = await Tnote.findOne({
               where: {
                  [Op.not]: {
                     title: param.title
                  },
                  title: rtitle
               }
            });
            if(isonote) {
               res.status(400).json("There's already a note with this name")
               return
            }
            const [updated] = await Tnote.update(
               {title: underlineit(rtitle), description: ntext},
               {where: {id: id}}
            )
            if(!updated) {
               res.status(404).json({err: 'Not found'});
               return
            }
            res.status(200).json({message: 'The requested note was updated succesfully!'});
         } else {
            const param = await Tnote.findOne({where: {id: id}})
            console.log(param.title);
            const isonote = await Tnote.findOne({
               where: {
                  [Op.not]: {
                     title: param.title
                  },
                  title: ntitle
               }
            });
            if(isonote) {
               res.status(400).json("There's already a note with this name")
               return
            }
            let [updated] = await Tnote.update({title: ntitle, description: ntext}, {where: {id: id}});
            if(!updated) {
               res.status(404).json({err: 'Not found'});
               return
            }
            res.status(200).json({message: 'The requested note was updated succesfully!'});
         }
         } catch (error) {
            res.status(500);
            console.log(error);
            return;
         }
   }
   static async deleteByName(req, res) {
      try {
         const {name} = req.params;
         const istext = await Tnote.findOne({where: {title: underlineit(name)}});
         res.status(200);
         const todeltnote = await Tnote.destroy({where: {title: name}});
         res.json({message: 'The requested note was deleted succesfully.'});
         res.status(200);
         const todellnote = await Lnote.destroy({where: {title: name}});
         res.json({message: 'The requested note was deleted succesfully.'});           
      } catch(error) {
         res.status(500);
         console.log(error);
         return
      }
   }
   static async GetById(req, res) {
      try {
         const {id} = req.params;
         const note = await Tnote.findOne({where: {id: id}});
         if(!note) {
            res.status(404).json({error: 'Not found'});
            return;
         }
         res.status(200).json(note)   
      } catch (error) {
         res.status(500);
         console.log(error);
         return
      }
   }
}

function underlineit(str) {
   return str.replace(/ /g, '_');
}
export default NoteController;