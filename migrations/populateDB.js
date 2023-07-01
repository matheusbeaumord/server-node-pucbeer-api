const { Pool } = require('pg');
const connection = require('../model/connection');
const scriptSQL = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL,
    UNIQUE (email)
);
CREATE TABLE IF NOT EXISTS sales (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(9, 2) NOT NULL,
    delivery_address VARCHAR(100) NOT NULL,
    delivery_number VARCHAR(50) NOT NULL,
    sale_date TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(4, 2) NOT NULL,
    url_image VARCHAR(200) NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS sales_products (
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity VARCHAR(10) NOT NULL,
    PRIMARY KEY(sale_id, product_id),
    FOREIGN KEY(sale_id) REFERENCES sales(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
);
INSERT INTO users (name, email, password, role)
VALUES (
        'pucbeer Admin',
        'pucbeer@pucbeer.com.br',
        '123456',
        'administrator'
    ),
    ('testuser', 'user@test.com', 'test123', 'client');
INSERT INTO products (name, price, url_image)
VALUES (
        'Skol Lata 250ml',
        2.20,
        'http://localhost:3001/images/Skol Lata 350ml.jpg'
    ),
    (
        'Heineken 600ml',
        7.50,
        'http://localhost:3001/images/Heineken 600ml.jpg'
    ),
    (
        'Antarctica Pilsen 300ml',
        2.49,
        'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg'
    ),
    (
        'Brahma 600ml',
        7.50,
        'http://localhost:3001/images/Brahma 600ml.jpg'
    ),
    (
        'Skol 269ml',
        2.19,
        'http://localhost:3001/images/Skol 269ml.jpg'
    ),
    (
        'Skol Beats Senses 313ml',
        4.49,
        'http://localhost:3001/images/Skol Beats Senses 313ml.jpg'
    ),
    (
        'Becks 330ml',
        4.99,
        'http://localhost:3001/images/Becks 330ml.jpg'
    ),
    (
        'Brahma Duplo Malte 350ml',
        2.79,
        'http://localhost:3001/images/Brahma Duplo Malte 350ml.jpg'
    ),
    (
        'Becks 600ml',
        8.89,
        'http://localhost:3001/images/Becks 600ml.jpg'
    ),
    (
        'Skol Beats Senses 269ml',
        3.57,
        'http://localhost:3001/images/Skol Beats Senses 269ml.jpg'
    ),
    (
        'Stella Artois 275ml',
        3.49,
        'http://localhost:3001/images/Stella Artois 275ml.jpg'
    );
`;

(async () => {
  try {
    const client = await connection.connect();
    await client.query(scriptSQL); // Substitua 'scriptSQL' pelo nome da variável que contém o script SQL.

    console.log('O banco de dados foi populado com sucesso!');
    client.release();
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  } finally {
    connection.end();
  }
})();
