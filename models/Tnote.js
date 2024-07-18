import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Tnote = sequelize.define('TextNote', {
   title: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   description: {
      type: DataTypes.TEXT,
      allowNull: false,
   },
});

export default Tnote;