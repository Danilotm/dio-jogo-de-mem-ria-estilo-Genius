// Variável de ordem aleatória do jogo
let order = [];
// Variável para armazenar a ordem dos cliques
let clickedOrder = [];
// Variável para saber quantidade de erros
let score = 0;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

// função para sortear entre 0 e 3

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4); // sorteia de 0 a 3
    // atribui o indice que a gente quer do array com a cor que sair do sorteio
    order[order.length] = colorOrder;
    clickedOrder = [];

    // Acender a cor que sorteou
    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1); 
    }
}

// Função que irá acender a luz
lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        // Adicionar uma classe no HTML
        element.classList.add('selected')
    }, number - 250);
    setTimeout(() => {
        // Retirar uma classe no HTML
        element.classList.remove('selected');
    }, number + 50);
}

// Comparar se o que piscou aleatorio foi o que selecionamos no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nivel!`);
        nextLevel();
    }
}

// Função para o clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);

}

// Função que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// Função para próximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

// Função para game over
let gameOver = () => {
    alert(`Pontuação: ${score}\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

// Função de início do jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;

    nextLevel();

}

// Eventos de clique para as cores
green.onclick = () => click(0); //precisa do callback
red.onclick = () => click(1); 
yellow.onclick = () => click(2); 
blue.onclick = () => click(3); 

// Início do jogo
playGame();