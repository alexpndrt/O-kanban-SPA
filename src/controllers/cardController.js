import { Card } from '../models/index.js';
import sanitizeHtml from 'sanitize-html';

const cardController = {
    async index(_req, res) {
        const cards = await Card.findAll({
            include: ['list', 'tags'],
        });

        res.json(cards);
    },

    async store(req, res) {
        const { content, list_id, color } = req.body;

        const newCard = await Card.create({ content, list_id, color });

        res.status(201).json(newCard);
    },

    async show(req, res, next) {
        const { id } = req.params;

        const card = await Card.findByPk(id);

        if (!card) {
            return next();
        }

        return res.json(card);
    },

    async update(req, res, next) {
        const { id } = req.params;
        const { content, position, list_id, color } = req.body;

        const cardToUpdate = await Card.findByPk(id);

        if (!cardToUpdate) {
            return next();
        }

        const updatedCard = await cardToUpdate.update({
            content:
                sanitizeHtml(content) || sanitizeHtml(cardToUpdate.content),
            list_id: list_id || cardToUpdate.list_id,
            color: color || cardToUpdate.color,
            position: position ?? cardToUpdate.position,
        });

        res.json(updatedCard);
    },

    async destroy(req, res, next) {
        const { id } = req.params;

        const card = await Card.findByPk(id);

        if (!card) {
            return next();
        }

        await card.destroy();

        res.status(204).end();
    },
};

export { cardController };
