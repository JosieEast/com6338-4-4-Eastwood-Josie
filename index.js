var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

// Game state
let currentWord = ''
let revealed = []        // underscores + correct letters
let wrongLetters = []    // incorrect guesses
let remaining = 10
let wins = 0
let losses = 0
let previousWord = ''

// DOM elements
const wordEl = document.querySelector('#word-to-guess')
const prevEl = document.querySelector('#previous-word')
const wrongEl = document.querySelector('#incorrect-letters')
const remainEl = document.querySelector('#remaining-guesses')
const winsEl = document.querySelector('#wins')
const lossesEl = document.querySelector('#losses')

// Update display
function render() {
  wordEl.textContent = revealed.join('')
  prevEl.textContent = previousWord
  wrongEl.textContent = wrongLetters.join(', ')
  remainEl.textContent = remaining
  winsEl.textContent = wins
  lossesEl.textContent = losses
}

// Start or reset round
function startRound(prev = '') {
  previousWord = prev
  currentWord = words[Math.floor(Math.random() * words.length)]
  revealed = Array(currentWord.length).fill('_')
  wrongLetters = []
  remaining = 10
  render()
}

// Check for win/loss
function checkEnd() {
  if (!revealed.includes('_')) {
    wins++
    startRound(currentWord)
  } else if (remaining <= 0) {
    losses++
    startRound(currentWord)
  }
}

// Handle key presses
function onKeyUp(e) {
  const letter = (e.key || '').toLowerCase()
  if (!/^[a-z]$/.test(letter)) return
  if (revealed.includes(letter) || wrongLetters.includes(letter)) return

  if (currentWord.includes(letter)) {
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === letter) revealed[i] = letter
    }
  } else {
    wrongLetters.push(letter)
    remaining--
  }

  render()
  checkEnd()
}

// Listen for key guesses
document.addEventListener('keyup', onKeyUp)

// Begin first game
startRound()