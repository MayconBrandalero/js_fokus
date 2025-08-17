const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause');
const musicaInput = document.querySelector('#alternar-musica');
const iniciarPausatBt = document.querySelector('#start-pause span')
const iconePlayPause = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');
musica.loop = true;

const playIcone = "/imagens/play_arrow.png";
const pauseIcone = "/imagens/pause.png";

let tempoDecorrido = 1500;
let intervaloId = null;

musicaInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    };
});

focoBt.addEventListener('click', () => {
    tempoDecorrido = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', ()=> {
    tempoDecorrido = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', ()=> {
    tempoDecorrido = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch(contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;

        default:
            break;
    }
}


function contagemRegressiva () {
    if(tempoDecorrido <= 0){
        audioTempoFinalizado.play();
        alert("Tempo finalizado!")
        zerarTemporizador();
        return;
    };
    tempoDecorrido -= 1;
    console.log(`Temporizador: ${tempoDecorrido}`);
    mostrarTempo();
};

function zerarTemporizador(){
    clearInterval(intervaloId);
    iniciarPausatBt.textContent = "Começar";
    iconePlayPause.setAttribute('src', playIcone);
    intervaloId = null;
};

function iniciarPausarTemporizador(){
    if(intervaloId){
        audioPausa.play();
        zerarTemporizador();
        return;
    };
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarPausatBt.textContent = "Pausar";
    iconePlayPause.setAttribute('src', pauseIcone);
};

startPauseBtn.addEventListener('click', iniciarPausarTemporizador);

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', {
        minute: '2-digit',
        second: '2-digit',
    });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
};

mostrarTempo();
