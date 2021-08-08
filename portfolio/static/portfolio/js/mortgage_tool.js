//
//
// NEXT STEPS:
//
///////////////////////////////////////////////////////////////////////////////


// ______________ //
//   FUNCTIONS    //
////////////////////

function toPercentage(num){
  /**
   * Receives an integer
   * Returns a string
   * Rounds to two decimal places and adds the % symbol
   */
  return String((num*100).toFixed(2))+'%';
}

function toCurrency(num){
  /**
   * Receives an integer
   * Returns string formated as USD currency
   */
  return "$"+String(num.toFixed(2));
}


function displayOutput(){
  /**
   *  Contains all calculations
   *  Gets called from the EventHandler attached to container
   *  EventHandler calls this function every time "input" occurs
   */

  // intermediate01  = current debt-to-income ratio
  var intermediate01 = input02/input01;
  var intermediate01HTML = document.getElementById("intermediate01");
  intermediate01HTML.innerHTML = `<h1>Intermediate 01 : current debt-to-income ratio: ${toPercentage(intermediate01)}`;

  // intermediate02 = calculated acceptable mortgage to income ratio (43% - current DTI)
  var intermediate02 = input03-intermediate01;
  var intermediate02HTML = document.getElementById("intermediate02");
  intermediate02HTML.innerHTML = `<h1>Intermediate 02 : calculated acceptable mortgage to income ratio: ${toPercentage(intermediate02)}`;

  // output = maximum affordable monthly mortgage payment (PIMI total)
  var output = intermediate02 * input01;
  var outputHTML = document.getElementById("outputHTML");
  outputHTML.innerHTML = `<h1>Output --- Maximum affordable mortgage: ${toCurrency(output)}</h1>`;

}

///////////////////////////////////////////////////////////////////////////////
// Table of Contents
//
// input01 = gross monthly income
// input02 = current monthly debt obligations
// input03 = maximum allowed debt to income ratio  src: https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-why-is-the-43-debt-to-income-ratio-important-en-1791/
//
// intermediate01  = current debt-to-income ratio (debt / gross income)
// intermediate02 = calculated acceptable mortgage to income ratio (43% - current DTI)
//
// output = maximum affordable monthly mortgage payment (PIMI total)
///////////////////////////////////////////////////////////////////////////////


// input01 = gross monthly income
var input01 = 5500;
var input01HTML = document.getElementById("input01");
// input01HTML.innerHTML = `<h1>Input 01 : gross monthly income: ${toCurrency(input01)}`;


var slider01 = document.getElementById("slider01");
input01HTML.innerHTML = `<h1>Input 01 : gross monthly income: ${toCurrency(parseInt(slider01.value))}`;
slider01.oninput = function(){
  input01HTML.innerHTML = `<h1>Input 01 : gross monthly income: ${toCurrency(parseInt(this.value))}`;
  input01 = parseInt(this.value);
  console.log(input01);
}


// input02 = current monthly debt obligations
var input02 = 200;
var input02HTML = document.getElementById("input02");
// input02HTML.innerHTML = `<h1>Input 02 : current monthly debt obligations: ${toCurrency(input02)}`;
var slider02 = document.getElementById("slider02");
input02HTML.innerHTML = `<h1>Input 02 : current monthly debt obligations: ${toCurrency(parseInt(slider02.value))}`;
slider02.oninput = function(){
  input02HTML.innerHTML = `<h1>Input 02 : current monthly debt obligations: ${toCurrency(parseInt(this.value))}`;
  input02 = parseInt(this.value);
  console.log("input02: " + String(input02));
}


// intermediate01  = current debt-to-income ratio
var intermediate01 = input02/input01;
var intermediate01HTML = document.getElementById("intermediate01");
intermediate01HTML.innerHTML = `<h1>Intermediate 01 : current debt-to-income ratio: ${toPercentage(intermediate01)}`;


// input03 = maximum allowed debt to income ratio  src: https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-why-is-the-43-debt-to-income-ratio-important-en-1791/
var input03 = 0.43;
var input03HTML = document.getElementById("input03");
input03HTML.innerHTML = `<h1>Input 03 : maximum allowed debt to income ratio: ${toPercentage(input03)}`;

// intermediate02 = calculated acceptable mortgage to income ratio (43% - current DTI)
var intermediate02 = input03-intermediate01;
var intermediate02HTML = document.getElementById("intermediate02");
intermediate02HTML.innerHTML = `<h1>Intermediate 02 : calculated acceptable mortgage to income ratio: ${toPercentage(intermediate02)}`;

// output = maximum affordable monthly mortgage payment (PIMI total)
var output = intermediate02 * input01;
var outputHTML = document.getElementById("outputHTML");
outputHTML.innerHTML = `<h1>Output --- Maximum affordable mortgage: ${toCurrency(output)}</h1>`;


// DEBUGGING
// console.log("Hello");
// console.log(intermediate01);
// console.log(intermediate01.toFixed(2));
// console.log(toPercentage(intermediate01));

// function displayOutput(){
//   // intermediate01  = current debt-to-income ratio
//   var intermediate01 = input02/input01;
//   var intermediate01HTML = document.getElementById("intermediate01");
//   intermediate01HTML.innerHTML = `<h1>Intermediate 01 : current debt-to-income ratio: ${toPercentage(intermediate01)}`;
//
//   // intermediate02 = calculated acceptable mortgage to income ratio (43% - current DTI)
//   var intermediate02 = input03-intermediate01;
//   var intermediate02HTML = document.getElementById("intermediate02");
//   intermediate02HTML.innerHTML = `<h1>Intermediate 02 : calculated acceptable mortgage to income ratio: ${toPercentage(intermediate02)}`;
//
//   // output = maximum affordable monthly mortgage payment (PIMI total)
//   var output = intermediate02 * input01;
//   var outputHTML = document.getElementById("outputHTML");
//   outputHTML.innerHTML = `<h1>Output --- Maximum affordable mortgage: ${toCurrency(output)}</h1>`;
//
// }

// EVENT LISTENER ON BODY (to update all the math on the page)
bodyHTML = document.getElementsByTagName("body")[0];
bodyHTML.addEventListener("input", displayOutput, false);
