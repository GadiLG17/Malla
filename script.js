document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  cursos.forEach(curso => {
    const id = curso.dataset.id;
    const credit = curso.dataset.creditos || "N/A";
    const reqs = (curso.dataset.requiere || "").split(",").filter(Boolean);

    // Generar tooltip mejorado
    let tip = curso.querySelector(".tooltip");
    if (!tip) {
      tip = document.createElement("div");
      tip.className = "tooltip";
      curso.appendChild(tip);
    }
    tip.innerHTML = `Créditos: ${credit}${reqs.length ? `<br>Requiere: ${reqs.join(", ")}` : "<br>Sin requisitos"}`;

    // Click con validación de prerrequisitos
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

    // ❌ Eliminado el efecto visual de resaltar requisitos
    // curso.addEventListener("mouseenter", ... )
    // curso.addEventListener("mouseleave", ... )
  });
});
