import { Sequelize } from "sequelize";
import { app } from "../../app.js";

const client = new Sequelize(app.get('db_url'), {
    dialect:  'postgres',
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
    },
});


export { client }
