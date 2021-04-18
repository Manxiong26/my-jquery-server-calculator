console.log('hi js');

$(document).ready(onReady)

let operation = '';

function onReady(){
    //console.log('hi jQ');
    $(`#equal`).on('click', calcInput); 
    //when click on the equal button use the calcInput function
    $('.button').on('click', doMath); 
    // when click on any of the class button, button use the function doMath
    $(`#clear`).on('click', clear); 
    // when click on the C button use the clear function 
    getCalc(); 
    //calling the getCalc function to run it when the page loads
}

function calcInput(){
    let input = {
    // set input to an empty object to receive postCalc cata
    firstNum: $(`#input-one`).val(),
    //firstNum to equal the value of input-one 
    secondNum: $(`#input-two`).val(),
    //secondNum to equal the value of input-two
   // console.log('operation', operation);
    operator: operation
    };
    //set input.operator to equal the operation variable to I set as an empty string
    console.log('operation is sent to server', input.operator);
    console.log('result to formulate calc', input);
    postCalc(input);
    //using postCalc to pull input in when input is put in 
    $(`#input-one`).val('');
    //set input-one's value to empty after use
    $(`#input-two`).val('');
    //set input-one's value to empty after use
}

function doMath(){
    operation = $(this).attr('val');
    //setting operation to work when this attribute 'val' is pressed 
}

function postCalc(input) {
    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: input
    })
    .then(function (response) {
        console.log('Response from server', response);  
        getCalc();
        //changed data on the server, go get all the updates
    })
    .catch(function( error){
        console.log('Error', error);
        alert('Something bad HAPPENED. Try again later');
        
    });
}

function getCalc(){
    //ajax methos returns back a Promise
    $.ajax({
        method: 'GET',
        url: '/calculator'
    })
    .then(function( response) {
        console.log('Got message', response);
        //the response is the array from the server 
        //pass the array into our render method to display
        render(response);

    })
    .catch(function (error){
        console.log('Error from server', error); 
        alert('Something bad HAPPENED. Try again later');
    });
}
// render is to display calculation array 
function render(calcArray){
    $(`#history-list`).empty();// set the list to empty first 
    for(equation of calcArray){ //loop over the calcArray and append to DOM
        $(`#results`).empty();
        $(`#results`).append(`${equation.answer}`);//appending the equation.answer on the results tag
        $(`#history-list`).append(`
        <li>${equation.firstNum}${equation.operator}${equation.secondNum} = ${equation.answer}</li>
        `)
    }
}
// clear input when this function runs
function clear(){
    $(`#input-one`).val('');
    $(`#input-two`).val('');
    operation = "";
}