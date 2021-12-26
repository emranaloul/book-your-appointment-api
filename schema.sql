DROP TABLE IF EXISTS jwt;
DROP TABLE IF EXISTS appointment;
DROP TABLE IF EXISTS client;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE client(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  first_name VARCHAR (250) NOT NULL,
  last_name VARCHAR (250) NOT NULL,
  role VARCHAR (250) NOT NULL,
  commercial_name VARCHAR (250)
);

CREATE TABLE appointment(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    buyer_id UUID NOT null,
    seller_id UUID NOT null,
    appointment VARCHAR (250) NOT NULL,
    status VARCHAR (250) DEFAULT 'pending',
    note TEXT,

    FOREIGN KEY (buyer_id) REFERENCES client(id),
     FOREIGN KEY (seller_id) REFERENCES client(id)
);

CREATE TABLE jwt(
   id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    token VARCHAR (250) NOT NULL,
    client_id uuid NOT null,

    FOREIGN KEY (client_id) REFERENCES client(id)
);