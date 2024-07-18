import sequelize from "../db/db.js";
import Tnote from "./Tnote.js";

sequelize.sync({force: true}).then(() => {
   console.log('Your models have been synchronized to the database successfully!');
}).catch((err) => {
   console.error(err);
});

export {Tnote};