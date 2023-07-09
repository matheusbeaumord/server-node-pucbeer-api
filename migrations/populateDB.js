const { Pool } = require('pg');
const connection = require('../model/connection');
const scriptSQL = `
-- Excluir as tabelas se elas existirem
DROP TABLE IF EXISTS sales_products;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
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
    price DECIMAL(6, 2) NOT NULL,
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
        'https://hiperideal.vteximg.com.br/arquivos/ids/198512-1000-1000/3d4178201f906d5292c39805fb47b34c_cerveja-skol-lata-269ml_lett_1.jpg?v=637886498113330000'
    ),
    (
        'Heineken 600ml',
        7.50,
        'https://hiperideal.vteximg.com.br/arquivos/ids/197890/1922696.jpg?v=637855539470630000'
    ),
    (
        'Antarctica Pilsen 300ml',
        2.49,
        'https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/bebfesta/catalog/beb-festa-cerveja-300ml-antarctica-1.jpg'
    ),
    (
        'Brahma 600ml',
        7.50,
        'https://d2r9epyceweg5n.cloudfront.net/stores/001/043/122/products/cerveja-brahma-600-ml1-19c83909aa5e3aa4a415676924380455-640-0.jpg'
    ),
    (
        'Skol 269ml',
        2.19,
        'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/beirario/media/uploads/produtos/foto/b6d35524c82d0file.png'
    ),
    (
        'Skol Beats Senses 313ml',
        4.49,
        'https://a-static.mlcdn.com.br/450x450/skol-beats-senses-long-neck-313ml-pack-6-unidades/flordepitangah/3b011852c7c211ebb5204201ac18500e/c4e74984e91051d7116f563d71501400.jpeg'
    ),
    (
        'Becks 330ml',
        4.99,
        'https://m.media-amazon.com/images/I/81cqz-9bJhS.jpg'
    ),
    (
        'Brahma Duplo Malte 350ml',
        2.79,
        'https://d2r9epyceweg5n.cloudfront.net/stores/001/043/122/products/600ml1-f24a1cf5c23d7f0dfb16842615885703-640-0.webp'
    ),
    (
        'Becks 600ml',
        8.89,
        'https://s3-sa-east-1.amazonaws.com/bluesoft-erp/kacula/ecommerce/produtos/fotos/059eb903-2bb0-4f2e-a788-5305c0a8e458/foto_large.jpg'
    ),
    (
        'Skol Beats Senses 269ml',
        3.57,
        'https://media.soujusto.com.br/products/5157_.jpg'
    ),
    (
        'Stella Artois 275ml',
        3.49,
        'https://images-americanas.b2w.io/produtos/47346718/imagens/cerveja-stella-artois-long-neck-275ml/47346715_1_large.jpg'
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
