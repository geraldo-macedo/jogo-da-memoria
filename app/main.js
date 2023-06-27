// Variáveis que obtém as referências dos elementos HTML
/*Este código em JavaScript define algumas variáveis ​​e obtém as referências para elementos HTML específicos usando seus IDs ou seletores de classe.
-- movimentos, valorTempo, botaoStart, botaoStop, gameContainer, resultado e controles referem-se a elementos no documento HTML.*/

const movimentos = document.getElementById("movimentos-contar");
const valorTempo = document.getElementById("time");
const botaoStart = document.getElementById("start");
const botaoStop = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const resultado = document.getElementById("resultado");
const controles = document.querySelector(".controles-container");

// Variáveis para controle do jogo
/*-- cards, intervalo, primeiroCard e segundoCard são variáveis ​​utilizadas para controlar o jogo.*/

let cards;
let intervalo;
let primeiroCard = false;
let segundoCard = false;



// Array de objetos contendo informações sobre itens

/*Define um array chamado items que contém objetos. Cada objeto representa um item e contém duas propriedades: name (nome) e image (imagem). Os valores das propriedades fornecem informações sobre cada item, como o nome e o caminho da imagem associada a ele.*/

const items = [
  { name: "poodle", image: "app/imagens/poodle.png"},
  { name: "rusk", image: "app/imagens/rusk.png"},
  { name: "borzoi", image: "app/imagens/borzoi.png"},
  { name: "buldog", image: "app/imagens/buldog.png"},
  { name: "york", image: "app/imagens/york.png"},
  { name: "chiuaua", image: "app/imagens/chiuaua.png"},
  { name: "splitz", image: "app/imagens/splitz.png"},
  { name: "rott", image: "app/imagens/rott.png"},
  { name: "labrador", image: "app/imagens/labrador.png"},
  { name: "pug", image: "app/imagens/pug.png"},
  { name: "salsicha", image: "app/imagens/salsicha.png"},
  { name: "pastor", image: "app/imagens/pastor.png"},
];


//Variaveis e condições associadas ao tempo
/*Declara as variáveis segundos e minutos, que serão usadas para rastrear o tempo. Também são declaradas as variáveis contarMovimentos e contagemVitorias.
--A função timeGenerator é responsável por atualizar o tempo. A cada chamada da função, os segundos são incrementados em 1. Se os segundos atingirem ou ultrapassarem 60, os minutos são incrementados em 1 e os segundos são redefinidos para 0.
--As variáveis valorSegundos e valorMinutos são usadas para formatar os valores dos segundos e minutos, adicionando um zero à esquerda se forem menores que 10. Em seguida, a função atualiza o conteúdo do elemento HTML referenciado por valorTempo para exibir o tempo formatado.*/

let segundos = 0,
  minutos = 0;
let contarMovimentos = 0,
  contagemVitorias = 0;
const timeGenerator = () => {
  segundos += 1;
   if (segundos >= 60) {
    minutos += 1;
    segundos = 0;
  }
  let valorSegundos = segundos < 10 ? `0${segundos}` : segundos;
  let valorMinutos = minutos < 10 ? `0${minutos}` : minutos;
  valorTempo.innerHTML = `<span>Tempo:</span>${valorMinutos}:${valorSegundos}`;
};

// Função para contar os movimentos
/*Define a função contadorMovimentos, que é responsável por incrementar a variável contarMovimentos em 1 a cada chamada e atualizar o conteúdo do elemento HTML referenciado por movimentos para exibir o número de movimentos atualizado.
--A função incrementa contarMovimentos em 1 e, em seguida, utiliza a propriedade innerHTML para definir o conteúdo do elemento movimentos com uma string formatada que inclui a tag <span> para a palavra "movimentos" e o valor atualizado de contarMovimentos.*/

const contadorMovimentos = () => {
  contarMovimentos += 1;
  movimentos.innerHTML = `<span>Movimentos:</span>${contarMovimentos}`;
};

