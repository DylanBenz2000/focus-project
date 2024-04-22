const buttons = document.querySelectorAll('.app__card-button');
const colorHtml = document.querySelector('html');
const bannerContainer = document.querySelector('.app__section-banner-container')
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const inputMusica = document.querySelector('#alternar-musica');
const buttonIniciarPausar = document.querySelector('#start-pause');
const tempo = document.querySelector('#timer');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const sonidoIniciar = new Audio('./sonidos/play.wav');
const sonidoPausar = new Audio('./sonidos/pause.mp3');
const sonidoTemporizadorTerminado = new Audio('./sonidos/beep.mp3');



let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

musica.loop = true;
musica.volume = 0.5;
sonidoTemporizadorTerminado.volume = 0.3;

inputMusica.addEventListener('change', function(){
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})


function cambiarBanner(contexto) {

    // mostrarTemporizador()

    colorHtml.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`)

    // Cambiar el titulo
    switch (contexto){
        case "enfoque":
            titulo.innerHTML = `
            <h1 class="app__title">
                Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            </h1>`
            break;
        case "descanso-corto":
            titulo.innerHTML = `
            <h1 class="app__title">
                ¿Qué tal tomar un respiro?,<br>
                <strong class="app__title-strong">¡Haz una pausa corta!.</strong>
            </h1>`
            break;
        case "descanso-largo":
            titulo.innerHTML = `
            <h1 class="app__title">
                Hora de volver a la superficie,<br>
                <strong class="app__title-strong">Haz una pausa larga.</strong>
            </h1>`
            break;
    }


}

const cuentaRegresiva = ()=>{

    if(tiempoTranscurridoEnSegundos <= 0){
        sonidoTemporizadorTerminado.play();
        alert('Tiempo finalizado')
        reiniciar();
        return;
    }
    tiempoTranscurridoEnSegundos -= 1
    mostrarTemporizador()
}

buttonIniciarPausar.addEventListener('click', iniciarOPausar);

function iniciarOPausar(){

    if(idIntervalo){
        sonidoPausar.play();
        reiniciar()
        return;
    }
    sonidoIniciar.play();
    idIntervalo = setInterval(cuentaRegresiva,1000)
    buttonIniciarPausar.textContent = "Pausar";

}

function reiniciar(){
    clearInterval(idIntervalo)
    buttonIniciarPausar.textContent = "Comenzar"
    idIntervalo = null;
}


buttons.forEach(button =>{
    button.addEventListener('click', function(e){

        // Quita el focus del botón
        buttons.forEach(button =>{
            button.classList.remove('active')
        })
        // Le agrega el focus, al botón que se haga click
        button.classList.add('active');


        //Descanso Corto
        if(button.classList.contains('app__card-button--corto')){
            cambiarBanner('descanso-corto');
            tiempoTranscurridoEnSegundos = 300; // 5 minutos
            // Enfoque
        }else if(button.classList.contains('app__card-button--enfoque')){
            cambiarBanner('enfoque')
            tiempoTranscurridoEnSegundos = 1500; // 25 minutos
            // Descanso largo
        }else if(button.classList.contains('app__card-button--largo')){
            cambiarBanner('descanso-largo')
            tiempoTranscurridoEnSegundos = 900; // 15 minutos

        }
        mostrarTemporizador();
    })
})

function mostrarTemporizador(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute: '2-digit', second:'2-digit'});
    tempo.innerHTML = `${tiempoFormateado}`
}

mostrarTemporizador();