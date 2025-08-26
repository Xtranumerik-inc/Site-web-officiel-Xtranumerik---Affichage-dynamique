/**
 * JEU DE MÉMOIRE XTRANUMERIK
 */
class MemoryGame {
    constructor(container) {
        this.container = container;
        this.gameBoard = container.querySelector('#game-board');
        this.attemptsElement = container.querySelector('#attempts');
        this.timerElement = container.querySelector('#timer');
        this.messageElement = container.querySelector('#game-message');
        this.resetButton = container.querySelector('#reset-game');
        
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.attempts = 0;
        this.startTime = null;
        this.gameTimer = null;
        
        // Symboles du jeu (relatifs à Xtranumerik)
        this.symbols = ['🖥️', '📺', '💻', '📱', '🎯', '⚡', '🛠️', '📈'];
        
        this.init();
    }

    init() {
        this.createGameBoard();
        this.setupEventListeners();
        this.resetGame();
    }

    createGameBoard() {
        this.gameBoard.innerHTML = '';
        this.gameBoard.className = 'game-board';
        
        // Créer les paires de cartes
        const gameSymbols = [...this.symbols, ...this.symbols];
        this.shuffle(gameSymbols);
        
        gameSymbols.forEach((symbol, index) => {
            const card = this.createCard(symbol, index);
            this.cards.push(card);
            this.gameBoard.appendChild(card.element);
        });
    }

    createCard(symbol, index) {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.innerHTML = `
            <div class="card-front">${symbol}</div>
            <div class="card-back">❓</div>
        `;
        
        const card = {
            element: cardElement,
            symbol: symbol,
            index: index,
            isFlipped: false,
            isMatched: false
        };
        
        cardElement.addEventListener('click', () => this.flipCard(card));
        
        return card;
    }

    setupEventListeners() {
        this.resetButton.addEventListener('click', () => this.resetGame());
    }

    flipCard(card) {
        // Vérifications
        if (card.isFlipped || card.isMatched || this.flippedCards.length >= 2) {
            return;
        }
        
        // Démarrer le timer au premier clic
        if (!this.startTime) {
            this.startTimer();
        }
        
        // Retourner la carte
        card.isFlipped = true;
        card.element.classList.add('flipped');
        this.flippedCards.push(card);
        
        // Vérifier les correspondances
        if (this.flippedCards.length === 2) {
            this.attempts++;
            this.updateAttempts();
            setTimeout(() => this.checkMatch(), 800);
        }
    }
    checkMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.symbol === card2.symbol) {
            // Paire trouvée
            card1.isMatched = true;
            card2.isMatched = true;
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');
            
            this.matchedPairs++;
            
            // Vérifier si le jeu est terminé
            if (this.matchedPairs === this.symbols.length) {
                this.endGame();
            }
        } else {
            // Pas de correspondance - retourner les cartes
            setTimeout(() => {
                card1.isFlipped = false;
                card2.isFlipped = false;
                card1.element.classList.remove('flipped');
                card2.element.classList.remove('flipped');
            }, 300);
        }
        
        this.flippedCards = [];
    }

    startTimer() {
        this.startTime = new Date();
        this.gameTimer = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    updateTimer() {
        if (!this.startTime) return;
        
        const now = new Date();
        const elapsed = Math.floor((now - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        this.timerElement.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateAttempts() {
        this.attemptsElement.textContent = this.attempts;
    }

    endGame() {
        clearInterval(this.gameTimer);
        const totalTime = Math.floor((new Date() - this.startTime) / 1000);
        
        let message = `🎉 Félicitations ! Jeu terminé en ${this.attempts} tentatives et ${totalTime} secondes.`;
        
        // Messages selon performance
        if (this.attempts <= 10) {
            message += " Excellente mémoire !";
        } else if (this.attempts <= 15) {
            message += " Bonne performance !";
        } else {
            message += " Continuez à vous exercer !";
        }
        
        this.messageElement.textContent = message;
        this.messageElement.style.display = 'block';
    }

    resetGame() {
        // Reset variables
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.attempts = 0;
        this.startTime = null;
        
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }
        
        // Reset affichage
        this.attemptsElement.textContent = '0';
        this.timerElement.textContent = '00:00';
        this.messageElement.style.display = 'none';
        
        // Recréer le plateau
        this.createGameBoard();
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MemoryGame;
} else {
    window.MemoryGame = MemoryGame;
}
