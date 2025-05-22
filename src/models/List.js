import { Model, DataTypes } from "sequelize";
import { client } from '../database/client.js';

// https://stackoverflow.com/questions/32544151/sequelize-is-returning-integer-as-string
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/BigInt

class List extends Model { }

List.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true
        },

        title: DataTypes.STRING(200),

        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize: client,
        tableName: 'list'
    }
)


export { List }