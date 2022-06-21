//on page load fetch, gets deckID
let deckId = ''

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    deckId = data.deck_id
  })
  .catch(err => {
    console.log(`error ${err}`)
  });

document.querySelector('button').addEventListener('click', drawTwo) //clicks button, draws 2 cards

function drawTwo() {
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2` //uses deckID to draw cards


  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      document.querySelector('#player1').src = data.cards[0].image //puts image of card into DOM
      document.querySelector('#player2').src = data.cards[1].image

      let player1Val = convertToNum(data.cards[0].value) //comparison below to see who won or declare war
      let player2Val = convertToNum(data.cards[1].value)
      if (player1Val > player2Val) {
        document.querySelector('h3').innerText = ('Player 1 Wins!')
      } else if (player1Val < player2Val) {
        document.querySelector('h3').innerText = ('Player 2 Wins!')
      } else {
        document.querySelector('h3').innerText = ('I DECLARE WAR!!')
      }


    })
    .catch(err => {
      console.log(`error ${err}`)
    });


}
function convertToNum(val) {     //helper function that converts any value into a number from string
  if (val === 'ACE') {
    return 14
  } else if (val === 'KING') {
    return 13
  } else if (val === 'QUEEN') {
    return 12
  } else if (val === 'JACK') {
    return 11
  } else {
    return Number(val) //converts strings to numbers
  }
}




