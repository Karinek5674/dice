import {konzole} from "./functions.js";
konzole();

//fotky kostek
const dicePic1 = `<img class="dice1 selectableDice" data-value="1" src="./dices/1.svg">`;
const dicePic2 = `<img class="dice2 selectableDice" data-value="2" src="./dices/2.svg">`;
const dicePic3 = `<img class="dice3 selectableDice" data-value="3" src="./dices/3.svg">`;
const dicePic4 = `<img class="dice4 selectableDice" data-value="4" src="./dices/4.svg">`;
const dicePic5 = `<img class="dice5 selectableDice" data-value="5" src="./dices/5.svg">`;
const dicePic6 = `<img class="dice6 selectableDice" data-value="6" src="./dices/6.svg">`;

//selected kostky ze kterých pak bdue vycházet to porovnávání a výpočet bodů
let kostka1Selected = 0;
let kostka2Selected = 0;
let kostka3Selected = 0;
let kostka4Selected = 0;
let kostka5Selected = 0;
let kostka6Selected = 0;

//jednotlive kostky
let kostka1 = 0;
let kostka2 = 0;
let kostka3 = 0;
let kostka4 = 0;
let kostka5 = 0;
let kostka6 = 0;

//ta promenna ktera urcuje, kolik kostek se vygeneruje 
let generujKostek = 6;

function generujKostkyAJejichFunkce() {
	resetDivs();
	resetPoctyKostek();
	selectedDices = [];
	hracuvTah = true;
	priradHodnotuKostkam();
	numDivu++;
	console.log(kostky) //array s hodnotou kostek
	let i = 0;
	kostky.forEach(kostka => {
		console.log(divs[i]);
		switch(kostka){
			case 1:
				divs[i].innerHTML = dicePic1;
				kostka1Selected++;
				break;
			case 2:
				divs[i].innerHTML = dicePic2;
				kostka2Selected++;
				break;
			case 3:
				divs[i].innerHTML = dicePic3;
				kostka3Selected++;
				break;
			case 4:
				divs[i].innerHTML = dicePic4;
				kostka4Selected++;
				break;
			case 5:
				divs[i].innerHTML = dicePic5;
				kostka5Selected++;
				break;
			case 6:
				divs[i].innerHTML = dicePic6;
				kostka6Selected++;
				break;
			default: 
				divs[i].innerHTML = '';
				break;
		}
		i++;
	})
	console.log(kostka1Selected, kostka2Selected, kostka3Selected, kostka4Selected, kostka5Selected, kostka6Selected); //zde bude podminka na tu kontrolu kostek
	if (kostka1Selected > 0 || kostka5Selected > 0 ) {
		console.log('Mas alespon jednu kostka1 nebo kostka5')
	} else {
		if (kostka2Selected >= 3) {
			console.log('Mas 3 nebo vice kostka2')
		} else if (kostka3Selected >= 3) {
			console.log('Mas 3 nebo vice kostka3')
		} else if (kostka4Selected >= 3) {
			console.log('Mas 3 nebo vice kostka4')
		} else if (kostka6Selected >= 3) {
			console.log('Mas 3 nebo vice kostka6')
		} else {
			smulaWindow.classList.add('smula-show');
			console.log(numberOfSelectedDices);
			setTimeout(() => {
				smulaWindow.classList.remove('smula-show');
			}, 2000)
		}
	}
	//Selectování kostek a jejich hodnoty 
	document.querySelectorAll('.selectableDice').forEach((kostka) => {
		kostka.addEventListener('click', () => {
			let valueKostky = kostka.dataset.value; //TOHLE JE VALUE TE KOSTKY
			if (kostka.classList.contains('selectedDice') == false) {
				kostka1Selected = 0;
				kostka2Selected = 0;
				kostka3Selected = 0;
				kostka4Selected = 0;
				kostka5Selected = 0;
				kostka6Selected = 0;
				kostka.classList.add('selectedDice');
				selectedDices.push(valueKostky);// do arraye mi to hodí ten value kliknuté kostky 
				numberOfSelectedDices++; 
				//POČÍTANÍ SCORE HRÁČE
				console.log(selectedDices) //array selectnutých kostek
				selectedDices.forEach(kostka => {
					switch(kostka){
						case '1':
							kostka1Selected++;
							break;
						case '2':
							kostka2Selected++;
							break;
						case '3':
							kostka3Selected++;
							break;
						case '4':
							kostka4Selected++;
							break;
						case '5':
							kostka5Selected++;
							break;
						case '6':
							kostka6Selected++;
							break;
					}
				})
					countPoints();
			} else { //DESELECTOVÁNÍ KOSTEK
				switch(valueKostky) {
					case '1':
						kostka1Selected--;
						break;
					case '2':
						kostka2Selected--;
						break;
					case '3':
						kostka3Selected--;
						break;
					case '4':
						kostka4Selected--;
						break;
					case '5':
						kostka5Selected--;
						break;
					case '6':
						kostka6Selected--;
						break;
				}	
				//console.log(valueKostky); //value kostky, kterou jsem klikl
				for (let i = 0; i < selectedDices.length; i++) {
						if (selectedDices[i] == valueKostky) {
							selectedDices.splice(i, 1);
							break;
						}
				}
				console.log(selectedDices);
				kostka.classList.remove('selectedDice');
				numberOfSelectedDices--;
				countPoints();
			}
		})
	})
}

