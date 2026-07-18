// simple calculator
let a=6,b=3,operator="*",result;
// if(operator === -){
//   result=a-b;  
// } 
// else if(operator===+){
    
// }

switch (operator) {
    case "-":
        result=a-b;
        console.log(`a${operator}b = ${result}`); 
        break;
        case "*":
        result=a*b; 
        console.log(`a${operator}b = ${result}`);
        break;
        case "+":
        result=a+b; 
        console.log(`a${operator}b = ${result}`);
        break;
        case "/":
        result=a/b; 
        console.log(`a${operator}b = ${result}`);
        break;
    default:
        console.log('please try again');
        break;
}