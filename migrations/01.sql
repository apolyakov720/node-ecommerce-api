CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  email varchar UNIQUE NOT NULL,
  password varchar NOT NULL,
  first_name text,
  last_mane text,
  address text,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  description text,
  category varchar(255),
  price integer,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_id ON products (id);

CREATE TABLE IF NOT EXISTS basket_session (
  id serial PRIMARY KEY,
  user_id integer,
  total decimal(10, 2) NOT NULL DEFAULT '0.00',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS basket_item (
  id serial PRIMARY KEY,
  session_id integer,
  product_id integer,
  quantity integer,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES basket_session(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);