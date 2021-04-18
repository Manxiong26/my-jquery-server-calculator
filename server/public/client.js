console.log('hi js');

$(document).ready(onReady)

let operation = '';

function onReady(){
    console.log('hi jQ');
    $(`#equal`).on('click', calcInput);
    $('.button').on('click', doMath);
    $(`#clear`).on('click', clear);
    getCalc();
}

function calcInput(){
    let input = {};
    input.firstNum = $(`#input-one`).val();
    input.secondNum = $(`#input-two`).val();
    console.log('operation', operation);
    input.operator = operation;
    console.log('operation is sent to server', input.operator);
    console.log('result to formulate calc', input);
    postCalc(input);
    $(`#input-one`).val('');
    $(`#input-two`).val('');
}

function doMath(){
    operation = $(this).attr('val');
}

function postCalc(obj) {
    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: obj
    })
    .then(function (response) {
        console.log('Response from server', response);  
    })
    .catch(function( error){
        console.log('Error', error);
        alert('Something bad HAPPENED. Try again later');
        getCalc();
    })
}

function getCalc(){
    $.ajax({
        method: 'GET',
        url: '/calculator'
    })
    .then(function( response) {
        console.log('Got message', response);
        render(response);
        
    })
    .catch(function (error){
        console.log('Error from server', error); 
    })
}

function render(history){
    $(`#history-list`).empty();
    for(equation of history){
        $(`#results`).empty();
        $(`#results`).append(`${equation.answer}`);
        $(`#history-list`).append(`
        <li>${equation.firstNum}${equation.operator}${equation.secondNum} = ${equation.answer}</li>
        `)
    }
}

function clear(){
    $(`#input-one`).val('');
    $(`#input-two`).val('');
    operation = "";
}