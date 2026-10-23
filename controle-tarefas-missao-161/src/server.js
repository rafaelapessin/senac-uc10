/* server.js — inicialização do servidor
É o ponto de entrada da aplicação. Cria a conexão com o banco de dados, configura a aplicação e inicia o servidor na porta 3000.
É o arquivo executado pelo comando npm start.*/

const { createDatabase } = require('./db');
const { createApp } = require('./app');

const db = createDatabase();
const app = createApp(db);
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Controle de Tarefas disponível em http://localhost:${port}`);
});

function shutdown() {
  server.close(() => db.close(() => process.exit(0)));
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
