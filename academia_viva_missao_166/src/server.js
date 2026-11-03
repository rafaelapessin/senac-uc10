const fs = require("fs");
const path = require("path");
const { openDatabase, initializeDatabase } = require("./database");
const { createApp } = require("./app");

async function start() {
  const dataDir = path.join(__dirname, "../data");
  fs.mkdirSync(dataDir, { recursive: true });

  const db = openDatabase(path.join(dataDir, "academia-viva.sqlite"));
  await initializeDatabase(db);

  const app = createApp(db);
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Academia Viva disponível em http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Erro ao iniciar a aplicação:", error);
  process.exit(1);
});
