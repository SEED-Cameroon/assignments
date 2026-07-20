// reverse a string
let text='hello';
let i=text.length;
let reversed="";
for (let n = 0; n <= i; n++) {
    reversed=reversed+(text[i-1]);
    i-=1
}
console.log(`${reversed}`);