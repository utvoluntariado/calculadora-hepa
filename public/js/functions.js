function calculoCADR() {        
  const largo = document.querySelector('#largo');
  const ancho = document.querySelector('#ancho');
  const m2 = largo.value * ancho.value;
  const altura = document.querySelector('#altura');
  const ventilacion = document.querySelector('#ventilacion');
  const normativa = document.querySelector('#normativa');
  const cadr = document.querySelector('#cadr');
  const cfm = document.querySelector('#cfm');      
  const cambiosDesea = document.querySelector('#cambios');

  let pie = 0.3048;
 
  let round = function (num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
  }

  let cambiosNecesitaFiltro = cambiosDesea.value - ventilacion.value;        
  
  let cadrValue = cambiosNecesitaFiltro * altura.value * ancho.value * largo.value
  cadr.innerHTML = round(cadrValue)
  let cfmValue = cadrValue/0.028316846592/60
  cfm.innerHTML = round(cfmValue)

  const estudiantes = document.querySelector('#estudiantes');
  const profesores = document.querySelector('#profesores');
  const calibracionCO2 = document.querySelector('#calibracionCO2');
  const maxCO2SinFiltro = document.querySelector('#maxCO2SinFiltro');
  const maxCO2 = document.querySelector('#maxCO2');

  const tasaCO2Estudiante = 0.24636
  const tasaCO2Profesor = 0.36812
  const flujoAireExterior = ((altura.value * largo.value * ancho.value) * ventilacion.value)/60
  const flujoAireFiltrado = 0

  let totalLpm = (estudiantes.value * tasaCO2Estudiante) + (profesores.value * tasaCO2Profesor)
  let H14 = ((largo.value * ancho.value * altura.value)*ventilacion.value)/60 //Flujo aire exterior
  let H15 = (largo.value * ancho.value * altura.value)*cambiosNecesitaFiltro/60 //Flujo aire interior
  let H26 = H14 * 1000       
  let H28 = 1
  let H29 = 0.000001
  let K14 = +H14+H15
  let K15 = K14*1000

  let maxCO2SinFiltroValue = (totalLpm + (K15 * calibracionCO2.value * H28 * H29)) / (K15 * H28 * H29)
  let maxCO2Value = (totalLpm + (H26 * calibracionCO2.value * H28 * H29)) / (H26 * H28 * H29)

  maxCO2SinFiltro.innerHTML = round(maxCO2SinFiltroValue)
  maxCO2.innerHTML = round(maxCO2Value)

  const infVentilacion = document.querySelector('#infVentilacion');
  let v = parseFloat(ventilacion.value)
  infVentilacion.innerHTML = (v === 4) ? 'Seleccione esta opci&oacute;n solo si su escuela ha realizado mejor&iacute;as mas all&aacute; de los requisitos m&iacute;nimos.'
    : (v === 3) ? 'Esta es una aproximaci&oacute;n de la m&iacute;nima tasa de cambio de aire que deber&iacute;a estar en las escuelas por dise&ntilde;o, pero la mayor&iacute;a no logra alcanzar este valor.'
    : (v === 1.5) ? 'Esta es una aproximaci&oacute;n de la tasa promedio de cambio de aire en muchas escuelas, basada en estudios de investigaci&oacute;n.'
    : (v === 1) ? 'Seleccione esta opci&oacute;n si su escuela tiene baja ventilaci&oacute;n o si no est&aacute; seguro/a (como referencia, una casa en EEUU tiene 0.5 CAH tipicamente).'
    : 'Selecciones esta opci&oacute;n si su escuela tiene mala ventilaci&oacute;n.'
}

document.addEventListener('DOMContentLoaded', calculoCADR())  
