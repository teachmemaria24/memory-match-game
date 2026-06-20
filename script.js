const vocabulary = [
    { name: 'The first floor', image: 'https://raw.githubusercontent.com/teachmemaria24/memory-match-game/main/the%20First%20floor%20-%20first-floor.png' },
    { name: 'The second floor', image: 'https://raw.githubusercontent.com/teachmemaria24/memory-match-game/main/the%20First%20floor%20-%20second-floor.png' },
    { name: 'The third floor', image: 'https://raw.githubusercontent.com/teachmemaria24/memory-match-game/main/the%20First%20floor%20-%20third-floor.png' },
    { name: 'A classroom', image: 'https://raw.githubusercontent.com/teachmemaria24/memory-match-game/main/the%20First%20floor%20-%20classroom.png' },
    { name: 'A computer room', image: 'https://raw.githubusercontent.com/teachmemaria24/memory-match-game/main/the%20First%20floor%20-%20computer-room.png' },
    { name: 'A music room', image: 'https://raw.githubusercontent.com/teachmemaria24/memory-match-game/main/the%20First%20floor%20-%20music-room.png' },
    { name: 'A playground', image: 'https://raw.githubusercontent.com/teachmemaria24/memory-match-game/main/the%20First%20floor%20-%20playground.png' }
];

let cards = [];
let flipped = [];
let matched = [];
let score = 0;

function initGame() {
    // Create pairs
    const pairs = [...vocabulary, ...vocabulary];
    
    // Shuffle
    cards = pairs.sort(() => Math.random() - 0.5);
    
    // Create board
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    cards.forEach((card, index) => {
        const cardEl = document.createElement('button');
        cardEl.className = 'card';
        cardEl.innerHTML = '?';
        cardEl.style.backgroundImage = 'none';
        cardEl.onclick = () => flipCard(index, cardEl);
        gameBoard.appendChild(cardEl);
    });
}

function flipCard(index, cardEl) {
    if (flipped.includes(index) || matched.includes(index)) return;
    if (flipped.length === 2) return;
    
    // Flip the card to show image
    cardEl.style.backgroundImage = `url('${cards[index].image}')`;
    cardEl.innerHTML = '';
    cardEl.classList.add('flipped');
    flipped.push(index);
    
    // Speak the word
    speakWord(cards[index].name);
    
    if (flipped.length === 2) {
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const [first, second] = flipped;
    
    if (cards[first].name === cards[second].name) {
        // Match found
        matched.push(first, second);
        document.querySelectorAll('.card')[first].classList.add('matched');
        document.querySelectorAll('.card')[second].classList.add('matched');
        score++;
        document.getElementById('score').innerText = score;
        
        if (score === vocabulary.length) {
            setTimeout(() => {
                alert('🎉 You Won! Great job learning school places in English!');
                resetGame();
            }, 300);
        }
    } else {
        // No match - flip back
        const cardEls = document.querySelectorAll('.card');
        cardEls[first].style.backgroundImage = 'none';
        cardEls[second].style.backgroundImage = 'none';
        cardEls[first].innerHTML = '?';
        cardEls[second].innerHTML = '?';
        cardEls[first].classList.remove('flipped');
        cardEls[second].classList.remove('flipped');
    }
    
    flipped = [];
}

function speakWord(word) {
    // Text-to-speech (optional)
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
}

function resetGame() {
    score = 0;
    flipped = [];
    matched = [];
    document.getElementById('score').innerText = score;
    initGame();
}

// Start the game
initGame();