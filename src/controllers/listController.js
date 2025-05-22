import { List } from '../models/index.js';

const listController = {
    async index(_req, res) {
        // ? order by position
        const lists = await List.findAll({
            include: {
                association: 'cards',
                include: 'tags',
            },
            order: [
                ['position', 'ASC'],
                ['created_at', 'DESC'],
                ['cards', 'position', 'ASC'],
            ],
        });

        res.json(lists);
    },

    async store(req, res) {
        const { title } = req.body;

        const newList = await List.create({ title: title });

        // ? le code 201 indique que la persistance des données est ok.
        res.status(201).json(newList);
    },

    async show(req, res, next) {
        // const id = req.params.id;
        // * l'ID doit être un nombre entier positif : valider par middleware
        const { id } = req.params;

        const list = await List.findByPk(id);

        if (!list) {
            return next();
        }

        return res.json(list);
    },

    async update(req, res, next) {
        const { id } = req.params;
        const { title, position } = req.body;

        const listToUpdate = await List.findByPk(id);

        if (!listToUpdate) {
            return next();
        }

        const updatedList = await listToUpdate.update({
            title: title || listToUpdate.title,
            // * Attention aux valeurs quand on fait value || otherValue : si value === 0, il sera interprété comme false et pas comme un nombre
            //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
            position: position ?? listToUpdate.position,
        });

        res.json(updatedList);
    },

    async destroy(req, res, next) {
        const { id } = req.params;

        const list = await List.findByPk(id);

        if (!list) {
            return next();
        }

        await list.destroy();

        res.status(204).end();
    },
};

export { listController };
