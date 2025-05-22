import { List, Card, Tag, client } from '../models/index.js';

const installController = {
    async index(_req, res) {
        // ? la méthode .sync() sert à créer une table en BDD à partir d'un modèle
        // await List.sync({ force: true });
        // await Card.sync({ force: true });
        // await Tag.sync({ force: true });

        // ? Création des tables de la BDD (avec toutes les clés étrangères)
        await client.sync({ force: true });

        // ? Seeding de la BDD
        await List.bulkCreate([
            { title: 'Shopping' },
            { title: 'Travail' },
            { title: 'Maison' },
        ]);

        await Card.bulkCreate([
            { content: 'Tomates', list_id: 1 },
            { content: 'Comcombres', list_id: 1 },
            { content: 'Citron Vert', list_id: 1 },
            { content: 'Coriandre', list_id: 1 },
            { content: 'Faire le mcd', list_id: 2 },
            { content: 'Installer express 5', list_id: 2 },
            { content: 'Faire le ménage', list_id: 3 },
            { content: 'Réparer le vélo', list_id: 3 },
        ]);

        await Tag.bulkCreate([
            { name: 'normal', color: '#fd4567' },
            { name: 'urgent', color: '#gggggg' },
            { name: 'en retard', color: '#BADA55' },
        ]);

        // ! pseudo code
        const card = await Card.findByPk(1);
        const tag = await Tag.findByPk(1);

        // https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
        // ? méthode magique
        await card.addTag(tag);

        const query = `
            INSERT INTO
                card_has_tag (card_id, tag_id)
            VALUES
                (2, 1),
                (3, 1),
                (4, 1),
                (5, 2),
                (6, 2),
                (7, 3),
                (8, 3);
            `;

        await client.query(query);

        res.json({
            message:
                "installation complète, vous pouvez effacer le router et le controller d'install",
        });
    },
};

export { installController };
