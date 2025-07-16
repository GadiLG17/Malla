// Requisitos: clave = curso actual, valor = array de prerequisitos
const requisitos = {
  "CV2": ["CV1"],
  "CT1": ["FG", "IAR"],
  "RCT": ["AF"],
  "EST1": ["FA", "MT2"],
  "PR3": ["PR2"],
  "HA4": ["HA3"],
  "CT2": ["CT1", "MT2"],
  "COP": ["PR2"],
  "UR1": ["HUR"],
  "T2": ["T1"],
  "PR4": ["PR3"],
  "ETC": ["HA4"],
  "EST2": ["CT1", "EST1"],
  "UR2": ["UR1"],
  "DSO": ["T2"],
  "PR5": ["PR4"],
  "EGA": ["PR3"],
  "CT3": ["CT2"],
  "IT1": ["CT1", "EST1", "PR4"],
  "UR3": ["UR2"],
  "PR6": ["PR5"],
  "FA1": ["CT3", "EST2", "PR5"],
  "EST3": ["EST2"],
  "IT2": ["IT1"],
  "PAI": ["UR2"],
  "PR7": ["PR6", "UR2"],
  "FA2": ["FA1", "PR6"],
  "AP1": ["CT3", "EST3", "IT2", "PR6"],
  "IT3": ["IT2"],
  "DE": ["PR6"],
  "PR8": ["PR7", "UR3"],
  "IPF": ["PR7"],
  "AP2": ["AP1", "PR7"],
  "STB": ["CT3", "PR6"],
  "LAR": ["PR6"]
};

// Créditos por curso (simplificado para el ejemplo)
const creditos = {
  "ORU": 2, "CV1": 3, "MT1": 4, "GD1": 5, "DA1": 5, "IAR": 3,
  "CV2": 3, "MT2": 4, "FG": 4, "DA2": 5, "GD2": 3, "HA1": 3, "CL1": 1,
  "AF": 3, "HI1": 2, "FA": 4, "PR1": 8, "HA2": 3, "CT1": 2, "CL2": 1,
  "HI2": 2, "RCT": 3, "PR2": 8, "HA3": 3, "EST1": 2, "CL3": 1, "ELEC1": 4, "HDA": 4,
  "HUR": 2, "T1": 2, "PR3": 8, "HA4": 3, "CT2": 2, "CL4": 1, "COP": 4, "ELEC2": 4,
  "UR1": 4, "T2": 2, "PR4": 8, "ETC": 2, "EST2": 2, "CL5": 1, "ELEC3": 4, "GPR": 4,
  "UR2": 4, "DSO": 2, "PR5": 8, "EGA": 3, "CT3": 2, "IT1": 2, "CL6": 1,
  "UR3": 4, "PR6": 8, "FA1": 4, "EST3": 2, "IT2": 2, "CL7": 1, "ELEC4": 4,
  "PAI": 4, "PR7": 8, "FA2": 4, "AP1": 4, "IT3": 2, "CL8": 1,
  "DE": 1, "PR8": 8, "IPF": 2, "AP2": 4, "STB": 4, "LAR": 3
};

document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  cursos.forEach(curso => {
    const id = curso.getAttribute("data-id");
    const credit = creditos[id] || 0;
    const reqs = requisitos[id] || [];

    // Tooltip dinámico
    let tooltip = curso.querySelector(".tooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      curso.appendChild(tooltip);
    }
    tooltip.textContent = `Créditos: ${credit}` + (reqs.length ? ` | Requiere: ${reqs.join(", ")}` : "");

    // Click para marcar como llevado
    curso.addEventListener("click", () => {
      curso.classList.toggle("llevado");
    });

    // Hover para resaltar requisitos
    curso.addEventListener("mouseenter", () => {
      reqs.forEach(req => {
        const reqCurso = document.querySelector(`.curso[data-id="${req}"]`);
        if (reqCurso) {
          reqCurso.classList.add("requisito");
        }
      });
    });

    curso.addEventListener("mouseleave", () => {
      document.querySelectorAll(".curso").forEach(c => c.classList.remove("requisito"));
    });
  });
});
