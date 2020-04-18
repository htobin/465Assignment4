//Code created by Hoku Tobin

function main() {

  //Variables on the webpage
  var monthly = parseInt($('#monthly').val());
  var initialLoanAmount = parseInt($('#initial').val());
  var interestPercent = parseInt($('#interest').val());
  
  //take the yearly interest rate and divide by 12 as payments will be monthly
  var interestDecimal = (interestPercent / 100)/12;

  //create data array to store all values
  var data = [];

  //intialize balance for the first month date and the current balance of the first month
  var lastMonthsBalance = initialLoanAmount;
  var currentBalance = initialLoanAmount;
  var lastDate = new Date(Date.now());


  //check if the monthly payment is large enough
  var interest = initialLoanAmount * interestDecimal;
  if( monthly <= interest)
  {
    console.log(monthly);
    console.log(interest);
    alert('Monthly payment must be higher. Monthly interest is more than monthly payments.');
    return;
  }




  //while loop to go through all values until the balance is
  while (currentBalance > 0) {

    //calculate the current balance
    currentBalance = (lastMonthsBalance * (1 +interestDecimal)) - monthly;

    //create the data to be entered
    var dateParse = new Date(lastDate.setMonth(lastDate.getMonth() + 1));

    //data for d3 array and push to data array
    var d3Data = { date: dateParse, value: currentBalance };
    data.push(d3Data);

    //increment date and balance
    lastDate = dateParse;
    lastMonthsBalance = currentBalance;
  }

  return data;
}


//Calculate button refreshes the SVG  and creates the graph
$('#calculate').on('click', function(){

  clickToRefresh();

})
