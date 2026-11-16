/* db.js — conexão com o banco de dados
Configura o SQLite e cria a tabela tasks caso ela ainda não exista.
A tabela possui campos como id, title, description, completed e created_at. */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function createDatabase(filename = path.join(__dirname, '..', 'tarefas.db')) {
  const db = new sqlite3.Database(filename);
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        completed INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });
  return db;
}

module.exports = { createDatabase };
