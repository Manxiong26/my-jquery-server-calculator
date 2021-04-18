const express = require('express');
const app = express();
app.use(express.static('server/public') );
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true} ) );


let calcArray = [];

app.get('/calculator', function (req, res){
    console.log('get calc... ');
    res.send(calcArray);
})

app.post('/calculator', function (req, res){
    let calcData = req.body;
    calculation(calcData);
    res.sendStatus(201);
    
})
function calculation(calcData) {
    if( calcData.operator === 'addBtn'){
        calcData.answer = Number(calcData.firstNum) + Number(calcData.secondNum)
    } else if (calcData.operator === 'subBtn'){
        calcData.answer = Number(calcData.firstNum) - Number(calcData.secondNum)
    }else if (calcData.operator === 'multipyBtn'){
        calcData.answer = Number(calcData.firstNum) * Number(calcData.secondNum)
    } else if (calcData.operator === 'divideBtn'){
        calcData.answer = Number(calcData.firstNum) / Number(calcData.secondNum)
    }
    calcData.equation = (`${calcData.firstNum} ${calcData.operator} ${calcData.secondNum} = ${calcData.answer}`)
    calcArray.push(calcData)
}





const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);   
})