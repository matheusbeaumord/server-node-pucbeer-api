## Desenvolvimento

- O back-end deve ser iniciado com `npm start` na pasta e escutar a porta `3001`.

O banco de dados utilizado será o `MySQL`!

Haverá um arquivo chamado `script.sql` onde já contém a criação de do banco e alguns inserts.

Para rodar o arquivo basta rodar o comando:

`mysql -u root -p`

Isso fará com que abra o terminal do MySQL se abra. Depois, basta executar o comando:

`source pasta_do_projeto/script.sql`

Assim já irá criar o banco e terá alguns dados inseridos. **É essencial seguir esses passos!**

**Você irá precisar configurar as variáveis globais do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

`puc-beer/back-end/models/connection.js`

```
const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  database: 'PucBeer'
};
```
