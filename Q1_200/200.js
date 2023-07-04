// TODO: Modify this function

const generateShortCode = (storeId, transactionId) => {
  // Logic goes here

  //This function will be used to make sure all the pieces of information have the same size
  //1 char for day and month, 2 chars for year and store ID, and 3 chars for the transaction ID
  const setMinSize = (str, size) => {
    while (str.length < size) {
      str = str.replace(/^/, "0"); //This replaces the beggining of a string with 0.
    }

    return str;
  };

  //Gets the current date
  const date = new Date();

  //Converts the day, month and year into base 36 numbers
  let day = date.getDate();
  day = parseInt(day).toString(36);

  let month = date.getMonth();
  month = parseInt(month).toString(36);

  let year = date.getYear().toString().slice(1, 3); //Only the last 2 digits of the year are being considered, as getYear returns the last 2 digits + 100.
  year = parseInt(year).toString(36);
  year = setMinSize(year, 2);

  //Converts the function arguments into base 36 numbers
  let base36StoreId = storeId.toString(36);
  base36StoreId = setMinSize(base36StoreId, 2);

  let base36TransactionId = transactionId.toString(36);
  base36TransactionId = setMinSize(base36TransactionId, 3);

  //Creates a shortcode formed by the concatenation of the arguments with the date, all in base 36
  let shortCode = base36TransactionId + base36StoreId + day + month + year;
  shortCode = shortCode.toUpperCase(); //For better reading the shortcode is then converted into upper case chars.

  return shortCode;
};

// TODO: Modify this function
const decodeShortCode = (shortCode) => {
  // Logic goes here

  //Here we get the shortcode and slice it in the parts that represent the data we need.
  //Then we convert this data back from base 36 to decimal values.
  let base36TransactionId = shortCode.slice(0, 3);
  base36TransactionId = parseInt(base36TransactionId, 36);

  let base36StoreId = shortCode.slice(3, 5);
  base36StoreId = parseInt(base36StoreId, 36);

  let day = shortCode.slice(5, 6);
  day = parseInt(day, 36);

  let month = shortCode.slice(6, 7);
  month = parseInt(month, 36);

  let year = shortCode.slice(7, 9);
  year = parseInt(year, 36);

  //Last we create a Date object that will hold the original shop date that's been extracted from the short code.
  const transactionDate = new Date(2000 + year, month, day); //As the year is made of only 2 digits, we have to add 2000 to make it a 4 digit year format.

  return {
    storeId: base36StoreId, // store id goes here,
    shopDate: transactionDate, // the date the customer shopped,
    transactionId: base36TransactionId, // transaction id goes here
  };
};

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {
  var storeIds = [175, 42, 0, 9];
  var transactionIds = [9675, 23, 123, 7];

  storeIds.forEach(function (storeId) {
    transactionIds.forEach(function (transactionId) {
      var shortCode = generateShortCode(storeId, transactionId);
      var decodeResult = decodeShortCode(shortCode);
      $("#test-results").append(
        "<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>"
      );
      AddTestResult("Length <= 9", shortCode.length <= 9);
      AddTestResult("Is String", typeof shortCode === "string");
      AddTestResult("Is Today", IsToday(decodeResult.shopDate));
      AddTestResult("StoreId", storeId === decodeResult.storeId);
      AddTestResult("TransId", transactionId === decodeResult.transactionId);
    });
  });
}

function IsToday(inputDate) {
  // Get today's date
  var todaysDate = new Date();
  // call setHours to take the time out of the comparison
  return inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0);
}

function AddTestResult(testName, testResult) {
  var div = $("#test-results").append(
    "<div class='" +
      (testResult ? "pass" : "fail") +
      "'><span class='tname'>- " +
      testName +
      "</span><span class='tresult'>" +
      testResult +
      "</span></div>"
  );
}
