// Mapa de créditos por curso
const creditMap = {
  ORU: 2, CV1: 3, MT1: 4, GD1: 5, DA1: 5, IAR: 3,
  CV2: 3, MT2: 4, FG: 4, DA2: 5, GD2: 3, HA1: 3, CL1: 1,
  AF: 3, HI1: 2, FA: 4, PR1: 8, HA2: 3, CT1: 2, CL2: 1,
  HI2: 2, RCT: 3, PR2: 8, HA3: 3, EST1: 2, CL3: 1, ELEC1: 4,
  HDA: 4, HUR: 2, T1: 2, PR3: 8, HA4: 3, CT2: 2, CL4: 1, COP: 4,
  ELEC2: 4, UR1: 4, T2: 2, PR4: 8, ETC: 2, EST2: 2, CL5: 1,
  ELEC3: 4, GPR: 4, UR2: 4, DSO: 2, PR5: 8, EGA: 3, CT3: 2,
  IT1: 2, CL6: 1, UR3: 4, PR6: 8, FA1: 4, EST3: 2, IT2: 2,
  CL7: 1, ELEC4: 4, PAI: 4, PR7: 8, FA2: 4, AP1: 4, IT3: 2,
  CL8: 1, DE: 1, PR8: 8, IPF: 2, AP2: 4, STB: 4, LAR: 3
};

