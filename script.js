const html = document.querySelector('html');
const buttons = document.querySelectorAll('Button');
const focoBt = buttons[0];
const curtoBt = buttons[1];
const longoBt = buttons[2];
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')
const musicaFocoInput = document.querySelector("#alternar-musica")
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true
let tempoDecorridoEmSegundos = 1500
const startPauseBt = buttons[3]
intervaloId = null
const audioPlay = new Audio('/sons/play.wav'); 
const audioPausa = new Audio('/sons/pause.mp3'); 
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
 })

 longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
 })

 function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove("active")
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    
    switch (contexto) {
        case 'foco':
            titulo.innerHTML =  `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
         case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
             break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à  superficie,<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
        default:
            break;
    }
 }

 const contagemRegressiva = () => {
    // iniciarOuPausar()
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo Finalizado')
        audioTempoFinalizado.pause()
        zerar()
        return
    } else {
     tempoDecorridoEmSegundos -= 1 
     mostrarTempo()
 }}

 startPauseBt.addEventListener('click', iniciarOuPausar)

 function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()
        iniciarOuPausarBt.textContent = 'Começar'

        zerar()
        return
    } 
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
 }

 function zerar() {
   clearInterval(intervaloId)
   intervaloId = null
 }

 function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
 }

 mostrarTempo()