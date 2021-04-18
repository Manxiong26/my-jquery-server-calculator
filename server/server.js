const express = require('express');
const app = express();
app.use(express.static('server/public') );
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true} ) );


let calcArray = [];// set an array called calcArray to an empty array

app.get('/calculator', function (req, res){
    console.log('get calc... ');
    res.send(calcArray);//get a route to send back out array to calculator 
});

app.post('/calculator', function (req, res){
    let calcData = req.body; // POST routr to get a data from the broswer
    calculation(calcData);
    res.sendStatus(201);
    
});

function calculation(calcData) {
    if( calcData.operator === '+'){//seeing if the operator is + and if it is do the equation below
        calcData.answer = Number(calcData.firstNum) + Number(calcData.secondNum)
    } else if (calcData.operator === '-'){//seeing if the operator is - and if so do the equation below
        calcData.answer = Number(calcData.firstNum) - Number(calcData.secondNum)
    }else if (calcData.operator === '*'){//seeing if the operator is * and if so do the equation below
        calcData.answer = Number(calcData.firstNum) * Number(calcData.secondNum)
    } else if (calcData.operator === '/'){//seeing if the operator is / and if so do the equation below 
        calcData.answer = Number(calcData.firstNum) / Number(calcData.secondNum)
    }
    calcData.equation = (`${calcData.firstNum} ${calcData.operator} ${calcData.secondNum} = ${calcData.answer}`)
    //display equation as above in the DOM
    calcArray.push(calcData)
    //push calcData to calcArray
}

//listen in PORT 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);   
})