document.addEventListener("DOMContentLoaded", () => {
  const colores = ['color1', 'color2', 'color3', 'color4', 'color5'];
  const tabla = document.getElementById('tabla-cursos');
  const globalTooltip = document.getElementById("tooltip-global");

  const cursos = {
    "URBANISMO Y PAISAJE": {
      I: [], II: [], III: [], IV: [], V: ["HUR|Historia del Urbanismo"],
      VI: ["UR1|Urbanismo I"], VII: ["UR2|Urbanismo II"], VIII: ["UR3|Urbanismo III"],
      IX: ["PAI|Paisaje"], X: []
    },
    "HUMANIDADES": {
      I: ["CV1|Comunicación verbal I", "ORU|Orientación Universitaria"],
      II: ["CV2|Comunicación verbal II", "HA1|Historia de la arquitectura I"],
      III: ["AF|Antropología Filosófica", "HI1|Historia del Arte I"],
      IV: ["HI2|Historia del Arte II", "RCT|Realidad, Conocimiento y Trascendencia"],
      V: ["T1|Introducción a la Teología"],
      VI: ["T2|Teología y Vida Cristiana"],
      VII: ["DSO|Doctrina Social de la Iglesia"],
      VIII: [], IX: [], X: ["DE|Deontología"]
    },
    "CIENCIA Y TECNOLOGÍA": {
      I: ["MT1|Matemáticas I", "GD1|Geometría Descriptiva", "DA1|Dibujo arquitectónico I", "IAR|Introducción a la Arquitectura"],
      II: ["MT2|Matemáticas II", "FG|Física General", "GD2|Geometría Descriptiva II", "DA2|Dibujo Arquitectónico II"],
      III: ["FA|Física Aplicada", "CT1|Construcción I", "PR1|Proyectos I", "HA2|Historia de la Arquitectura II"],
      IV: ["EST1|Estructuras I", "HA4|Historia de la Arquitectura III", "PR2|Proyectos II", "HDA|Herramientas Digitales Aplicadas"],
      V: ["CT2|Construcción II", "HA4|Historia de la arquitectura IV", "PR3|Proyectos III"],
      VI: ["ETC|Estética", "EST2|Estructuras II", "PR4|Proyectos IV", "GPR|Gestión de Proyectos"],
      VII: ["CT3|Construcción III", "IT1|Instalaciones I", "PR5|Proyectos V", "EGA|Expresión Gráfica Avanzada"],
      VIII: ["FA1|Fabricación I", "EST3|Estructuras III", "IT2|Instalaciones II", "PR6|Proyectos VI"],
      IX: ["FA2|Fabricación II", "IT3|Instalaciones III", "AP1|Diseño Aplicado I", "PR7|Proyectos VII"],
      X: ["PR8|Curso de Trabajo de Investigación: Proyectos 8", "AP2|Diseño Aplicado II", "IPF|Introducción al Proyecto de Fin de Carrera", "STB|Sostenibilidad", "LAR|Legislación en Arquitectura"]
    },
    "ELECTIVOS": {
      I: [], II: ["CL1|Crédito de Libre Configuración I"],
      III: ["CL2|Crédito de Libre Configuración II"],
      IV: ["CL3|Crédito de Libre Configuración III", "ELEC1|Curso Electivo I"],
      V: ["CL4|Crédito de Libre Configuración IV", "ELEC2|Curso Electivo II", "COP|Conservación del Patrimonio"],
      VI: ["CL5|Crédito de Libre Configuración V", "ELEC3|Curso Electivo III"],
      VII: ["CL6|Crédito de Libre Configuración VI"],
      VIII: ["CL7|Crédito de Libre Configuración VII", "ELEC4|Curso Electivo IV"],
      IX: ["CL8|Crédito de Libre Configuración VIII"],
      X: []
    }
  };

  const requisitos = {
    CV2: ["CV1"], CT1: ["FG", "IAR"], EST1: ["FA", "MT2"], RCT: ["AF"],
    HA4: ["HA3"], CT2: ["CT1", "MT2"], COP: ["PR2"], UR1: ["HUR"], T2: ["T1"],
    PR2: [], PR3: ["PR2"], PR4: ["PR3"], PR5: ["PR4"], PR6: ["PR5"],
    PR7: ["PR6", "UR2"], PR8: ["PR7", "UR3"], IPF: ["PR7"], AP1: ["CT3", "EST3", "IT2", "PR6"],
    AP2: ["AP1", "PR7"], STB: ["CT3", "PR6"], LAR: ["PR6"], UR2: ["UR1"],
    UR3: ["UR2"], DSO: ["T2"], EGA: ["PR3"], CT3: ["CT2"], IT1: ["CT1", "EST1", "PR4"],
    IT2: ["IT1"], IT3: ["IT2"], FA1: ["CT3", "EST2", "PR5"], FA2: ["FA1", "PR6"]
  };

  for (const area in cursos) {
    const row = document.createElement('tr');
    const tdArea = document.createElement('td');
    tdArea.className = 'area';
    tdArea.textContent = area;
    row.appendChild(tdArea);

    for (let i = 1; i <= 10; i++) {
      const ciclo = ["I","II","III","IV","V","VI","VII","VIII","IX","X"][i - 1];
      const td = document.createElement('td');
      const listaCursos = cursos[area][ciclo] || [];

      listaCursos.forEach(item => {
        const [sigla, nombre] = item.split('|');
        const div = document.createElement('div');
        const color = colores[Math.floor(Math.random() * colores.length)];
        div.className = `curso ${color}`;
        div.dataset.id = sigla;
        div.dataset.nombre = nombre;
        const reqs = requisitos[sigla];
        if (reqs) div.dataset.requiere = reqs.join(',');

        div.innerText = `${sigla} - ${nombre}`;
        td.appendChild(div);
      });
      row.appendChild(td);
    }
    tabla.appendChild(row);
  }

  function requisitosCumplidos(ids) {
    return ids.every(id => document.querySelector(`[data-id="${id}"]`)?.classList.contains('llevado'));
  }

  document.querySelectorAll('.curso').forEach(curso => {
    const reqs = curso.dataset.requiere ? curso.dataset.requiere.split(',') : [];

    curso.addEventListener('click', () => {
      if (reqs.length === 0 || requisitosCumplidos(reqs)) {
        curso.classList.toggle('llevado');
      } else {
        alert("Debes aprobar primero los cursos requeridos: " + reqs.join(', '));
      }
    });

    curso.addEventListener('mouseenter', () => {
      reqs.forEach(id => {
        const el = document.querySelector(`[data-id="${id}"]`);
        if (el) el.classList.add('requisito');
      });

      // Mostrar tooltip flotante
      const nombre = curso.dataset.nombre;
      const sigla = curso.dataset.id;
      const creditos = creditMap[sigla] ?? '?';
      const requisitosTexto = reqs.length ? ` | Requiere: ${reqs.join(', ')}` : '';
      globalTooltip.textContent = `Curso: ${nombre} | Créditos: ${creditos}${requisitosTexto}`;
      globalTooltip.style.display = 'block';

      const rect = curso.getBoundingClientRect();
      globalTooltip.style.top = `${window.scrollY + rect.top - 35}px`;
      globalTooltip.style.left = `${window.scrollX + rect.left + rect.width / 2}px`;
      globalTooltip.style.transform = 'translateX(-50%)';
    });

    curso.addEventListener('mouseleave', () => {
      document.querySelectorAll('.curso').forEach(c => c.classList.remove('requisito'));
      globalTooltip.style.display = 'none';
    });
  });
});
function guardarCursosLlevados() {
  const llevados = [];
  document.querySelectorAll('.curso.llevado').forEach(curso => {
    llevados.push(curso.dataset.id);
  });
  localStorage.setItem('cursos_llevados', JSON.stringify(llevados));
}

function cargarCursosLlevados() {
  const guardados = JSON.parse(localStorage.getItem('cursos_llevados') || "[]");
  guardados.forEach(id => {
    const curso = document.querySelector(`.curso[data-id="${id}"]`);
    if (curso) curso.classList.add('llevado');
  });
}

// Llamar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarCursosLlevados();

  document.querySelectorAll('.curso').forEach(curso => {
    curso.addEventListener('click', () => {
      // (Ya haces validación de requisitos aquí...)
      setTimeout(guardarCursosLlevados, 100); // Guardar después de marcar/desmarcar
    });
  });
});
