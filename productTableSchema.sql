DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL auto_increment,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  
  price DECIMAL(10,2) NOT NULL,
  stock_quantity integer NOT NULL,
 
  PRIMARY KEY (item_id)
);