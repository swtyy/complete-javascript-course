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
        addButton: '.add__btn',
        incomeList: '.income__list',
        expensesList: '.expenses__list',
        incomeClass: '.budget__income--value',
        expenseClass: '.budget__expenses--value',
        budgetClass: '.budget__value'
    }
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDesc).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)  // converetd string value to float
            }
        },
        getDOMstrings: DOMstrings,
        addListItem: function(obj, type){
            var html, newHtml;
            // Create HTML string with placeholder text
            if (type === 'inc'){
                html = '<div class="item clearfix" id="expense-%ID%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div>    <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }else if (type == 'exp') {
                html = '<div class="item clearfix" id="expense-%ID%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>';
            }

            //Replace placeholder text with some actual data
            newHtml = html.replace('%ID%' , obj.id)
            newHtml = newHtml.replace('%description%' , obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            console.log(newHtml);

            //Insert HTML into DOM
            if(type === 'inc'){
                document.querySelector(DOMstrings.incomeList).insertAdjacentHTML('afterbegin', newHtml);
            }else {
                document.querySelector(DOMstrings.expensesList).insertAdjacentHTML('afterbegin', newHtml);
            }
        },

        // TO Reset Input
        resetInput: function(){
            document.querySelector(DOMstrings.inputDesc).value = '';
            document.querySelector(DOMstrings.inputValue).value = '';

            //To set focus on description
            document.querySelector(DOMstrings.inputDesc).focus();
        },
        // update Budget
        updateBudget: function(totalInc, totalExp, totalBudget){
            console.log('Invoked update budget');
            document.querySelector(DOMstrings.incomeClass).textContent = totalInc;
            document.querySelector(DOMstrings.expenseClass).textContent = totalExp;
            document.querySelector(DOMstrings.budgetClass).textContent = totalBudget;

        }
    }

})();

var dataController = (function(){
    //some code
    var Incomes = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Expenses = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
// DAta structure for holding INcome and Expense
    var data = {
        allItem : {
            exp: [],
            inc: []
        },
        totals : {
            exp: 0,
            inc: 0
        },
        budget: 0
    };
    return {
        addItem : function(type, desc, value){
            var newItem, ID;
            
            //ID = 0;
            // Create new ID
            if(data.allItem[type].length === 0){
                ID = 1;
            }else{
                ID = data.allItem[type][data.allItem[type].length -1 ].id + 1;
            }

            // Create new Item based on 'inc' r 'exp' type
            if(type === 'exp'){
                newItem = new Expenses(ID, desc, value);
            }else{
                newItem = new Incomes(ID, desc, value);
            }

            // Push it into our database structur
            data.allItem[type].push(newItem);

            // Return the new element
            return newItem;
        },

        calculateBudget: function(){

            // Calculate total Income and Expenses
            var totalExpenses = 0, totalIncome = 0;
            data.allItem.exp.forEach(function(item, index) {
                console.log(item + " " + index);
                totalExpenses = totalExpenses + item.value;
            });
            data.totals.exp = totalExpenses;

            data.allItem.inc.forEach(function(item, index) {
                console.log(item + " " + index);
                totalIncome = totalIncome + item.value;
            });
            data.totals.inc = totalIncome;

            //CAlculate Budget
            data.budget = totalIncome - totalExpenses; 
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },

        debug: function() {
            console.info(data);
        }
    }

})();

var controller = (function(uiCtrl, dataCtrl){  //parameters
    var setUpEventListner = function (){
        var DOMstrings = uiCtrl.getDOMstrings;
        document.querySelector(DOMstrings.addButton).addEventListener('click', ctrlAddItem);//function will execute asa we click or hit butto
            //console.log('Submit button is clicked');
    
        document.addEventListener('keypress', function(event){
            //console.log(event);
            if(event.keyCode === 13){
                ctrlAddItem();
            }
      
        });
    }

    var updateBudget = function() {

        // 1.CAlculate budget
        dataCtrl.calculateBudget();

        //Return the budget
        var budgetObj = dataCtrl.getBudget();

        // 5. Dispalya the budget on the UI
        
        uiCtrl.updateBudget(budgetObj.totalInc, budgetObj.totalExp, budgetObj.budget);

    };

    var ctrlAddItem = function(){
    
        // 1. Get input
        var inputObject = uiCtrl.getInput();

        if(inputObject.description !== "" && !isNaN(inputObject.value)){
            // 2. Add this item in budget/data controller
            var item = dataCtrl.addItem(inputObject.type, inputObject.description, inputObject.value);

            // 3.Display item to UI
            uiCtrl.addListItem(item, inputObject.type);

            // 4.Clear UI fields
            uiCtrl.resetInput();

            //Calculate and Update the budget
            updateBudget();
        }
    };

    return {
        init : function(){
            console.log('Application started');
            setUpEventListner();
            uiCtrl.updateBudget("  ", " ", " ");
        }
    }
    
})(uiController, dataController);  // arguments


controller.init();
