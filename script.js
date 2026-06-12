const giftCard = document.querySelector('#giftCard');
const cardImage = document.querySelector('#cardImage');
const sequenceTitle = document.querySelector('#sequenceTitle');
const progressDots = document.querySelector('#progressDots');
const flipButton = document.querySelector('#flipButton');
const openMessage = document.querySelector('#openMessage');
const closeMessage = document.querySelector('#closeMessage');
const messageModal = document.querySelector('#messageModal');

const frames = [
  {
    src: 'assets/frente-cartao.png',
    alt: 'Frente do cartão de Dia dos Namorados',
    title: 'Cartão de abertura'
  },
  {
    src: 'assets/foto-01.jpg',
    alt: 'Mãos do casal em um momento especial com anel',
    title: 'Um momento inesquecível'
  },
  {
    src: 'assets/foto-02.jpg',
    alt: 'Casal sentado junto em um passeio romântico',
    title: 'Uma lembrança especial'
  },
  {
    src: 'assets/foto-03.jpg',
    alt: 'Selfie do casal sorrindo em um dia especial',
    title: 'Nosso sorriso'
  },
  {
    src: 'assets/verso-cartao.png',
    alt: 'Verso do cartão com o presente Coffee Woman Duo O Boticário',
    title: 'Seu presente está a caminho'
  }
];

let currentFrame = 0;

function renderProgress() {
  progressDots.innerHTML = '';
  frames.forEach((frame, index) => {
    const dot = document.createElement('span');
    dot.className = 'progress-dot';
    dot.setAttribute('aria-hidden', 'true');
    if (index === currentFrame) dot.classList.add('active');
    progressDots.appendChild(dot);
  });
}

function updateFrame() {
  const frame = frames[currentFrame];
  cardImage.src = frame.src;
  cardImage.alt = frame.alt;
  sequenceTitle.textContent = frame.title;
  flipButton.textContent = currentFrame === frames.length - 1 ? 'Voltar ao início' : 'Ver próxima imagem';
  renderProgress();
}

function nextFrame() {
  if (giftCard.classList.contains('is-animating')) return;

  giftCard.classList.add('is-animating');

  setTimeout(() => {
    currentFrame = (currentFrame + 1) % frames.length;
    updateFrame();
  }, 320);

  setTimeout(() => {
    giftCard.classList.remove('is-animating');
  }, 720);
}

giftCard.addEventListener('click', nextFrame);
flipButton.addEventListener('click', nextFrame);

openMessage.addEventListener('click', () => {
  if (typeof messageModal.showModal === 'function') {
    messageModal.showModal();
  }
});

closeMessage.addEventListener('click', () => messageModal.close());

messageModal.addEventListener('click', (event) => {
  const rect = messageModal.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) messageModal.close();
});

updateFrame();
