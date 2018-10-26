
//Tell the library which element to use for the table
cards.init({table:'#card-table'});

//Create a new deck of cards
deck = new cards.Deck(); 
deck2 = new cards.Deck(); 
console.log(deck);
 console.log(deck2);
//By default it's in the middle of the container, put it slightly to the side
deck.x -= 75;
deck.y -= 100;
deck2.x -= 150;

var half_length = Math.ceil(cards.all.length / 2);    
console.log(half_length);
var leftSide = cards.all.splice(0,half_length);
console.log(leftSide);
console.log('First half ');
console.log(cards.all.length);
console.log('Second half ');
console.log(leftSide.length);
//cards.all contains all cards, put them all in the deck
deck.addCards(cards.all); 

deck2.addCards(leftSide);

//No animation here, just get the deck onto the table.
deck.render({immediate:true});

deck2.render({immediate:true});


//Now lets create a couple of hands, one face down, one face up.
upperhand = new cards.Hand({faceUp:false, y:60});
lowerhand = new cards.Hand({faceUp:true, y:340});

//Lets add a discard pile
discardPile = new cards.Deck({faceUp:false});
discardPile.x += 50;


//Let's deal when the Deal button is pressed:
$('#deal').click(function() {
	//Deck has a built in method to deal to hands.
	$('#deal').hide();
	deck.deal(5, [upperhand, lowerhand], 50, function() {
		//This is a callback function, called when the dealing
		//is done.
		discardPile.addCard(deck.topCard());
		discardPile.render();
	});
});


//When you click on the top card of a deck, a card is added
//to your hand
deck.click(function(card){
	if (card === deck.topCard()) {
		lowerhand.addCard(deck.topCard());
		lowerhand.render();
	}
});

//Finally, when you click a card in your hand, if it's
//the same suit or rank as the top card of the discard pile
//then it's added to it
lowerhand.click(function(card){
	if (card.suit == discardPile.topCard().suit 
		|| card.rank == discardPile.topCard().rank) {
		discardPile.addCard(card);
		discardPile.render();
		lowerhand.render();
	}
});


//So, that should give you some idea about how to render a card game.
//Now you just need to write some logic around who can play when etc...
//Good luck :)
