// GLOBAL VARIABLES
// ==============================================================

var wordBank = [
	'alpha',
	'bravo',
	'charlie',
	'delta',
	'echo',
	'foxtrot',
	'golf',
	'hotel',
	'india',
	'juliett',
	'kilo',
	'lima',
	'mike',
	'november',
	'oscar',
	'papa',
	'quebec',
	'romeo',
	'sierra',
	'tango',
	'uniform',
	'victor',
	'whiskey',
	'x-ray',
	'yankee',
	'zulu'
];
var targetWord = "";
var wrongLetters = [];
var lettersInWord = [];
var blanksAndLetters = [];

// Game Counters
var numBlanks = 0;
var guessesLeft = 9;
var winCount = 0;
var lossCount = 0;

// FUNCTIONS
// ==============================================================
function startGame()
{
	targetWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	lettersInWord = targetWord.split("");
	numBlanks = lettersInWord.length;

	// Reset
	guessesLeft = 9;
	blanksAndLetters = [];
	wrongLetters = [];

	// Populate Blanks and Successes with right number of blanks

	for(var i = 0; i<numBlanks; i++)
	{
		blanksAndLetters.push("_");
	}

	// Special Case for X
	if(targetWord == 'x-ray')
	{
		blanksAndLetters[1] = '-';
	}

	// Change HTML to reflect game state

	document.getElementById('targetWord').innerHTML = blanksAndLetters.join(" ");
	document.getElementById('wrongLetters').innerHTML = wrongLetters.join(" ");
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('winCounter').innerHTML = winCount;
	document.getElementById('lossCounter').innerHTML = lossCount;
}

function checkLetter(letter)
{
	var regEx = /[a-z]/; // Chapter 9 Eloquent Javascript
	if(regEx.test(letter))//Tests if letter is a through z
	{
		var isLetterInWord = false;
		// Check if letter exists in word
		for(var i = 0; i<targetWord.length; i++)
		{
			if(letter == targetWord[i])
			{
				isLetterInWord = true;
			}
		}

		if(isLetterInWord)
		{
			for(var j = 0; j<numBlanks; j++)
			{
				if(letter == targetWord[j])
				{
					blanksAndLetters[j] = letter;
					//console.log(blanksAndLetters);
				}
			}
		}
		else {
			// Checks to see if this letter is already in 
			// WrongLetters array
			// If not found, add it
			if(wrongLetters.indexOf(letter) == -1)
			{
				wrongLetters.push(letter);
				guessesLeft--;
			}
			// If not found do nothing
		}
	}
	
}

function completedRound()
{
	//Update Board to reflect changes

	document.getElementById('numGuesses').innerHTML = guessesLeft;

	document.getElementById('targetWord').innerHTML = blanksAndLetters.join(" ").toUpperCase();

	document.getElementById('wrongLetters').innerHTML = wrongLetters.join(" ");

	// Determine win/loss condition
	if(blanksAndLetters.toString() == lettersInWord.toString())
	{
		
		playAudio();
		winCount++;
		startGame();// Reset our game for a new round
	}
	else if(guessesLeft == 0)
	{
		alert('You Lost!');
		playAudio();
		lossCount++;
		startGame();
	}
	
}

function playAudio()
{
	var filePath = './assets/sounds/' + targetWord + '.mp3';
	var audio = new Audio(filePath);
	audio.play();
}

// MAIN PROCESS
// ==============================================================
startGame();

// Register Key Clicks

document.onkeyup = function(event)
{
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetter(letterGuessed);
	completedRound();
}

// TESTING/DEBUGGING
// ==============================================================
/*
console.log(targetWord);
console.log(lettersInWord);
console.log(numBlanks);
console.log(blanksAndLetters);
*/
