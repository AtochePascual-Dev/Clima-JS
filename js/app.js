// * VARIABLES
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');



// * EVENTOS
// * Cuando el documento esta listo
document.addEventListener('DOMContentLoaded', () => {
  formulario.addEventListener('submit', buscarClima);
});



// * FUNCIONES
// * Busca un clima
const buscarClima = (event) => {
  event.preventDefault();

  // Obtenemos los valores de los imputs
  const ciudad = document.querySelector('#ciudad').value.trim();
  const pais = document.querySelector('#pais').value.trim();

  // validamos si la infomacion contiene vacio
  if ([ciudad, pais].includes('')) {
    mostrarAlerta('Todos los campos son obligatorios');
    return;
  }

  consultarApi(ciudad, pais);

};



// * Muestra un mensaje en pantalla
const mostrarAlerta = (mensaje) => {
  const existeAlerta = document.querySelector('.alerta');

  if (!existeAlerta) {
    const alerta = document.createElement('div');
    alerta.textContent = mensaje;
    alerta.className = "bg-red-100 border-red-400 text-red-700 px-4 py-3 rounder max-w-md mx-auto mt-6 text-center font-bold alerta";

    container.appendChild(alerta);

    // eliminamos la alerta
    setTimeout(() => {
      alerta.remove();
    }, 2000);
  }
};



// * Realiza una consulta a la API
const consultarApi = (ciudad, pais) => {
  const appId = "bdb137a7be80a9e65889b73b0a258937";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  fetch(URL)
    .then(respuesta => respuesta.json())
    .then(datos => {
      if (datos.cod === '404') {
        mostrarAlerta('Ciudad no encontrada');
        return;
      }

      mostrarClima(datos);
    })
};



// * Muestr el clima en pantalla
const mostrarClima = (datos) => {
  const { main: { temp, temp_max, temp_min } } = datos;
  const temperatura = convertirCentigrados(temp);
  const temperaturaMax = convertirCentigrados(temp);
  const temperaturaMin = convertirCentigrados(temp);
  const tenperaturaHtml = document.createElement('p');
  const resultadoDiv = document.createElement('div');

  tenperaturaHtml.innerHTML = `${temperatura} &#8451;`;
  tenperaturaHtml.classList.add('font-bold', 'text-6xl');

  resultadoDiv.classList.add('text-center', 'text-white');
  resultadoDiv.appendChild(tenperaturaHtml);

  resultado.appendChild(resultadoDiv);
};



// * Convierte a grados centigrados
const convertirCentigrados = (temperatura) => (temperatura - 273.15).toFixed(2);



// * Limpia el html previo
const limpiarHtml = () => {
  while (resultado.firstChild) {
    resultado.firstChild.remove();
  }
};