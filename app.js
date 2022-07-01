import characterData from "./data.js"
import Character from "./Character.js"

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false

function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()]
  return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
  if(!isWaiting) {
    wizard.setDiceHtml()
    monster.setDiceHtml()
    wizard.takeDamage(monster.currentDiceScore)
    monster.takeDamage(wizard.currentDiceScore)
    renderCharacters()
    if(wizard.dead) {
      gameOver()
    } else if(monster.dead) {
      isWaiting = true
      if(monstersArray.length > 0) {
        setTimeout(() => {
          monster = getNewMonster()
          renderCharacters()
          isWaiting = false
        }, 1500)     
      } else {
        gameOver()
      }
    }
  }
}

function gameOver() {
  isWaiting = true
  const endMessage = wizard.health > monster.health ? 
    "The Wizard Wins" : wizard.health < monster.health ?
    "The Monsters are Victorious" : "No victors - All creatures are dead"

  const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
  setTimeout(() => {
    document.body.innerHTML = 
    `<div class="end-game">
      <h2>Game Over</h2>
      <h3>${endMessage}</h3>
      <p class="end-emoji">${endEmoji}</p>
    </div>`
  }, 1500);
}

document.getElementById("attack-button").addEventListener("click", attack)

function renderCharacters() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml()
  document.getElementById("monster").innerHTML = monster.getCharacterHtml()
}

let monster = getNewMonster()
const wizard = new Character(characterData.hero)
renderCharacters()