$( document ).ready(function() {

//Global variables
var currentGameIndex=0;
var wins=0;
var losses=0;
var timeOut=false;
var currentQuestion;


var gameSet=[
	{question: 'Who is Mario\'s younger brother?', 
	answerChoice: ['Luigi', 'Bowser', 'Toad', 'Lemmy'],
	answer: 0,
	picture: 'assets/images/luigi.png'},

	{question: 'Which is NOT a Super Mario power-up?', 
	answerChoice: ['Mushroom', 'Super Leaf', 'Yoshi\'s Wings', 'Eagle Talon'],
	answer: 3,
	picture: 'assets/images/super_leaf.png'},
	
	{question: 'Which is NOT a race course in Mario Kart 64?', 
	answerChoice: ['Rainbow Road', 'Penguin Parkway', 'Banshee Boardwalk', 'Choco Mountain'],
	answer: 1,
	picture: 'assets/images/rainbow_road.png'},
	
	{question: 'In Super Mario World, what power does blue Yoshi get when he eats a Koopa shell?', 
	answerChoice: ['Fireball Power', 'Invisibility', 'Flying', 'Strength'],
	answer: 2,
	picture: 'assets/images/flying_yoshi.gif'},
	
	{question: 'Which is NOT an enemy in the Super Mario series', 
	answerChoice: ['Kremling', 'Lakitu', 'Bob-omb', 'Dry Bones'],
	answer: 0,
	picture: 'assets/images/enemies.jpeg'},
];

//New Game Function
function newGame(){
	currentGameIndex=0;
	wins=0;
	losses=0;
	setupQuestion();
}

//Create a countdown timer
function countdown(){
	timeOut=false;
    var seconds = 25;
    tick=function tick() {
        var counter = document.getElementById('counter');
        seconds--;
        counter.innerHTML ='Time Remaining: ' + String(seconds) + ' seconds';
        if( seconds > 0 ) {
            var timer=setTimeout(tick, 1000);
			if(timeOut===true){
				clearTimeout(timer);
			}
        } else {
			losses++;
			currentQuestion++;
			$('#main').html(' ');
			$('#main').append('<div class="right-wrong"></div>');
			$('#main').append('<div class.answer-picture"></div>');
			$('.answer-picture').attr('src', currentQuestion.picture);
			$('.right-wrong').html('Time\'s Up!!');
		
			currentGameIndex++;
			timeOut=true;
			setTimeout(setupQuestion, 3000);
        }
    }
    tick();
}

//Populate SetUp Question
function setupQuestion(){
	if (currentGameIndex===gameSet.length){
		$('#main').html(' ');
			$('#main').append('<div id="wins-losses"></div>');
			$('#wins-losses').html('Wins: ' +wins + '<br/>'+'<br/>'+'<br/>'+ 'Losses: '+losses);
			$('#main').append('<div id="start-over"></div>');
			$('#start-over').html('Start Over');
			$('#start-over').click(function(){
				newGame();
			});
	}else{
		countdown();
		currentQuestion=gameSet[currentGameIndex];
		
		$('#main').html('<div id="question"></div>' +
			'<div id="container-left">' +
				'<div id="answerone" class="answer" data-value="0"></div>' +
				'<div id="answerthree" class="answer" data-value="2"></div>' +
			'</div>' +
			'<div id="container-right">' +
				'<div id="answertwo" class="answer" data-value="1"></div>' +
				'<div id="answerfour" class="answer" data-value="3"></div>' +
			'</div>');
			
		$('#question').html(currentQuestion.question);
		$('#answerone').html(currentQuestion.answerChoice[0]);
		$('#answertwo').html(currentQuestion.answerChoice[1]);
		$('#answerthree').html(currentQuestion.answerChoice[2]);
		$('#answerfour').html(currentQuestion.answerChoice[3]);
		
		$('.answer').click(function(){
			if(gameSet[currentGameIndex].answer === parseInt($(this).attr('data-value'))){
				wins++;
				$('#main').html(' ');
				$('#main').append('<div class="right-wrong"></div>');
				$('#main').append('<img class="answer-picture"/>');
				$('.right-wrong').html('You are correct!!');
				$('.answer-picture').attr('src', currentQuestion.picture);
			}
			else{
				losses++;
				$('#main').html(' ');
				$('#main').append('<div class="right-wrong"></div>');
				$('#main').append('<img class="answer-picture"/>');
				$('.right-wrong').html('Nope!!');
				$('.answer-picture').attr('src', currentQuestion.picture);
			}
			
			currentGameIndex++;
			timeOut=true;
			setTimeout(setupQuestion, 3000);
			});
	}
}
setupQuestion();


});