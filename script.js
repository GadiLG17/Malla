document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  cursos.forEach(curso => {
    const id = curso.dataset.id;
    const credit = curso.dataset.creditos;
    const reqs = (curso.dataset.requiere || "").split(",").filter(Boolean);

    // Generar tooltip
    let tip = curso.querySelector(".tooltip");
    if (!tip) {
      tip = document.createElement("div");
      tip.className = "tooltip";
      curso.appendChild(tip);
    }
    tip.textContent = `Créditos: ${credit}${reqs.length ? ` | Requiere: ${reqs.join(", ")}` : ""}`;

    // Click con bloqueo si no cumple prerrequisitos
    curso.addEventListener("click", () => {
      const reqsOk = reqs.every(r => {
        const el = document.querySelector(`.curso[data-id="${r}"]`);
        return el && el.classList.contains("llevado");
      });

      if (reqs.length === 0 || reqsOk) {
        curso.classList.toggle("llevado");
      } else {
        alert(`No puedes marcar "${id}" como llevado.\nPrimero debes aprobar: ${reqs.join(", ")}`);
      }
    });

    // Hover resaltar prerrequisitos
    curso.addEventListener("mouseenter", () => {
      reqs.forEach(r => {
        const el = document.querySelector(`.curso[data-id="${r}"]`);
        if (el) el.classList.add("requisito");
      });
    });
    curso.addEventListener("mouseleave", () => {
      document.querySelectorAll(".requisito").forEach(e => e.classList.remove("requisito"));
    });
  });
});
