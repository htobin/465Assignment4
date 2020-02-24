//Calculate each month of payments
//Current Month's balance
//If current month is not month 0
//Then current month's balance = last months balance + (last month's balance * interest rate) - (payment per month)

// var interest rate = submitted by user
// var monthly payment.

// function calculate(lastDate, lastMonthsBalance, balanceCheck) {
//
//   //for the calculation
//   var currentBalance = lastMonthsBalance + (lastMonthsBalance * 3.5) - (400);
//   balanceCheck = currentBalance;
//   var d3Data = { date: lastDate.setMonth(lastDate.getMonth() + 1), value: currentBalance };
//   return d3Data;
// }

function main() {

  //Variables on the webpage
  var monthly = parseInt($('#monthly').val());
  var initialLoanAmount = parseInt($('#initial').val());
  var interestPercent = parseInt($('#interest').val());
  var interestDecimal = interestPercent / 100;

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
    alert('Monthly payment must be higher. Monthly interest is more than monthly payments.');
    return;
  }




  //while loop to go through all value
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

function valueCheck(){
  var monthly = $('#monthly').val();
  var initialLoanAmount = $('#initial').val();
  if(monthly <= 0 || initialLoanAmount <= 0){
    return false;
  }
  return true;
}


$('#calculate').on('click', function(){

  clickToRefresh();

})