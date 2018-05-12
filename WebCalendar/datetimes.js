/*   Name: James LoForti 
	 UVID: 10675175
     Course: Web Programming 1
     Instructor: Dr. Brian Durney
     Date: 12/11/2015
     Final Project

	 I declare that the following code was written by me unless otherwise stated. 
	 I understand that copying source code from any other source constitutes cheating, 
	 and that I will receive a zero on this project if I am found in violation of this policy.
     ***************************************************************************  */
	 
	 //Declare & initialize variables
	 var totalPossibleDays = 42;
	 var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	 var monthOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	 var dayHeadersArray = [[], [], [], [], [], []];
	 var monthsDateTimeObjects = [];
	 var numRows = 6;
	 var numCols = 6;
	 var oneWeek = 6;
	 var dateTime = undefined;
	 
	 //The calculateMonthDT function
	 //Purpose: To calculate and get all DateTimes associated with the given month
	 //Parameters: A DateTime object represented as _dateTime
	 //Return: None
	 function calculateMonthDT(_dateTime)
	 {
		 //Save given _dateTime as global dateTime
		 dateTime = _dateTime;
		 
		 //Get month/year, and display in main header w/ UVU wolverine head images
		 document.getElementById("main_calendar_header").innerHTML = '<img id="left_willy" src="Images/wolverine_head.png" alt="Wolverine Head" style="width:100px;height:90px;"></img>'
				+ '<img id="right_willy" src="Images/wolverine_head.png" alt="Wolverine Head" style="width:100px;height:90px;"></img>'
				+ getCurrentMonthYear(dateTime);
		 
		 //Get total number of days in month
		 var daysInMonth = getDaysInMonth(dateTime.getMonth(), dateTime.getFullYear());
		 
		 //Get array of day numbers
		 var dayNumbersArray = getDayNumbersArray(dateTime, daysInMonth);
		 
		 //Fill dayNumberSpans
		 displayDayNumberSpans(dayNumbersArray);
		 
		 //Create and fill array of months DateTime objects
		 fillMonthsDTObjectsArray(dateTime, daysInMonth);
		 
		 //Create and fill array of day headers
		 fillDayHeadersArray();
		 
		 //If the current month does NOT already have a month object
		 if (getCurrentMonthData() == undefined)
		 {
			 //Create new month object
			 var thisMonth = new Month(monthToString(dateTime.getMonth()), dateTime.getFullYear());
		 } // end if
	 } // end function flowOfControl()
	 
	 //The getDateTime function
	 //Purpose: To return the global dateTime value
	 //Parameters: None
	 //Return: dateTime in the form of a DateTime object
	 function getDateTime()
	 {
		 return dateTime;
	 } // end function getDateTime()
	 
	 //The getCurrentMonthYear function
	 //Purpose: To return the current month and year as one string
	 //Parameters: A DateTime object represented as _dateTime
	 //Return: currMonth and currYear in the form of a string
	 function getCurrentMonthYear(_dateTime)
	 {		 
		 //Get the current month, send to string, and save
		 var currMonth = monthToString(_dateTime.getMonth());
		 
		 //Get current year and save
		 var currYear = _dateTime.getFullYear();
		 
		 //Return current month and year
		 return currMonth + " " + currYear;
	 } // end function getCurrentMonthYear()
	 
	 //The monthToString function
	 //Purpose: To convert the month number to the month string
	 //Parameters: An int represented as _month
	 //Return: Month in the form of a string
	 //Pre-Conditions: _monthNum must be a value between 0-11
	 function monthToString(_month)
	 {		 
		 return monthOfYear[_month];
	 } // end function monthToString()
	 
	 //The getDayOfWeek function
	 //Purpose: To return the day of week for the given date
	 //Parameters: A DateTime object represented as _date
	 //Return: The dayOfWeek in the form of a string
	 function getDayOfWeek(_date)
	 {
		 return dayOfWeek[_date.getDay()];
	 } // end function getDayOfWeek()
	 
	 //The getDaysInMonth function
	 //Purpose: To return the total number of days in the given month
	 //Parameters: (2) integers represented by _monthNum and _year
	 //Return: totalNumDays in the form of a number
	 //Pre-Conditions: _monthNum must be a value between 0-11
	 function getDaysInMonth(_monthNum, _year)
	 {
		 //Declare helpers
		 var totalNumDays;
		 
		 //If month is: April, June, September, November
		 if (_monthNum == 3 || _monthNum == 5 || _monthNum == 8 || _monthNum == 10)
			 totalNumDays = 30;
		 if (_monthNum == 1 && _year%4 != 0) // if month is february and NOT a leap year
			 totalNumDays = 28;
		 if (_monthNum == 1 && _year%4 == 0) // if month is february and a leap year
			 totalNumDays = 29;
		 if (_monthNum != 3 && _monthNum != 5 && _monthNum != 8 && _monthNum != 10 && _monthNum != 1) // all other months
			 totalNumDays = 31;
		 
		 return totalNumDays;
		 
	 } // end function getDaysInMonth()
	 
	 //The getDayNumbersArray function
	 //Purpose: To create an array of numbers to fill the calendar
	 //Parameters: The current months DateTime object and the total number of days in the current month
	 //Return: Day Numbers in the form of an integer array
	 function getDayNumbersArray(_currentDateTime, _endOfMonth)
	 {
		 //Declare helpers
		 var array = [];
		 var count = 0;
		 var prevMonthCarryOver = 0;
		 
		 //Get total number of days in previous month
		 var daysInPrevMonth = getDaysInMonth(_currentDateTime.getMonth() - 1, _currentDateTime.getFullYear());
		 
		 //Get the dayOfWeek of the first day of the current month
		 var currentFirstDay = new Date(_currentDateTime.getFullYear(), _currentDateTime.getMonth(), 01);
		 
		 var currentFirstDayOfWeek = currentFirstDay.getDay();
		 
		 //If first day of month is on a Sunday
		 if (currentFirstDayOfWeek == 0)
		 {
			 prevMonthCarryOver = daysInPrevMonth - oneWeek;
		 } // end if
		 else // first day of month is NOT a Sunday
		 {
			 //Calculate the difference between the days in previous months, and the start day of this month // 
			 prevMonthCarryOver = daysInPrevMonth - (currentFirstDayOfWeek - 1); // offset of 1 to account for 0 based days
		 } // else
		 
		 //Fill PREVIOUS months carry over dates
		 for (var i = prevMonthCarryOver; i <= daysInPrevMonth; i++)
		 {
			 array[count] = i;
			 count++;
		 } // end for
		 
		 //Fill THIS months dates
		 for (var j = 1; j <= _endOfMonth; j++)
		 {
			 array[count] = j;
			 count++;
		 } // end for
		 
		 //Calculate the difference between the total number of days possible and the number of days already used
		 var nextMonthsPreview = totalPossibleDays - count;
		 
		 //Fill NEXT months preview dates
		 for (var k = 1; k <= nextMonthsPreview; k++)
		 {
			 array[count] = k;
			 count++;
		 } // end for
		 
		 return array;
	 } // end function getDayNumbersArray()
	 
	 //The displayDayNumberSpans function
	 //Purpose: To fill the dayNumberSpans
	 //Parameters: An array of integers represented as _dayNumbersArray
	 //Return: None
	 function displayDayNumberSpans(_dayNumbersArray)
	 {
		 //Get all dayNumberSpans
		 var dayNumberSpans = document.getElementsByClassName("dayNumberSpans");
		 
		 //Fill the spans with numbers from the array
		 for (var i = 0; i <= totalPossibleDays - 1; i++)
		 {
			 dayNumberSpans[i].innerHTML = _dayNumbersArray[i];
		 } // end for
	 } // end function displayDayNumberSpans()

	 //The fillMonthsDTObjectsArray function
	 //Purpose: To fill an array of headers for each day
	 //Parameters: The current months DateTime object and the total number of days in the current month
	 //Return: None
	 function fillMonthsDTObjectsArray(_currentDateTime, _endOfMonth)
	 {
		 //Declare helpers
		 var count = 0;
		 var prevMonthCarryOver = 0;
		 
		 //Get total number of days in previous month
		 var daysInPrevMonth = getDaysInMonth(_currentDateTime.getMonth() - 1, _currentDateTime.getFullYear());
		 
		 //Get the dayOfWeek of the first day of the current month
		 var currentFirstDay = new Date(_currentDateTime.getFullYear(),_currentDateTime.getMonth(),01).getDay();
		 
		 //If first day of month is on a Sunday
		 if (currentFirstDay == 0)
		 {
			 prevMonthCarryOver = daysInPrevMonth - oneWeek;
		 } // end if
		 else // first day of month is NOT a Sunday
		 {
			 //Calculate the difference between the days in previous months, and the start day of this month
			 prevMonthCarryOver = daysInPrevMonth - currentFirstDay + 1; // offset of 1 to account for 0 based days
		 } // end else
		 
		 //Fill PREVIOUS months carry over dates
		 for (var i = prevMonthCarryOver; i <= daysInPrevMonth; i++)
		 {
			 //Create DateTime Object
			 monthsDateTimeObjects[count] = new Date(_currentDateTime.getFullYear(), _currentDateTime.getMonth() - 1, i); // year, month, day
				 
			 count++;
		 } // end for
		 
		 //Fill THIS months dates
		 for (var j = 1; j <= _endOfMonth; j++)
		 {
			//Create DateTime Object
			 monthsDateTimeObjects[count] = new Date(_currentDateTime.getFullYear(), _currentDateTime.getMonth(), j); // year, month, day
			 
			 count++;
		 } // end for
		 
		 //Calculate the difference between the total number of days possible and the number of days already used
		 var nextMonthsPreview = totalPossibleDays - count; //_currentDateTime.getDay()
		 
		 //Fill NEXT months preview dates
		 for (var k = 1; k <= nextMonthsPreview; k++)
		 { 
			 //Create DateTime Object
			 monthsDateTimeObjects[count] = new Date(_currentDateTime.getFullYear(), _currentDateTime.getMonth() + 1, k); // year, month, day
			 
			 count++;
		 } // end for
	 } // end function fillMonthsDTObjectsArray()
	 
	 //The fillDayHeadersArray function
	 //Purpose: To create the header for the given day, include: dayOfWeek, month, dayNumber
	 //Parameters: None
	 //Return: dayHeader in the form of a string
	 function fillDayHeadersArray()
	 {
		 //Declare helpers
		 var helper = "";
		 var dayCount = 0;
		 var firstRoundFlag = true;
		 
		 //Iterate through each row
		 for (var i = 0; i < numRows; i++)
		 {
			 //Don't adjust count first time through
			 if (firstRoundFlag === false)
			 {
				 dayCount = dayCount + 7; // increment dayCount by 7 to compensate for previous rows count
			 } // end if
			 
			 //Iterate through each column
			 for (var j = 0; j <= numCols; j++)
			 {	 
				 //Save day of week
				 helper = getDayOfWeek(monthsDateTimeObjects[dayCount + j]);
				 
				 //Save month name
				 helper += " " + monthToString(monthsDateTimeObjects[dayCount + j].getMonth());
				 
				 //Save day of month
				 helper += " " + monthsDateTimeObjects[dayCount + j].getDate();
				 
				 //Add to header array
				 dayHeadersArray[i][j] = helper;
				 
				 //Set flag for next round
				 firstRoundFlag = false;
			 } // end for
		 } // end for
	 } // end function fillDayHeadersArray()	
	 
	 //The getDayHeader function
	 //Purpose: To return the header for the given day
	 //Parameters: integers row and column represented as _row, _col
	 //Return: Header in the form of a string
	 function getDayHeader(_row, _col)
	 {
		 return dayHeadersArray[_row - 1][_col];
	 } // end function getDayHeader()
	 
	 
	 
	 
	 
	 
	 
	 