// Implementing Encapsulation using IIFE
var xyz = (function (a){
    console.log(a);
    var mulBy2 = function (b){
        console.log(2*b);
        console.log (mulBy3(b));
    }
    var mulBy3 = function (l){
        console.log (3*a);
    }
    return {
        doubleFun: mulBy2
    }
})(5);

//// 3 IIFE bana ke de mere ko

var uiController = (function(){
    //some code
    var DOMstrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        addButton: '.add__btn'
    }
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDesc).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        getDOMstrings: DOMstrings
        
    }

})();

var dataController = (function(){
    //some code

})();

var controller = (function(uiCtrl, dataCtrl){  //parameters
    var ctrlAddItem = function(){
    
        // 1. Get input
        var inputObject = uiCtrl.getInput();
        console.log(inputObject.type);
        console.log(inputObject.description);
        console.log(inputObject.value);
        // 2. Add this item in budget/data controller

        // 3.Display item to UI

        //4. CAlculate budget

        // 5. Dispalya budget to UI
            console.log('working');
    }

    //some code
    var DOMstrings = uiCtrl.getDOMstrings;
    document.querySelector(DOMstrings.addButton).addEventListener('click', ctrlAddItem);//function will execute asa we click or hit butto
        //console.log('Submit button is clicked');

    document.addEventListener('keypress', function(event){
        //console.log(event);
        if(event.keyCode === 13){
            ctrlAddItem();
        }
  
    });
    
})(uiController, dataController);  // arguments