//Gera valores aleatórios para as cartas do jogo da memória
/*Define a função gerarAleatorio, que é responsável por gerar valores aleatórios para as cartas de um jogo de memória.
A função recebe um parâmetro size que determina o tamanho do tabuleiro do jogo. O padrão é 4 (representando um tabuleiro de 4x4).
--A função começa criando uma cópia do array items usando o operador spread, armazenando-a na variável arrayTemporaria. Isso é feito para evitar modificar o array original.
--Em seguida, a variável valoresCard é inicializada como um array vazio, onde serão armazenados os valores das cartas geradas aleatoriamente.
--A variável size é ajustada para representar o número total de pares de cartas que serão gerados. Isso é calculado multiplicando o tamanho pelo tamanho e dividindo por 2, pois cada par de cartas tem duas ocorrências no jogo.
--Em seguida, um loop é executado size vezes para selecionar aleatoriamente valores de cartas do array temporário. A cada iteração, um índice aleatório é gerado usando Math.random() e Math.floor(), e o valor da carta correspondente ao índice aleatório é adicionado ao array valoresCard. Além disso, o valor da carta é removido do array temporário para evitar repetições.
--Por fim, a função retorna o array valoresCard com os valores aleatórios de cartas gerados.*/

// Função para gerar valores aleatórios de cartas
const gerarAleatorio = (size = 4) => {
// Cria uma cópia do array "items" usando o operador spread
  let arrayTemporaria = [...items];
  let valoresCard = [];
// Calcula o número de pares de cartas com base no tamanho
  size = (size * size) / 2;
// Loop para selecionar valores aleatórios de cartas
  for (let i = 0; i < size; i++) {
// Gera um índice aleatório dentro do tamanho atual do array temporário
    const indexAleatorio = Math.floor(Math.random() * arrayTemporaria.length);
// Adiciona o valor da carta correspondente ao índice aleatório ao array "valoresCard"
    valoresCard.push(arrayTemporaria[indexAleatorio]);
// Remove o valor da carta do array temporário para evitar repetições
    arrayTemporaria.splice(indexAleatorio, 1);
  }
// Retorna o array "valoresCard" com os valores aleatórios de cartas
  return valoresCard;
};

/*Define a função geraMatriz, que é responsável por gerar a matriz do jogo de memória.
--A função recebe dois parâmetros: valoresCard, que contém os valores das cartas, e size, que determina o tamanho da matriz (o padrão é 4).
--Primeiro, o conteúdo do contêiner do jogo (gameContainer) é limpo.
--Em seguida, os valores das cartas são duplicados para criar os pares, e os valores são embaralhados aleatoriamente usando o método sort() com uma função de comparação.
--Um loop é executado para criar os elementos HTML da matriz do jogo. Cada elemento é uma div com a classe "card-container" e contém uma div "card-before" com um ponto de interrogação como frente da carta e uma div "card-after" com a imagem da carta.
--A propriedade gridTemplateColumns é definida no contêiner do jogo para ajustar o número de colunas com base no tamanho.
--Em seguida, todos os elementos com a classe "card-container" são selecionados e um listener de evento de clique é adicionado a cada um.
--Ao clicar em uma carta, a classe "flipped" é adicionada para virá-la. Se for a primeira carta virada, ela é armazenada em primeiroCard e o valor da carta é armazenado em valorPrimeiroCard. Se for a segunda carta virada, a função contadorMovimentos() é chamada para contar o movimento, e a carta é armazenada em segundoCard e o valor da carta é armazenado em valorSegundoCard.
--Se os valores das duas cartas forem iguais, a classe "matched" é adicionada a ambas as cartas, indicando que foram encontradas. A variável contagemVitorias é incrementada, e se todas as cartas tiverem sido encontradas, uma mensagem de vitória é exibida e o jogo é interrompido.
--Se os valores das cartas forem diferentes, as cartas são viradas de volta após um atraso de 900 milissegundos.*/

