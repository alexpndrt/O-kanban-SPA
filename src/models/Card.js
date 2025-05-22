import { Model, DataTypes } from "sequelize";
import { client } from '../database/client.js';

class Card extends Model {}

Card.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        color: DataTypes.CHAR(7),
        list_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize: client,
        tableName: 'card',
    }
)


export { Card }