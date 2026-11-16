// app.js — comportamento da interface
// Captura os eventos do formulário, envia requisições à API, carrega as tarefas e atualiza a página após cadastrar, concluir ou excluir uma tarefa.
// Ele utiliza fetch() para conversar com o servidor.

const form = document.querySelector('#task-form');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const taskList = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const taskCount = document.querySelector('#task-count');
const message = document.querySelector('#message');

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  if (!response.ok) {
    const data = response.status === 204 ? {} : await response.json();
    throw new Error(data.error || 'Ocorreu um erro inesperado.');
  }
  return response.status === 204 ? null : response.json();
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = `task-card${task.completed ? ' completed' : ''}`;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', `Concluir ${task.title}`);
  checkbox.addEventListener('change', async () => {
    try { await request(`/api/tasks/${task.id}`, { method: 'PATCH', body: JSON.stringify({ completed: checkbox.checked }) }); await loadTasks(); }
    catch (error) { message.textContent = error.message; }
  });

  const content = document.createElement('div');
  content.className = 'task-content';
  const title = document.createElement('div');
  title.className = 'task-title';
  title.textContent = task.title;
  content.appendChild(title);
  if (task.description) {
    const description = document.createElement('p');
    description.className = 'task-description';
    description.textContent = task.description;
    content.appendChild(description);
  }

  const removeButton = document.createElement('button');
  removeButton.className = 'delete-button';
  removeButton.type = 'button';
  removeButton.textContent = 'Excluir';
  removeButton.addEventListener('click', async () => {
    try { await request(`/api/tasks/${task.id}`, { method: 'DELETE' }); await loadTasks(); }
    catch (error) { message.textContent = error.message; }
  });

  li.append(checkbox, content, removeButton);
  return li;
}

async function loadTasks() {
  try {
    const tasks = await request('/api/tasks');
    taskList.replaceChildren(...tasks.map(createTaskElement));
    emptyState.hidden = tasks.length > 0;
    taskCount.textContent = `${tasks.length} ${tasks.length === 1 ? 'tarefa' : 'tarefas'}`;
  } catch (error) {
    message.textContent = error.message;
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = '';
  try {
    await request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title: titleInput.value, description: descriptionInput.value })
    });
    form.reset();
    titleInput.focus();
    message.textContent = 'Tarefa adicionada com sucesso!';
    await loadTasks();
  } catch (error) { message.textContent = error.message; }
});

loadTasks();
