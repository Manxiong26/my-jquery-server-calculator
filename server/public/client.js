console.log('hi js');

$(document).ready(onReady)

let operation = '';

function onReady(){
    console.log('hi jQ');
}

function calcInput(){
    let input = {};
    input.fristNum = $(`#input-one`).val();
    input.secondNum = $(`#input-two`).val();
    console.log('operation', operation);
    input.operator = operation;
    console.log('operation is sent to server', input.operator);
    console.log('result to formulate calc', input);
      
}

function doMath(){
    operation = $(this).attr('value');
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

