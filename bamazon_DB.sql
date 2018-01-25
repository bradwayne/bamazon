DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products (
item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT(10),
PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("couch", "furniture", 1149.99, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dining room table", "furniture", 599.89, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("refrigerator", "appliances", 825.79, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("washing machine", "appliances", 425.79, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lawn mower", "lawn & garden", 225.79, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("weed wacker", "lawn & garden", 119.25, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("weel barrow", "lawn & garden", 39.99, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("floor lamp", "lighting", 49.69, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tool chest", "tools", 119.39, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("drill", "power tools", 69.25, 7);


SELECT * FROM products;

