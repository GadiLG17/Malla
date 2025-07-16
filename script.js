document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("tbody");

  // Este objeto debe coincidir con tus cursos y sus requisitos
  const cursosPorArea = {
    // Ejemplo: "Nombre del área": [ [curso1_sem1, curso1_sem2, ...], [curso2_sem1, curso2_sem2, ...], ... ]
    "DISEÑO Y PROYECTOS": [
      ["PR1|Proyectos I|8"],
      ["PR2|Proyectos II|8|PR1"],
      ["PR3|Proyectos III|8|PR2"],
      ["PR4|Proyectos IV|8|PR3"],
      ["PR5|Proyectos V|8|PR4"],
      ["PR6|Proyectos VI|8|PR5"],
      ["PR7|Proyectos VII|8|PR6,UR2"],
      ["PR8|Curso de Trabajo de Investigación: Proyectos 8|8|PR7,UR3"]
    ],
    // Añade las demás áreas aquí igual como se hizo arriba
    // ...
  };

  const requisitos = {
    PR2: ["PR1"],
    PR3: ["PR2"],
    PR4: ["PR3"],
    PR5: ["PR4"],
    PR6: ["PR5"],
    PR7: ["PR6", "UR2"],
    PR8: ["PR7", "UR3"]
    // Añade los demás requisitos aquí
  };

  // Generador de tabla
  for (const [area, cursosPorSemestre] of Object.entries(cursosPorArea)) {
    const row = document.createElement("tr");
    const tdArea = document.createElement("td");
    tdArea.classList.add("area");
    tdArea.textContent = area;
    row.appendChild(tdArea);

    for (let i = 0; i < 10; i++) {
      const td = document.createElement("td");
      const curso = cursosPorSemestre[i];
      if (curso) {
        for (const dato of curso) {
          const [sigla, nombre, creditos, req] = dato.split("|");
          const div = document.createElement("div");
          div.classList.add("curso");
          div.dataset.id = sigla;
          div.dataset.creditos = creditos;
          if (req) div.dataset.requiere = req;
          div.innerHTML = `${sigla}<div class="tooltip">Créditos: ${creditos}${req ? " | Requiere: " + req : ""}</div>`;
          td.appendChild(div);
        }
      }
      row.appendChild(td);
    }
    tbody.appendChild(row);
  }

  // Lógica de interacción
  const cursos = document.querySelectorAll(".curso");

  cursos.forEach(curso => {
    curso.addEventListener("click", () => {
      const id = curso.dataset.id;
      const reqs = (curso.dataset.requiere || "").split(",").filter(Boolean);

      const requisitosCumplidos = reqs.every(req => {
        const cursoReq = document.querySelector(`.curso[data-id="${req}"]`);
        return cursoReq && cursoReq.classList.contains("llevado");
      });

      if (reqs.length === 0 || requisitosCumplidos) {
        curso.classList.toggle("llevado");
      } else {
        alert(`No puedes marcar "${id}" como llevado.\nPrimero debes aprobar: ${reqs.join(", ")}`);
      }
    });

    curso.addEventListener("mouseenter", () => {
      const reqs = (curso.dataset.requiere || "").split(",").filter(Boolean);
      reqs.forEach(req => {
        const reqCurso = document.querySelector(`.curso[data-id="${req}"]`);
        if (reqCurso) reqCurso.classList.add("requisito");
      });
    });

    curso.addEventListener("mouseleave", () => {
      document.querySelectorAll(".curso").forEach(c => {
        c.classList.remove("requisito");
      });
    });
  });
});
