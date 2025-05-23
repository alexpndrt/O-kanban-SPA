BEGIN;

DROP TABLE IF EXISTS card_has_tag, card, tag, list;

CREATE TABLE card_has_tag (
    card_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    PRIMARY KEY (card_id, tag_id)
);

CREATE TABLE card (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    color CHAR(7),
    list_id BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ
);

CREATE TABLE tag (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(20),
    color CHAR(7),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ
);

CREATE TABLE list (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(200),
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ
);

ALTER TABLE
    card_has_tag
ADD
    FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE;

ALTER TABLE
    card_has_tag
ADD
    FOREIGN KEY (card_id) REFERENCES card (id) ON DELETE CASCADE;

ALTER TABLE
    card
ADD
    FOREIGN KEY (list_id) REFERENCES list (id) ON DELETE CASCADE;

COMMIT;
