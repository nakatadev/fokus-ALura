const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const simbolStartPauseBt = document.querySelector('#start-pause img');
const botoes = document.querySelectorAll('.app__card-button');


const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');

const pauseMusic = new Audio('./sons/pause.mp3');
const playMusic = new Audio('./sons/play.wav');

let tempoDecorridoEmSegundos = 15;
let intervaloId = null;

musica.loop = true;

const tempoTela = document.querySelector('#timer');


musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }
    else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
    tempoDecorridoEmSegundos = 1500;
    mostrarTempo()
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
    tempoDecorridoEmSegundos = 300;
    mostrarTempo()
});

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active')
    tempoDecorridoEmSegundos = 900;
    mostrarTempo()
})

function alterarContexto(contexto){
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade, <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;       
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento)
        }
        alert('Tempo finalizado!')
        zerar()
        return
    }
    iniciarOuPausarBt.textContent = `Pausar`;
    simbolStartPauseBt.setAttribute('src', `./imagens/pause.png`);
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    playMusic.play()
    if (intervaloId){
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    pauseMusic.play()
    clearInterval(intervaloId)
    intervaloId = null
    iniciarOuPausarBt.textContent = `Começar`;
    simbolStartPauseBt.setAttribute ('src', `./imagens/play_arrow.png`);
}

function mostrarTempo (){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`;
}
mostrarTempo()