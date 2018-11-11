
//Tell the library which element to use for the table
cards.init({table:'#card-table'});
//2 is always opponent
//Create a new deck of cards
deck = new cards.Deck();
deck2 = new cards.Deck();
var yourDeckSize = 26;
var opponentCards = 26;

var lock = false;

//By default it's in the middle of the container, put it slightly to the side
deck2.x += 100;

deck.x -= 100;

var half_length = Math.ceil(cards.all.length / 2);

var leftSide = cards.all.splice(0,half_length);

//cards.all contains all cards, put them all in the deck
deck.addCards(cards.all);

deck2.addCards(leftSide);

//No animation here, just get the deck onto the table.
deck.render({immediate:true});

deck2.render({immediate:true});

//Now lets create a couple of hands, one face down, one face up.
upperhand = new cards.Hand({faceUp:true, y:60});
lowerhand = new cards.Hand({faceUp:true, y:340});

//Lets add a discard pile
discardPile2 = new cards.Deck({faceUp:false});
discardPile = new cards.Deck({faceUp:false});
discardPile2.x += 250;
discardPile.x -=250;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

 const fightWar = async function () {
      for (let i = 0; i < 3; i++) {
    	  const a =  deck.deal(1, [lowerhand], 50);
		  const b =  deck2.deal(1, [upperhand], 50);
      }
     flipCards();
    };


function doubleAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x * 2);
    }, 2000);
  });
}

async function addAsync(x) {
  const a = await doubleAfter2Seconds(10);
  const b = await doubleAfter2Seconds(20);
  const c = await doubleAfter2Seconds(30);
  return x + a + b + c;
}
addAsync(10).then((sum) => {
  console.log(sum);
});

async function moveToDiscardPile(card1,card2) {
		sleep(1000).then(() =>  {

		let lowerhandLength = lowerhand.length;
		let uperhandLength = upperhand.length;
		//let handResult =  await getHandResult(card1, card2);
		if(card1.rank> card2.rank)
		{


		//window.alert("Your Card is higher!");
		 console.log('Card 1 is larger');
		 console.log("Card 1 larger ");
		
		 //putCardsInDiscardPile(discardPile1,lowerhand );
		 //putCardsInDiscardPile(discardPile1, upperhand);

		  while(lowerhand.length != 0){
		 	discardPile.addCards(lowerhand);
		 	console.log(lowerhand.length);
		 }
		 while(upperhand.length != 0){
		 	discardPile.addCards(upperhand);
		 	console.log(upperhand.length);
		 }

		 discardPile.render();
		 lowerhand.render();
		 upperhand.render();
		 opponentCards = deck2.length + discardPile2.length;
		 yourDeckSize = deck.length + discardPile.length;
		 console.log(opponentCards);
		 console.log(yourDeckSize);
		 $('#opponetsCards').html('Opponents deck size ' + opponentCards);
		 $('#yourCards').html('Your deck size ' + yourDeckSize);



		 lock =false;

		}
		else if(card1.rank < card2.rank)
		{
		 //window.alert("Your  opponets Card is higher!");
		 console.log('Card 2 is larger');
		 console.log(lowerhand);
		 console.log(upperhand);
		 while(lowerhand.length != 0){
			 discardPile2.addCards(lowerhand);
		 	console.log(lowerhand.length);
		 }
		 while(upperhand.length != 0){
		 	discardPile2.addCards(upperhand);
		 	console.log(upperhand.length);
		 }
		 	 discardPile2.render();
		 lowerhand.render();
		 upperhand.render();
		 opponentCards = deck2.length + discardPile2.length;
		 yourDeckSize = deck.length + discardPile.length;
		 $('#opponetsCards').html('Opponents deck size ' + opponentCards);
		 $('#yourCards').html('Your deck size ' + yourDeckSize);
		 //putCardsInDiscardPile(discardPile2,lowerhand );
		 //putCardsInDiscardPile(discardPile2, upperhand);

		 discardPile2.render();
		 lowerhand.render();
		 upperhand.render();
		 lock =false;
		}
		else{
			window.alert("Fighting War");
			fightWar();
		}
		if(discardPile2.length + deck2.length ==0)
		{
			window.alert("You win the game!!");
		}
		if(discardPile.length + deck.length ==0)
		{
			window.alert("Opponent wins the game.");
		}


  //do stuff
})


}

async function flipCards()
{
  if(deck.length < 1)
  {
	  deck.addCards(discardPile);
	  deck.render();
	  discardPile.render();

  }
  if(deck2.length < 1) {

	  deck2.addCards(discardPile2);
	  deck2.render();
	  discardPile2.render();
  }

const a = await deck2.deal(1, [upperhand], 50);
const b = await deck.deal(1, [lowerhand], 50);
console.log(lowerhand);
console.log(upperhand);
const c = await moveToDiscardPile(lowerhand[lowerhand.length-1],upperhand[upperhand.length-1]);




}


function getHandResult(card1, card2) {
	if(card.rank> card2.rank)
	{
		return 'player1Larger';
	}
	else if (card.rank < card2.rank) {
		return 'player2Larger';
	}
	else {
		return 'war';
	}
};

//Let's deal when the Deal button is pressed:
$('#flip').click(function() {
	if(lock == false){
	lock = true;	
	//window.alert(lock);
	//Deck has a built in method to deal to hands.
	flipCards();
	}
});


//When you click on the top card of a deck, a card is added
//to your hand
deck.click(function(card){
	if (card === deck.topCard()) {
		lowerhand.addCard(deck.topCard());
		lowerhand.render();
	}
});

deck2.click(function(card){
	if (card === deck2.topCard()) {
		upperhand.addCard(deck2.topCard());
		upperhand.render();
	}
});

//Finally, when you click a card in your hand, if it's
//the same suit or rank as the top card of the discard pile
//then it's added to it
lowerhand.click(function(card){
		discardPile.addCard(card);
		discardPile.render();
		lowerhand.render();
});



//So, that should give you some idea about how to render a card game.
//Now you just need to write some logic around who can play when etc...
//Good luck :)
