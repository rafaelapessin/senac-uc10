const sqlite3 = require("sqlite3").verbose();

function openDatabase(filename = "./data/academia-viva.sqlite") {
  return new sqlite3.Database(filename);
}

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (error) {
      if (error) return reject(error);
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function all(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) return reject(error);
      resolve(rows);
    });
  });
}

function get(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) return reject(error);
      resolve(row);
    });
  });
}

async function initializeDatabase(db) {
  await run(db, `CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    modality TEXT NOT NULL CHECK(modality IN ('Online', 'Presencial')),
    duration TEXT NOT NULL,
    description TEXT NOT NULL,
    featured INTEGER DEFAULT 0
  )`);

  await run(db, `CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    interest TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  const count = await get(db, "SELECT COUNT(*) AS total FROM courses");
  if (count.total === 0) {
    const courses = [
      ["Desenvolvimento Web do Zero", "Tecnologia", "Online", "40 horas", "Aprenda HTML, CSS e JavaScript criando projetos reais.", 1],
      ["Excel para o Mercado de Trabalho", "Negócios", "Presencial", "16 horas", "Domine planilhas, fórmulas e organização de dados.", 1],
      ["Marketing Digital na Prática", "Marketing", "Online", "24 horas", "Planeje campanhas, conteúdo e estratégias para redes sociais.", 1],
      ["Comunicação e Atendimento", "Carreira", "Presencial", "12 horas", "Desenvolva uma comunicação clara e um atendimento de excelência.", 0],
      ["Lógica de Programação", "Tecnologia", "Online", "30 horas", "Construa sua base em algoritmos e resolução de problemas.", 0],
      ["Liderança de Equipes", "Gestão", "Presencial", "20 horas", "Pratique ferramentas para liderar pessoas e projetos.", 0]
    ];
    for (const course of courses) {
      await run(db, `INSERT INTO courses
        (title, category, modality, duration, description, featured)
        VALUES (?, ?, ?, ?, ?, ?)`, course);
    }
  }
}

module.exports = { openDatabase, run, all, get, initializeDatabase };
