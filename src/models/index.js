import { client } from '../database/client.js';
import { Card } from './Card.js';
import { List } from './List.js';
import { Tag } from './Tag.js';

// one to many
List.hasMany(Card, {
    foreignKey: 'list_id',
    as: 'cards',
    onDelete: 'CASCADE',
});

Card.belongsTo(List, {
    foreignKey: 'list_id',
    as: 'list',
    onDelete: 'CASCADE',
});

// many to many
Card.belongsToMany(Tag, {
    foreignKey: 'card_id',
    otherKey: 'tag_id',
    as: 'tags',
    through: 'card_has_tag',
    timestamps: false,
    onDelete: 'CASCADE',
});

Tag.belongsToMany(Card, {
    foreignKey: 'tag_id',
    otherKey: 'card_id',
    as: 'cards',
    through: 'card_has_tag',
    timestamps: false,
    onDelete: 'CASCADE',
});

export { client, Card, List, Tag };
