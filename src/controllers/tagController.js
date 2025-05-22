import { Card, Tag } from '../models/index.js';

const tagController = {
    async index(_req, res) {
        const tags = await Tag.findAll({
            include: ['cards'],
        });

        res.json(tags);
    },

    async store(req, res) {
        const { name, color } = req.body;

        const newTag = await Tag.create({ name, color });

        res.status(201).json(newTag);
    },

    async show(req, res, next) {
        const { id } = req.params;

        const tag = await Tag.findByPk(id);

        if (!tag) {
            return next();
        }

        return res.json(tag);
    },

    async update(req, res, next) {
        const { id } = req.params;
        const { name, color } = req.body;

        const tagToUpdate = await Tag.findByPk(id);

        if (!tagToUpdate) {
            return next();
        }

        const updatedTag = await tagToUpdate.update({
            name: name || tagToUpdate.name,
            color: color ?? tagToUpdate.color,
        });

        res.json(updatedTag);
    },

    async destroy(req, res, next) {
        const { id } = req.params;

        const tag = await Tag.findByPk(id);

        if (!tag) {
            return next();
        }

        await tag.destroy();

        res.status(204).end();
    },

    async associateTagToCard(req, res, next) {
        const { card_id, tag_id } = req.params;

        const tag = await Tag.findByPk(tag_id);

        if (!tag) {
            return next();
        }

        const card = await Card.findByPk(card_id);
        if (!card) {
            return next();
        }

        await tag.addCard(card);

        const freshCard = await Card.findByPk(card_id, { include: 'tags' });

        res.json(freshCard);
    },

    async disassociateTagFromCard(req, res, next) {
        const { card_id, tag_id } = req.params;

        const tag = await Tag.findByPk(tag_id);
        if (!tag) {
            return next();
        }

        const card = await Card.findByPk(card_id);
        if (!card) {
            return next();
        }

        await tag.removeCard(card);

        const freshCard = await Card.findByPk(card_id, { include: 'tags' });

        res.json(freshCard);
    },
};

export { tagController };
