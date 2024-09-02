CREATE TABLE measures (
    id SERIAL PRIMARY KEY NOT NULL,
    type VARCHAR(256) NOT NULL,
    confirmed boolean NOT NULL,
    customer_code VARCHAR(256) NOT NULL,
    image_url VARCHAR(512) NOT NULL,
    image_value INTEGER NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    deleted_at TIMESTAMPTZ
);