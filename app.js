const buttons = document.querySelectorAll('.app__card-button');
const colorHtml = document.querySelector('html');
const bannerContainer = document.querySelector('.app__section-banner-container')
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

const timer = document.querySelector('#timer');


function cambiarBanner(contexto) {
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
            // Enfoque
        }else if(button.classList.contains('app__card-button--enfoque')){
            cambiarBanner('enfoque')
            // Descanso largo
        }else if(button.classList.contains('app__card-button--largo')){
            cambiarBanner('descanso-largo')

        }
    })
})