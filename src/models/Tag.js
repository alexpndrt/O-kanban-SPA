import { Model, DataTypes } from "sequelize";
import { client } from '../database/client.js';

class Tag extends Model {}

Tag.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        color: DataTypes.CHAR(7),
    },
    {
        sequelize: client,
        tableName: 'tag',
    }
)


export { Tag }