//kostkove divy
const div0 = document.querySelector('.kostka1');
const div1 = document.querySelector('.kostka2');
const div2 = document.querySelector('.kostka3');
const div3 = document.querySelector('.kostka4');
const div4 = document.querySelector('.kostka5');
const div5 = document.querySelector('.kostka6');

//array obsahujici kostky, do ktere se pak budou hodnoty prirazovat a z ni brat 
let kostky = [kostka1, kostka2, kostka3, kostka4, kostka5, kostka6]

//funkce, ktera kazde kostce v arrayi priradi hodnotu 1 - 6 
function priradHodnotuKostkam() { 
	for (let i = 0; i < generujKostek; i++) {
		kostky[i] = randomDice()
	}
}

//funkce generující číslo od 1 do 6 na random
function randomDice() {
	return Math.floor(Math.random() * 6) + 1
}

//Tlačítko na hod kostkami, priradi hodnotu kostkam a dle nich šsi pak hrac vybere 
let hracuvTah = false;
let numDivu = 0;
const divs = [div0, div1, div2, div3, div4, div5];
let selectedDices = []; //array tech zakliknutych kostek
let numberOfSelectedDices = 0;

const rollButton = document.querySelector('.js-roll')
rollButton.addEventListener('click', () => {
	if (hracuvTah == false) {
			generujKostkyAJejichFunkce()
		} else {
			alert('You already rolled, score and you can roll again.')
		}
})

//CONTINUE tlačítko 
document.querySelector('.js-continue').addEventListener('click', () => {
	if (numberOfSelectedDices == 0) {
		alert('Choose at least one dice to continue');
	} else if (numberOfSelectedDices < 6) {
		kostky = [];
		definitivniScore += scoreHrace;
		scoreHrace = 0;
		defScore.innerHTML = definitivniScore;
		selectedScore.innerHTML = scoreHrace;
		console.log(generujKostek);
		generujKostek -= numberOfSelectedDices;
		generujKostkyAJejichFunkce();
	} else if (numberOfSelectedDices == 6) {
		definitivniScore += scoreHrace;
		scoreHrace = 0;
		defScore.innerHTML = definitivniScore;
		selectedScore.innerHTML = scoreHrace;
		numberOfSelectedDices = 0;
		generujKostek = 6;
		generujKostkyAJejichFunkce();
	}
})

//score hrace
let scoreHrace = 0;
let meziScore = 0;
let definitivniScore = 0;


const selectedScore = document.querySelector('.js-selected');
const defScore = document.querySelector('.js-def-score');

function resetDivs() {
	div0.innerHTML = '';
	div1.innerHTML = '';
	div2.innerHTML = '';
	div3.innerHTML = '';
	div4.innerHTML = '';
	div5.innerHTML = '';
}

