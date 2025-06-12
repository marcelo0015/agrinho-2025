/*
  Agrinho-themed Quiz for p5.js editor.
  Displays multiple-choice questions with interactive buttons,
  shows feedback and final score with restart functionality.
*/

let questions = [
  {
    question: "Qual destes produtos é um exemplo de grão cultivado pelo Agrinho?",
    answers: ["Milho", "Banana", "Morango", "Melancia"],
    correctIndex: 0
  },
  {
    question: "Qual dessas práticas é importante para agricultura sustentável?",
    answers: [
      "Uso excessivo de agrotóxicos",
      "Rotação de culturas",
      "Desmatamento",
      "Queimada frequente"
    ],
    correctIndex: 1
  },
  {
    question: "O Agrinho incentiva o cuidado com:",
    answers: ["Animais domésticos", "Árvores e plantas", "Carros", "Prédios"],
    correctIndex: 1
  },
  {
    question: "Para que serve a rotação de culturas?",
    answers: [
      "Aumentar o lucro rápido",
      "Evitar o esgotamento do solo",
      "Plantar só um tipo de planta",
      "Construir mais fazendas"
    ],
    correctIndex: 1
  },
  {
    question: "Quem pode participar dos projetos do Agrinho?",
    answers: [
      "Só produtores rurais",
      "Crianças e jovens da rede pública",
      "Viajantes",
      "Só agricultores profissionais"
    ],
    correctIndex: 1
  }
];

let currentQuestion = 0;
let score = 0;
let buttons = [];
let state = 'question'; // 'question', 'feedback', 'finished'
let feedbackText = '';
let feedbackColor;

function setup() {
  createCanvas(800, 450);
  textFont('Trebuchet MS');
  setupButtons();
  textAlign(CENTER, CENTER);
}

function draw() {
  background(204, 234, 180);
  drawBackgroundLeaves();

  fill(33, 71, 15);
  textSize(36);
  textStyle(BOLD);
  text('Quiz Agrinho', width / 2, 50);

  if(state === 'question' || state === 'feedback') {
    drawQuestionCard();
    buttons.forEach(btn => btn.display());

    if(state === 'feedback') {
      fill(feedbackColor);
      noStroke();
      textSize(22);
      text(feedbackText, width / 2, height - 60);
    }
  } else if(state === 'finished') {
    drawFinalScreen();
  }
}

function setupButtons() {
  buttons = [];
  let q = questions[currentQuestion];
  let startY = 180;
  let spacing = 55;
  for(let i = 0; i < q.answers.length; i++) {
    buttons.push(new Button(width / 2, startY + i * spacing, 520, 45, q.answers[i], i));
  }
}

function drawQuestionCard() {
  fill(240, 246, 228);
  rectMode(CENTER);
  rect(width / 2, 120, 560, 80, 20);

  fill(33, 71, 15);
  noStroke();
  textSize(24);
  textStyle(NORMAL);
  text(questions[currentQuestion].question, width / 2, 120);
}

function mousePressed() {
  if(state !== 'question') return;
  buttons.forEach(btn => {
    if(btn.isMouseOver() && !btn.disabled) {
      checkAnswer(btn.index);
    }
  });
}

function checkAnswer(selected) {
  let correct = questions[currentQuestion].correctIndex;
  if(selected === correct) {
    score++;
    feedbackText = "Resposta correta! 🌿";
    feedbackColor = color(46, 125, 50);
  } else {
    feedbackText = `Errado! Resposta certa: "${questions[currentQuestion].answers[correct]}"`;
    feedbackColor = color(211, 47, 47);
  }
  state = 'feedback';
  buttons.forEach(btn => btn.disabled = true);

  setTimeout(() => {
    currentQuestion++;
    if(currentQuestion >= questions.length) {
      state = 'finished';
    } else {
      setupButtons();
      state = 'question';
    }
  }, 1500);
}

function drawFinalScreen() {
  fill(240, 246, 228);
  rectMode(CENTER);
  rect(width / 2, height / 2, 540, 180, 25);

  fill(33, 71, 15);
  textSize(30);
  textStyle(BOLD);
  text("Quiz finalizado!", width / 2, height / 2 - 40);
  
  textSize(26);
  text(`Você acertou ${score} de ${questions.length} perguntas!`, width / 2, height / 2 + 10);

  drawRestartButton();
}

function drawRestartButton() {
  let w = 180, h = 45;
  let x = width / 2 - w / 2;
  let y = height / 2 + 60;

  if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    fill(98, 183, 57);
  } else {
    fill(116, 193, 64);
  }

  stroke(33, 71, 15);
  strokeWeight(2);
  rect(x, y, w, h, 15);

  noStroke();
  fill(240, 246, 228);
  textSize(22);
  text("Reiniciar Quiz", width / 2, y + h / 2);
}

function mouseClicked() {
  if(state === 'finished') {
    let w = 180, h = 45;
    let x = width / 2 - w / 2;
    let y = height / 2 + 60;
    if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      currentQuestion = 0;
      score = 0;
      setupButtons();
      state = 'question';
    }
  }
}

class Button {
  constructor(x, y, w, h, label, index) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.index = index;
    this.disabled = false;
  }
  display() {
    rectMode(CENTER);
    strokeWeight(2);
    if(this.disabled){
      noStroke();
      fill(170);
    } else if(this.isMouseOver()){
      fill(162, 209, 73);
      stroke(33, 71, 15);
    } else {
      fill(108, 187, 60);
      stroke(33, 71, 15);
    }
    rect(this.x, this.y, this.w, this.h, 12);

    fill(this.disabled ? 200 : 240);
    noStroke();
    textSize(18);
    textAlign(CENTER, CENTER);
    text(this.label, this.x, this.y);
  }
  isMouseOver() {
    return mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2 &&
           mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2;
  }
}

function drawBackgroundLeaves(){
  noStroke();
  for(let i = 0; i < width; i += 100){
    let sway = sin(frameCount * 0.04 + i * 0.5) * 10;
    fill(120, 180, 80, 140);
    ellipse(i + sway, height - 30, 80, 40);
    ellipse(i + 30 + sway, height - 60, 60, 30);
  }
}

