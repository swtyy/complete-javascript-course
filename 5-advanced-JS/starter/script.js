//Function Constructor  //annonymus function (fn. w/o name)

var john = {
    name : 'JOhn',
    job : 'student'
};
console.log(john.name + ' works as a ' + john.job);
1
var Person = function (name, job, yearOfBirth){
    this.name = name;
    this.job = job;
    this.yearOfBirth = yearOfBirth;
    //console.log(this.yearOfBirth);
    // this.calculateAge = function init (){
    //     console.log(2020 - this.yearOfBirth);
    // }
}

Person.prototype.calculateAge = function init (){
    console.log(2020 - this.yearOfBirth);
}

Person.prototype.lastName = 'Singh';

var rohit = new Person('Rohit', 'Student', 1998);
console.log(rohit.name + ' works as a ' + rohit.job);

var subhash = new Person('Subhash', 'Employee', 1988);
console.log(subhash.name + ' works as a ' + subhash.job);
subhash.calculateAge(); 


var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalculator (arr, fn) {
    var outArray = [];
    for(var i = 0; i < arr.length; i++){
        var result = fn(arr[i]);
        outArray.push(result);
    }
return outArray;
}

var calAge2020 = function( year ){
    return 2020 - year;
}

var calAge2000 = function( year ){
    return 2000 - year;
}

var result = arrayCalculator (years, calAge2000);

console.log(result);

































