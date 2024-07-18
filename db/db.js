import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: './db/notedb.sqlite'
});
export default sequelize;

