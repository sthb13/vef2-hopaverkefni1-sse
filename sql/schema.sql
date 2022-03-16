CREATE TABLE category (
	id serial UNIQUE,
	title VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE products (
	id serial PRIMARY KEY,
	title VARCHAR(64) NOT NULL UNIQUE,
	price INTEGER NOT NULL,
	description text NOT NULL,
	img VARCHAR(256) NOT NULL,
	categoryID INTEGER NOT NULL,
	created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	lastEdit TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT categoryID FOREIGN KEY (categoryID) REFERENCES category(id)
);

CREATE TABLE baskets (
	id VARCHAR(64) PRIMARY KEY,
	created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE basketItems (
  id serial PRIMARY KEY,
	productID INTEGER NOT NULL,
	basketID VARCHAR(64) NOT NULL,
	amount INTEGER CHECK( amount > 0),
	CONSTRAINT productID FOREIGN KEY(productID) REFERENCES products(id),
	CONSTRAINT basketID FOREIGN KEY(basketID) REFERENCES baskets(id)
);

CREATE TABLE orders (
	id VARCHAR(32) PRIMARY KEY,
	created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	name VARCHAR NOT NULL
);

CREATE TABLE orderItems (
	productID INTEGER NOT NULL,
	basketID VARCHAR(32) NOT NULL,
	amount INTEGER CHECK( amount > 0),
	CONSTRAINT productID FOREIGN KEY(productID) REFERENCES products(id),
	CONSTRAINT basketID FOREIGN KEY(basketID) REFERENCES baskets(id)
);

CREATE DOMAIN st AS VARCHAR(8) NOT NULL CHECK(
	VALUE ~* 'NEW | PREPARE | COOKING | READY | FINISHED'
);

CREATE TABLE orderStatus (
	orderID VARCHAR(32) NOT NULL,
	status st,
	lastStChange TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT orderID FOREIGN KEY(orderID) REFERENCES orders(id)
);

CREATE TABLE users (
	id serial primary key,
	username character varying(64) NOT NULL,
	password character varying(256) NOT NULL,
  admin BOOLEAN DEFAULT false
);
