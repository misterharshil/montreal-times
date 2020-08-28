var count = document.getElementsByClassName('counter')[0];
var ball = document.getElementsByClassName('ball')[0];
var buddy = document.getElementsByClassName('counter')[1];
var follow = document.getElementsByClassName('boxhearth')[0];
var hearth = document.getElementsByClassName('counter')[2];
follow.addEventListener('click',followFunc,false);
var plus1 = 0;
var plus2 = 0;
var plus3 = 0;
var views =124360;
var buddyMax =120;
var hearthMax =9210;
var counter = 1;
var counterBuddy = 20;
var counterHearth = 1;
var viewsFunc = function(){
    clearInterval(viewsinterval);
	if(plus1 > views - views / 8){
    counter += 2;
	}
	plus1 += 200;
	if(plus1 <= views){
	count.innerHTML = plus1;
	}
    viewsinterval = setInterval(viewsFunc, counter);
}
var viewsinterval = setInterval(viewsFunc, counter);

var buddyFunc = function(){
    clearInterval(buddyinterval);
	if(plus2 > buddyMax - buddyMax / 8){
    counterBuddy += 60;
	}
	plus2 += 1;
	if(plus2 <= buddyMax){
	buddy.innerHTML = plus2;
	}
    buddyinterval = setInterval(buddyFunc, counterBuddy);
}
var buddyinterval = setInterval(buddyFunc, counterBuddy);

var hearthFunc = function(){
    clearInterval(hearthinterval);
	if(plus3 > hearthMax - hearthMax / 20){
    counterHearth += 2;
	}
		plus3 += 15;
	if(plus3 <= hearthMax){
	hearth.innerHTML = plus3;
	}
    hearthinterval = setInterval(hearthFunc, counterHearth);
}
var hearthinterval = setInterval(hearthFunc, counterHearth);
function followFunc(){
	ball.style.transform="scale(15,15)";
	document.getElementsByClassName('icon-heart')[0].style.fill="#FFF";
	hearth.innerHTML = 9211;
	}