/* app.js — rotas da API
Configura o Express e define os endpoints que recebem as solicitações da interface.
- GET /api/tasks: lista tarefas.
- POST /api/tasks: cadastra uma tarefa.
- PATCH /api/tasks/:id: altera o estado de conclusão.
- DELETE /api/tasks/:id: exclui uma tarefa. */

const express = require('express');
const path = require('path');
const { validateTaskInput } = require('./validation');
const { createTaskService } = require('./taskService');

function createApp(db) {
  const app = express();
  const tasks = createTaskService(db);

  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('/api/tasks', async (req, res) => {
    try { res.json(await tasks.list()); }
    catch { res.status(500).json({ error: 'Não foi possível listar as tarefas.' }); }
  });

  app.post('/api/tasks', async (req, res) => {
    const result = validateTaskInput(req.body);
    if (!result.valid) return res.status(400).json({ error: result.error });
    try { res.status(201).json(await tasks.create(result.data)); }
    catch { res.status(500).json({ error: 'Não foi possível criar a tarefa.' }); }
  });

  app.patch('/api/tasks/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1 || typeof req.body.completed !== 'boolean') {
      return res.status(400).json({ error: 'Informe um ID válido e completed como booleano.' });
    }
    try {
      const task = await tasks.setCompleted(id, req.body.completed);
      if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
      res.json(task);
    } catch { res.status(500).json({ error: 'Não foi possível atualizar a tarefa.' }); }
  });

  app.delete('/api/tasks/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'ID inválido.' });
    try {
      const removed = await tasks.remove(id);
      if (!removed) return res.status(404).json({ error: 'Tarefa não encontrada.' });
      res.status(204).end();
    } catch { res.status(500).json({ error: 'Não foi possível excluir a tarefa.' }); }
  });

  return app;
}

module.exports = { createApp };