// Função para gerar a matriz do jogo
const geraMatriz = (valoresCard, size = 4) => {
// Limpa o conteúdo do contêiner do jogo
  gameContainer.innerHTML = "";
  
// Duplica os valores das cartas para criar os pares
  valoresCard = [...valoresCard, ...valoresCard];
  
// Embaralha os valores das cartas de forma simples
  valoresCard.sort(() => Math.random() - 0.5);
  
// Loop para criar os elementos da matriz do jogo, função de comparação
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
      <div class="card-container" data-card-value="${valoresCard[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
          <img src="${valoresCard[i].image}" class="image"/>
        </div>
      </div>
    `;
  }
  
// Define a quantidade de colunas do contêiner do jogo com base no tamanho usando css
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

// Seleciona todos os elementos com a classe "card-container"
  cards = document.querySelectorAll(".card-container");
  
// Adiciona um listener de evento de clique a cada carta
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      
      if (!card.classList.contains("matched")) {
// Adiciona a classe "flipped" para virar a carta
        card.classList.add("flipped");
          if (!primeiroCard) {
// Se for a primeira carta virada          
          primeiroCard = card;
          
          valorPrimeiroCard = card.getAttribute("data-card-value");
        } else {
// Se for a segunda carta virada
          
          contadorMovimentos();
          
          segundoCard = card;
          let valorSegundoCard = card.getAttribute("data-card-value");
          if (valorPrimeiroCard == valorSegundoCard) {
// Se as cartas forem iguais
            
            primeiroCard.classList.add("matched");
            segundoCard.classList.add("matched");
            
            primeiroCard = false;
            
            contagemVitorias += 1;
            
            if (contagemVitorias == Math.floor(valoresCard.length / 2)) {

              // Se todas as cartas tiverem sido encontradas              
              resultado.innerHTML = `<h2>Você Ganhou</h2>
              <h4>Movimentos: ${contarMovimentos}</h4>`;
              stopGame();
            }
          } else {
// Se as cartas forem diferentes
            
            let [primeiroTemporario, segundoTemporario] = [primeiroCard, segundoCard];
            primeiroCard = false;
            segundoCard = false;
            
// Define um atraso antes de virar as cartas de volta
            let delay = setTimeout(() => {
              primeiroTemporario.classList.remove("flipped");
              segundoTemporario.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

/*define os listeners de eventos para os botões "Start" e "Stop". O listener de evento do botão "Start" realiza as seguintes ações:
--Reinicia os valores das variáveis contarMovimentos, segundos e minutos para zero.
--Oculta os controles do jogo.
--Exibe o botão "Stop" e oculta o botão "Start".
--Inicia o intervaloo para atualizar o tempo, chamando a função timeGenerator a cada segundo.
--Define o valor inicial para o contador de movimentos.
--Chama a função inicializacao para inicializar o jogo.

O listener de evento do botão "Stop" realiza as seguintes ações:
--Exibe os controles do jogo.
--Oculta o botão "Stop" e exibe o botão "Start".
--Limpa o intervaloo para parar de atualizar o tempo.
--A função inicializacao é responsável por reiniciar o jogo. Ela limpa o conteúdo do elemento resultado, reinicia a variável contagemVitorias e gera novos valores para as cartas aleatoriamente. Em seguida, chama a função geraMatriz para gerar a matriz do jogo com os novos valores das cartas.*/

// Listener de evento para o botão "Start"
botaoStart.addEventListener("click", () => {
  contarMovimentos = 0;
  segundos = 0;
  minutos = 0;
  
  // Oculta os controles
  controles.classList.add("esconder");
  
  // Exibe o botão "Stop" e oculta o botão "Start"
  botaoStop.classList.remove("esconder");
  botaoStart.classList.add("esconder");
  
  // Inicia o intervaloo para atualizar o tempo
  intervalo = setInterval(timeGenerator, 1000);

  // Define o valor inicial para o contador de movimentos
  movimentos.innerHTML = `<span>Movimentos:</span> ${contarMovimentos}`;
  
  // Inicializa o jogo
  inicializacao();
});

// Listener de evento para o botão "Stop"
botaoStop.addEventListener("click", (stopGame = () => {
    // Exibe os controles
    controles.classList.remove("esconder");
    
    // Oculta o botão "Stop" e exibe o botão "Start"
    botaoStop.classList.add("esconder");
    botaoStart.classList.remove("esconder");
    
    // Limpa o intervaloo para parar de atualizar o tempo
    clearInterval(intervalo);
  })
);

// Função para inicializar o jogo
const inicializacao = () => {
  resultado.innerText = "";
  contagemVitorias = 0;
  
// Gera os valores das cartas aleatoriamente
  let valoresCard = gerarAleatorio();
  
// Gera a matriz do jogo
  geraMatriz(valoresCard);
};

//Para o ano do footer

const ano = document.querySelector('#ano-atual') 
ano.innerHTML = new Date(). getFullYear()