//VÝPOČET BODŮ
function countPoints() {
	generujKostek = 6;
	scoreHrace = 0;
	meziScore = 0;
	if (kostka1Selected > 0) {
			switch (kostka1Selected) {
					case 1:
							meziScore = 100;
							break;
					case 2:
							meziScore = 200;
							break;
					case 3:
							meziScore = 1000;
							break;
					case 4:
							meziScore = 2000;
							break;
					case 5:
							meziScore = 4000;
							break;
					case 6:
							meziScore = 8000;
							break;
			}
			scoreHrace = scoreHrace + meziScore;
	}

	if (kostka2Selected > 0 && kostka2Selected <= 2) {
			scoreHrace = scoreHrace;
			meziScore = 0;
	} else if (kostka2Selected > 2) {
			switch (kostka2Selected) {
					case 3:
							meziScore = 200;
							break;
					case 4:
							meziScore = 400;
							break;
					case 5:
							meziScore = 800;
							break;
					case 6:
							meziScore = 1600;
							break;
			}
			scoreHrace = scoreHrace + meziScore;
	}

	if (kostka3Selected > 0 && kostka3Selected <= 2) {
			scoreHrace = scoreHrace;
			meziScore = 0;
	} else if (kostka3Selected > 2) {
			switch (kostka3Selected) {
					case 3:
							meziScore = 300;
							break;
					case 4:
							meziScore = 600;
							break;
					case 5:
							meziScore = 1200;
							break;
					case 6:
							meziScore = 2400;
							break;
			}
			scoreHrace = scoreHrace + meziScore;
	}

	if (kostka4Selected > 0 && kostka4Selected <= 2) {
			scoreHrace = scoreHrace;
			meziScore = 0;
	} else if (kostka4Selected > 2) {
			switch (kostka4Selected) {
					case 3:
							meziScore = 400;
							break;
					case 4:
							meziScore = 800;
							break;
					case 5:
							meziScore = 1600;
							break;
					case 6:
							meziScore = 3200;
							break;
			}
			scoreHrace = scoreHrace + meziScore;
	}

	if (kostka5Selected > 0) {
			scoreHrace = scoreHrace;
			meziScore = 0;
			switch (kostka5Selected) {
					case 1:
							meziScore = 50;
							break;
					case 2:
							meziScore = 100;
							break;
					case 3:
							meziScore = 500;
							break;
					case 4:
							meziScore = 1000;
							break;
					case 5:
							meziScore = 2000;
							break;
					case 6:
							meziScore = 4000;
							break;
			}
			scoreHrace = scoreHrace + meziScore;
	}

	if (kostka6Selected > 0 && kostka6Selected <= 2) {
			scoreHrace = scoreHrace;
			meziScore = 0;
	} else if (kostka6Selected > 2) {
			switch (kostka6Selected) {
					case 3:
							meziScore = 600;
							break;
					case 4:
							meziScore = 1200;
							break;
					case 5:
							meziScore = 2400;
							break;
					case 6:
							meziScore = 4800;
							break;
			}
			scoreHrace = scoreHrace + meziScore;
	}

	if (
			(kostka2Selected > 0 && kostka2Selected < 3) ||
			(kostka3Selected > 0 && kostka3Selected < 3) ||
			(kostka4Selected > 0 && kostka4Selected < 3) ||
			(kostka6Selected > 0 && kostka6Selected < 3)
	) {
			scoreHrace = 0;
	}
	selectedScore.innerHTML = scoreHrace;
	console.log(scoreHrace);
}

//CHECKUJE SMULU
let smulaWindow = document.querySelector('.js-smula');

function resetPoctyKostek() {
	kostka1Selected = 0;
	kostka2Selected = 0;
	kostka3Selected = 0;
	kostka4Selected = 0;
	kostka5Selected = 0;
	kostka6Selected = 0;
	console.log(kostka1Selected, kostka2Selected, kostka3Selected, kostka4Selected, kostka5Selected, kostka6Selected);
}