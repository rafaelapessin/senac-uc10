const courseGrid = document.querySelector("#courseGrid");
const courseCount = document.querySelector("#courseCount");
const filterButtons = document.querySelectorAll(".filter-button");
const leadForm = document.querySelector("#leadForm");
const formMessage = document.querySelector("#formMessage");
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

const courseIcons = ["⌘", "▦", "✳", "◉", "⌁", "↗"];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[character]));
}

function renderCourses(courses) {
  courseCount.textContent = `${courses.length} ${courses.length === 1 ? "curso encontrado" : "cursos disponíveis"}`;
  if (!courses.length) {
    courseGrid.innerHTML = '<div class="loading-card">Nenhum curso encontrado nesta modalidade.</div>';
    return;
  }

  courseGrid.innerHTML = courses.map((course, index) => `
    <article class="course-card">
      <div class="course-topline">
        <span class="course-category">${escapeHTML(course.category)}</span>
        <span class="course-modality ${course.modality === "Presencial" ? "presencial" : ""}">${escapeHTML(course.modality)}</span>
      </div>
      <div class="course-icon" aria-hidden="true">${courseIcons[index % courseIcons.length]}</div>
      <h3>${escapeHTML(course.title)}</h3>
      <p>${escapeHTML(course.description)}</p>
      <div class="course-footer">
        <span class="course-duration">${escapeHTML(course.duration)}</span>
        <a class="course-link" href="#contato" data-course="${escapeHTML(course.title)}">Tenho interesse <span>↗</span></a>
      </div>
    </article>
  `).join("");

  courseGrid.querySelectorAll("[data-course]").forEach((link) => {
    link.addEventListener("click", () => {
      const interest = document.querySelector("#interest");
      interest.value = "Ainda não sei";
      document.querySelector("#name").focus({ preventScroll: true });
    });
  });
}

async function loadCourses(modality = "Todos") {
  courseGrid.innerHTML = '<div class="loading-card">Carregando cursos...</div>';
  try {
    const query = modality === "Todos" ? "" : `?modality=${encodeURIComponent(modality)}`;
    const response = await fetch(`/api/courses${query}`);
    if (!response.ok) throw new Error("Falha ao consultar cursos.");
    renderCourses(await response.json());
  } catch (_error) {
    courseGrid.innerHTML = '<div class="loading-card">Não foi possível carregar os cursos. Tente novamente mais tarde.</div>';
    courseCount.textContent = "Cursos indisponíveis";
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    loadCourses(button.dataset.filter);
  });
});

leadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  formMessage.className = "form-message";

  const payload = Object.fromEntries(new FormData(leadForm).entries());
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) {
      formMessage.textContent = result.details?.join(" ") || result.error || "Confira os dados e tente novamente.";
      formMessage.classList.add("error");
      return;
    }
    formMessage.textContent = result.message;
    formMessage.classList.add("success");
    leadForm.reset();
  } catch (_error) {
    formMessage.textContent = "Não foi possível enviar agora. Tente novamente.";
    formMessage.classList.add("error");
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

loadCourses();
