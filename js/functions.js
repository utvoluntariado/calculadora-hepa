let _idioma = ''

function calculoCADR() {
  let lang = new URLSearchParams(window.location.search)
  let langIsNull = lang.get('lang') !== null
  _idioma = langIsNull ? lang.get('lang') : navigator.language.substr(0,2)

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
  
  this.infVentilacion()
}

function infVentilacion () {
  const infVentilacion = document.querySelector('#infVentilacion');
  let v = parseFloat(ventilacion.value)
  let idioma = document.getElementById("idioma").value;
  let i18n = (idioma === 'en') ? en : es
  infVentilacion.innerHTML = (v === 4) ? `${i18n.i18n_ventilacion__inf4}`
    : (v === 3) ?  `${i18n.i18n_ventilacion__inf3}`
    : (v === 1.5) ?  `${i18n.i18n_ventilacion__inf2}`
    : (v === 1) ?  `${i18n.i18n_ventilacion__inf1}`
    : `${i18n.i18n_ventilacion__inf0}`
}

function cambiarIdioma () {
  let callerNull = cambiarIdioma.caller === null
  let idioma = (callerNull) ? _idioma : document.getElementById("idioma").value
  let i18n = (idioma === 'en') ? en : (idioma === 'pt') ? pt : es
  document.getElementById("idioma").value = (idioma === 'en') ? 'en' : (idioma === 'pt') ? 'pt' : 'es'
  let textos = [
    'i18n_titulo', 'i18n_enlace__calculadora', 'i18n_enlace__informacion', 'i18n_introduccion',
    'i18n_largo', 'i18n_ancho', 'i18n_altura', 'i18n_cambio__aire', 'i18n_cambio__aireInf',
    'i18n_ventilacion__normativa', 'i18n_ventilacion', 'i18n_normativa', 'i18n_normativa__0',
    'i18n_ventilacion__0', 'i18n_ventilacion__1', 'i18n_ventilacion__2', 'i18n_ventilacion__3', 'i18n_ventilacion__4',
    'i18n_CADR__m3h', 'i18n_CADR__m3hInf_0', 'i18n_CADR__m3hInf_1',
    'i18n_CADR__cfm', 'i18n_CADR__cfmInf_0', 'i18n_CADR__cfmInf_1',
    'i18n_subtitulo', 'i18n_subtituloInf', 'i18n_numero__estudiantes', 'i18n_numero__profesores', 'i18n_calibracion__co2',
    'i18n_limite__co2_sin__HEPA', 'i18n_limite__co2_con__HEPA', 'i18n_limite__c02Inf_0', 'i18n_limite__c02Inf_1',
    'i18n_sobre__calculadora', 'i18n_sobre__calculadora_parrafo_1', 'i18n_sobre__calculadora_parrafo_2', 'i18n_sobre__calculadora_parrafo_3', 'i18n_sobre__calculadora_parrafo_4',
    'i18n_antes__empezar', 'i18n_antes__empezar_parrafo_1', 'i18n_antes__empezar_parrafo_2', 'i18n_antes__empezar_parrafo_3',
    'i18n_tres__cosas', 'i18n_tres__cosas_parrafo_1', 'i18n_tres__cosas_parrafo_2', 'i18n_tres__cosas_parrafo_3',
    'i18n_informacion__adicional', 'i18n_garantia__filtros_parrafo_1', 'i18n_garantia__filtros_parrafo_2',
    'i18n_garantia__filtros',
    'i18n_parte__1', 'i18n_parte__1_parrafo_1', 'i18n_parte__1_parrafo_2', 'i18n_parte__1_parrafo_3', 'i18n_parte__1_parrafo_4', 'i18n_parte__1_parrafo_5',
    'i18n_parte__2', 'i18n_parte__2_parrafo_1', 'i18n_parte__2_parrafo_2',
    'i18n_parte__3', 'i18n_parte__3_parrafo_1', 'i18n_parte__3_parrafo_2',
    'i18n_parte__4', 'i18n_parte__4_parrafo_1', 'i18n_parte__4_parrafo_2', 'i18n_parte__4_parrafo_3',
    'i18n_parte__5', 'i18n_parte__5_parrafo_1'
  ]
  textos.forEach( (e, i) => {
    let texto = textos[i]
    document.getElementById(e).innerHTML = `${i18n[texto]}`;
  })
  this.infVentilacion()
}

document.addEventListener('DOMContentLoaded', calculoCADR(), cambiarIdioma())  
