// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");



const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};



// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   word = input.question("\nEnter a word to score: ");
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += Number (pointValue)
		 }
 
	  }
	}
	return letterPoints;
 }

function simpleScorer (word){
   word = word.toUpperCase();
   let simplePoints = 0;

   for (i = 0; i < word.length; i++){
     Number (simplePoints ++)
   }
   return simplePoints
};


function vowelBonusScorer(word){
word = word.toUpperCase();
      let bonusVowelScore = 0;
            const vowels = ["A", "E", "I", "O", "U"];
         for (let i = 0; i < word.length; i++) {
             if (vowels.includes(word[i])) {
                  bonusVowelScore += 3;
             } else {
                  bonusVowelScore += 1;
               }
         }
         return bonusVowelScore


};


let scrabble = {
   name: "Scrabble",
   description:"The traditional scoring algorithm.",
   scorerFunction:  scrabbleScorer
};

let bonusVowelScorer = {
   name: "Bonus vowels",
   description:"Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction:  vowelBonusScorer
       
};

let simpleScore = {
   name: "Simple Score",
   description:"Each letter is worth 1 point",
   scorerFunction:  simpleScorer
};


function transform(oldPointStructure) {
   let transformed = {}
   for (key in oldPointStructure) {
      for (i = 0; i < oldPointStructure[key].length; i++){
         transformed[oldPointStructure[key][i].toLowerCase()] = Number (key);
      }
   }
   return transformed

};

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer (word){
   word = word.toLowerCase();
   let scrabbleScore = 0;
   for (i = 0; i < word.length; i ++){
     if (newPointStructure.hasOwnProperty(word[i]))
     scrabbleScore += newPointStructure[word[i]]
   }
   return scrabbleScore; 

}


const scoringAlgorithms = [simpleScore,bonusVowelScorer,scrabble];


function scorerPrompt() {
let chosenScoreStyle = input.question("Which scoring method would you like to use?\n\n 0 - Simple: One point per character\n 1 - Vowel Bonus: Vowels are worth 3 points\n 2 - Scrabble: Uses scrabble point system\n Enter 0, 1, or 2: ")
if (chosenScoreStyle === "0"){
      return console.log (`Score for ${word}: ${scoringAlgorithms[0].scorerFunction(word)}`)
   }else if (chosenScoreStyle === "1"){
         return console.log (`Score for '${word}': ${scoringAlgorithms[1].scorerFunction(word)}`)
      } else if (chosenScoreStyle === "2") {
            return console.log(`Score for '${word}': ${scoringAlgorithms[2].scorerFunction(word)}` )
            } 
   
};



function runProgram() {
   initialPrompt();
   scorerPrompt();

   
   
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
