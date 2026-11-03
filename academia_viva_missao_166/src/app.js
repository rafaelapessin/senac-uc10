const express = require("express");
const path = require("path");
const { all, get, run } = require("./database");
const { validateLead, normalizeCourseFilter } = require("./validation");

function createApp(db) {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../public")));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "Academia Viva API funcionando." });
  });

  app.get("/api/courses", async (req, res) => {
    try {
      const modality = normalizeCourseFilter(req.query.modality);
      const courses = modality
        ? await all(db, "SELECT * FROM courses WHERE modality = ? ORDER BY featured DESC, id", [modality])
        : await all(db, "SELECT * FROM courses ORDER BY featured DESC, id");
      res.json(courses);
    } catch (_error) {
      res.status(500).json({ error: "Não foi possível carregar os cursos." });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await get(db, "SELECT * FROM courses WHERE id = ?", [req.params.id]);
      if (!course) return res.status(404).json({ error: "Curso não encontrado." });
      res.json(course);
    } catch (_error) {
      res.status(500).json({ error: "Não foi possível carregar o curso." });
    }
  });

  app.post("/api/leads", async (req, res) => {
    const lead = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || "",
      interest: req.body.interest || "Ainda não sei"
    };
    const validation = validateLead(lead);

    if (!validation.valid) {
      return res.status(400).json({ error: "Verifique os dados informados.", details: validation.errors });
    }

    try {
      const result = await run(db,
        "INSERT INTO leads (name, email, phone, interest) VALUES (?, ?, ?, ?)",
        [lead.name.trim(), lead.email.trim().toLowerCase(), lead.phone.trim(), lead.interest]
      );
      res.status(201).json({ message: "Cadastro recebido com sucesso!", leadId: result.id });
    } catch (_error) {
      res.status(500).json({ error: "Não foi possível registrar seu contato." });
    }
  });

  return app;
}

module.exports = { createApp };
