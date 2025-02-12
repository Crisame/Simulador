// Datos de las preguntas
const preguntas = [
    {
      pregunta: "¿Cuál es la misión de tu empresa?",
      opciones: [
        "Ofrecer productos de alta calidad a precios accesibles.",
        "Ser líder en innovación tecnológica.",
        "Brindar soluciones personalizadas a nuestros clientes.",
      ],
      respuestaCorrecta: 2,
    },
    {
      pregunta: "¿Cuál es la visión de tu empresa?",
      opciones: [
        "Expandirnos a nivel internacional en 5 años.",
        "Ser reconocidos como la mejor opción en nuestro nicho.",
        "Crecer de manera sostenible y responsable.",
      ],
      respuestaCorrecta: 1,
    },
    {
      pregunta: "¿Qué estrategia competitiva utilizarás?",
      opciones: [
        "Diferenciación (ofrecer algo único).",
        "Liderazgo en costos (precios bajos).",
        "Enfoque (especialización en un segmento).",
      ],
      respuestaCorrecta: 0,
    },
    // Agrega más preguntas aquí...
  ];
  
  let preguntaActual = 0;
  let respuestasUsuario = [];
  
  // Elementos del DOM
  const configInicial = document.getElementById("configuracion-inicial");
  const preguntasSection = document.getElementById("preguntas");
  const preguntaActualDiv = document.getElementById("pregunta-actual");
  const siguientePregBtn = document.getElementById("siguiente-preg");
  const resultadoSection = document.getElementById("resultado");
  const porcentajeExito = document.getElementById("porcentaje-exito");
  const retroalimentacion = document.getElementById("retroalimentacion");
  
  // Mostrar preguntas
  function mostrarPregunta() {
    if (preguntaActual < preguntas.length) {
      const pregunta = preguntas[preguntaActual];
      preguntaActualDiv.innerHTML = `
        <p>${pregunta.pregunta}</p>
        ${pregunta.opciones
          .map(
            (opcion, index) => `
          <label>
            <input type="radio" name="respuesta" value="${index}">
            ${opcion}
          </label><br>
        `
          )
          .join("")}
      `;
    } else {
      calcularResultado();
    }
  }
  
  // Calcular resultado
  function calcularResultado() {
    const respuestasCorrectas = respuestasUsuario.filter(
      (respuesta, index) => respuesta === preguntas[index].respuestaCorrecta
    ).length;
    const porcentaje = ((respuestasCorrectas / preguntas.length) * 100).toFixed(2);
    porcentajeExito.textContent = `Tu porcentaje de éxito es: ${porcentaje}%`;
    if (porcentaje >= 80) {
      retroalimentacion.textContent = "¡Felicidades! Tu empresa tiene un alto potencial de éxito.";
    } else if (porcentaje >= 50) {
      retroalimentacion.textContent = "Buen trabajo, pero hay áreas que puedes mejorar.";
    } else {
      retroalimentacion.textContent = "Necesitas revisar tus estrategias para alcanzar el éxito.";
    }
    preguntasSection.style.display = "none";
    resultadoSection.style.display = "block";
  }
  
  // Eventos
  document.getElementById("siguiente-config").addEventListener("click", () => {
    configInicial.style.display = "none";
    preguntasSection.style.display = "block";
    mostrarPregunta();
  });
  
  siguientePregBtn.addEventListener("click", () => {
    const respuestaSeleccionada = document.querySelector('input[name="respuesta"]:checked');
    if (respuestaSeleccionada) {
      respuestasUsuario.push(parseInt(respuestaSeleccionada.value));
      preguntaActual++;
      mostrarPregunta();
    } else {
      alert("Por favor, selecciona una respuesta.");
    }
  });