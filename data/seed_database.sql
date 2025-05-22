BEGIN;

INSERT INTO
    list (title)
VALUES
    ('Shopping'),
    ('Travail'),
    ('Maison');

INSERT INTO
    card (content, list_id)
VALUES
    ('Tomates', 1),
    ('Comcombres', 1),
    ('Citron Vert', 1),
    ('Coriandre', 1),
    ('Faire le mcd', 2),
    ('Installer Express', 2),
    ('Faire le ménage', 3),
    ('Réparer le vélo', 3);

INSERT INTO
    tag (name)
VALUES
    ('normal'),
    ('urgent'),
    ('en retard');

INSERT INTO
    card_has_tag (card_id, tag_id)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 2),
    (6, 2),
    (7, 3),
    (8, 3);

COMMIT;
