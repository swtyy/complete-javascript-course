// Lecture: Function returning functions

console.log('Temp file is called');

function compute(){
    return function (a, b){
        return a + b;
    };
}

var result = compute();  //result will hold return of compute i.e add function
var x =  4;
var res = result(4, 5);
console.log(res);
console.log(result(2, 9));


(function (a, b) {
    console.log(a - b);
})(5, 5);

function game (){
    var score = Math.random() * 10;
    console.log(score >= 5);
}

game();

//IIFE:-
(function game (goodluck){
    var score = Math.random() * 10;
    console.log(score >= 5 - goodluck);
})
(5);  // invoked







