/* taskService.js — operações com tarefas
Concentra as funções responsáveis por criar, listar, atualizar e excluir registros no SQLite.
Separar essas operações das rotas facilita a manutenção do código e permite testar o serviço isoladamente. */

function createTaskService(db) {
  function list() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM tasks ORDER BY id DESC', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(row => ({ ...row, completed: Boolean(row.completed) })));
      });
    });
  }

  function create({ title, description = '' }) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description],
        function (err) {
          if (err) return reject(err);
          db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (getErr, row) => {
            if (getErr) return reject(getErr);
            resolve({ ...row, completed: Boolean(row.completed) });
          });
        }
      );
    });
  }

  function setCompleted(id, completed) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE tasks SET completed = ? WHERE id = ?', [completed ? 1 : 0, id], function (err) {
        if (err) return reject(err);
        if (!this.changes) return resolve(null);
        db.get('SELECT * FROM tasks WHERE id = ?', [id], (getErr, row) => {
          if (getErr) return reject(getErr);
          resolve({ ...row, completed: Boolean(row.completed) });
        });
      });
    });
  }

  function remove(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });
  }

  return { list, create, setCompleted, remove };
}

module.exports = { createTaskService };
