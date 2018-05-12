  /* Name: James LoForti 
	 UVID: 10675175
     Course: Web Programming 1
     Instructor: Dr. Brian Durney
     Date: 12/11/2015
     Final Project

	 I declare that the following code was written by me unless otherwise stated. 
	 I understand that copying source code from any other source constitutes cheating, 
	 and that I will receive a zero on this project if I am found in violation of this policy.
     ***************************************************************************  */
	 
	 //Container for all months' data
	 var allMonths = [];
	 
	 //Container to hold employee objects
	 var employees = []; 
	 
	 //The getLocalStorage function
	 //Purpose: To get previous calendarData from local storage and save it as current allMonths array
	 //Parameters: None
	 //Return: None
	 function getLocalStorage()
	 {
		 //Get the data from local storage
		 var localData = localStorage.getItem("calendarData");
		 
		 //Error check for Chrome
		 if (localData != "__" && localData != null)
		 {
			 //Convert the string back to the primary data structure
			 var convertedAllMonths = stringToArray(localData);
			 
			 //Save converted array as current allMonths array
			 allMonths = convertedAllMonths;
		 } // end if
	 } // end function getLocalStorage()
	 
	 //The stringToArray function
	 //Purpose: To split the string at specific chars throughout, and rebuild allMonths array
	 //Parameters: A string represented as _localData
	 //Return: completedArray in the form of an array
	 function stringToArray(_localData)
	 {
		 //Declare variables:
		 var dataMonthYearArray = [];
		 var dataString = "";
		 var daysArray = "";
		 var taskObjectArray = []
		 var daysOfTasksArray = [];
		 var monthsArray = [];
		 var yearsArray = [];
		 var taskCounter = 0;
		 var monthsDataArray = [];
		 var completedArray = [];
		 
		 //Split 3 main sections (data, month, year)
		 dataMonthYearArray = _localData.split("_");
		 
		 //Split data at days
		 daysArray = dataMonthYearArray[0].split("%");
		 
		 //Split monthNames and save
		 monthsArray = dataMonthYearArray[1].split(",");
		 
		 //Split years and save
		 yearsArray = dataMonthYearArray[2].split(","); 
		 
		 //For each day
		 for (var i = 0; i < daysArray.length; i++)
		 {
			 //If end of a month has been reached
			 if ((i / 42) % 1 == 0 && i != 0)
			 {
				 //Add completed month of tasks to monthsDataArray
				 monthsDataArray.push(daysOfTasksArray);
				 
				 //Reset daysOfTasksArray
				 daysOfTasksArray = [];
				 daysOfTasksArray.length = 0;
			 } // end if
			 
			 //Split day at tasks
			 var tasksArray = daysArray[i].split("*");
			 
			 //For each task in this day
			 for (var k = 0, length = tasksArray.length; k < length; k++)
			 {
				 //If no tasks for current day
				 if (tasksArray[0] == "none")
				 {					 
					 break;
				 } // end if
				 else
				 {
					 //Split task at data members
					 var taskDataArray = tasksArray[k].split("^");
				 
					 //Ensure data Exists
					 if (taskDataArray[0] != "")
					 {
						 //Save all task data members
						 var taskEmp = taskDataArray[0];
						 var taskTitle = taskDataArray[1];
						 var taskPrec = taskDataArray[2];
						 var taskETC = taskDataArray[3];
						 var taskInstr = taskDataArray[4];
					 
						 //Create Task object and add to array
						 taskObjectArray.push(new Task(taskEmp, taskTitle, taskPrec, taskETC, taskInstr));
					 } // end if
				 } // end else
			 } // end for
			 
			 //Add completed day of tasks to array
			 daysOfTasksArray.push(taskObjectArray);
			 
			 //Reset taskObjectArray
			 taskObjectArray = [];
			 taskObjectArray.length = 0;
		 } // end for
		 
		 //Iterate through each month
		 for (var s = 0; s < monthsArray.length; s++)
		 {
			 //Initialize helpers
			 var tempMonthsDataArray = [[], [], [], [], [], []];
			 var weekCount = 0
			 var dayCount = 0;
				 
			 //Iterate through days tasks array for current month
			 for (var d = 0; d < monthsDataArray[s].length; d++)
			 {
				 //If end of inner-most array has been reached
				 if (dayCount == 7)
				 {
					 dayCount = 0; // reset dayCount
					 weekCount++; // increment weekCount
				 } // end if
				 
				 //Push array of tasks into the new data structure at the specified "day"
				 tempMonthsDataArray[weekCount].push(monthsDataArray[s][d]);
				 
				 //Increment dayCount
				 dayCount++;
			 } // end for
			 
			 //Create month object
			 var tempMonth = new Month(monthsArray[s], yearsArray[s], tempMonthsDataArray);
			 
			 //Save month object to completedArray
			 completedArray.push(tempMonth);
		 } // end for
		 
		 return completedArray;
	 } // end function stringToArray()
	 
	 //The saveDataToLocalStorage function
	 //Purpose: To save the allMonths array to local storage
	 //Parameters: None
	 //Return: None
	 function saveDataToLocalStorage()
	 {
		 //Convert allMonths array to string
		 var allMonthsString = arrayToString(allMonths);
		 
		 //Save allMonths array to local storage
		 localStorage.setItem("calendarData", allMonthsString);
	 } // end function saveDataToLocalStorage()
	 
	 //The arrayToString function
	 //Purpose: To take the allMonths array and turn it into one lone string
	 //Parameters: An array represented as _allMonths
	 //Return: completedString in the form of a string
	 function arrayToString(_allMonths)
	 {
		 //Declare variables:
		 var dataArray = [];
		 var monthNameArray = [];
		 var monthOfTasksString = "";
		 var yearArray = [];
		 var monthNameString = "";
		 var yearString = "";
		 var completedString = "";
		 
		 //Seperate all the data arrays, month names, and years
		 for (var i = 0, length = _allMonths.length; i < length; i++)
		 {
			 dataArray[i] = _allMonths[i].getData();
			 monthNameArray[i] = _allMonths[i].getMonthName();
			 yearArray[i] = _allMonths[i].getYear();
		 } // end for
		 
		 //For each months' data
		 for (var k = 0; k < dataArray.length; k++)
		 {
			 //For each week
			 for (var m = 0 ; m < 6; m++)
			 {
				 //For each day
				 for (var x = 0 ; x < 7; x++)
				 {
					 //Save task array for the iterated day
					 var tempTaskArray = dataArray[k][m][x];
					 
					 //Declare variable to hold days tasks as strings
					 var allTasksString = "";
					 
					 //For each task 
					 for (var z = 0, length = tempTaskArray.length; z < length; z++)
					 {
						 //Convert task to string
						 allTasksString += tempTaskArray[z].toSpecialString();
						 //Seperate each task with '*'
						 allTasksString += "*";
					 } // end for
					 
					 //If no tasks for this day
					 if (tempTaskArray.length == 0)
					 {
						 //Insert place holder
						 allTasksString += ("none" + "*");
					 } // end if
					 
					 //Concatenate each day of tasks, and seperate with '%'
					 monthOfTasksString += (allTasksString + "%");
				 } // end for
			 } // end for
		 } // end for
		 
		 //Convert monthName array to string
		 monthNameString = monthNameArray.toString();
		 
		 //Convert year array to string
		 yearString = yearArray.toString();
		 
		 //Concatenate strings
		 completedString = monthOfTasksString + "_" + monthNameString + "_" + yearString;
		 
		 return completedString;
	 } // end function arrayToString()
	 
	 //The clearDataFromLocalStorage function
	 //Purpose: To clear calendarData from local storage
	 //Parameters: None
	 //Return: None
	 function clearDataFromLocalStorage()
	 {
		 //Indicate data was deleted, Play audio - laughing
		 document.getElementById("audioLaugh").play();
		 
		 //Remove calendarData from local storage
		 localStorage.removeItem("calendarData");
		 
		 //Clear allMonths array
		 allMonths = [];
		 
		 //Reset month DateTime
		 calculateMonthDT(new Date()); //currentMonth
		 
		 //Re-populate tasks
		 populateCalendarTasks(6, 6);
	 } // end function clearDataFromLocalStorage()
	 
	 //The Month Parameterized Constructor
	 //Purpose: To initialize a month data structure and add it to the allData array
	 //Parameters: Two strings _monthName and _year
	 //Return: None
 	 function Month(_monthName, _year, _data)
	 {
		 if (_data == undefined)
		 {
			 //Initialize 3D array for the given month
			 this.data = [[[], [], [], [], [], [],[]], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []], 
			 [[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []]];
		 }
		 else
		 {
			 this.data = _data;
		 }
		 this.monthName = _monthName;
		 this.year = _year;
		 allMonths[allMonths.length] = this; // add month to array
		 this.getMonthName = function(){
			 return this.monthName;
		 };
		 this.getYear = function(){
			 return this.year;
		 };
		 this.getData = function(){
			 return this.data;
		 };
	 } // end function Month()
	 
	 //The getCurrentMonthData function
	 //Purpose: To get and return the current month's data structure
	 //Parameters: None
	 //Return: data in the form of an array
 	 function getCurrentMonthData()
	 {
		 //Declare vars:
		 var data;
		 
		 //get current dateTime
		 var thisDT = getDateTime();
		 
		 //get thisDT month
		 var month = monthToString(thisDT.getMonth());
		 
		 //get thisDT year
		 var year = thisDT.getFullYear();
		 
		 //If months exists
		 if (allMonths.length > 0)
		 {
			 //Iterate through allMonths to find given month's data
			 for (var i = 0, length = allMonths.length; i < length; i++)
			 {
				 //If given month's data exists
				 if (allMonths[i].getMonthName() == month && allMonths[i].getYear() == year)
				 {
					 data = allMonths[i].getData(); // save it
				 } // end if
			 } // end for
		 } // end if
		 
		 return data;
	 } // end function getCurrentMonthData()
	 
	 //The Task Parameterized Constructor
	 //Purpose: To set the Task data members to the given values
	 //Parameters: An Employee object, and 4 strings
	 //Return: None
	 function Task(_employee, _title, _precedence, _etc, _instructions)
	 {
		 this.employee = _employee;
		 this.title = _title;
		 this.precedence = _precedence;
		 this.etc = _etc;
		 this.instructions = _instructions;
		 this.getEmployee = function(){
			 return this.employee;
		 };
		 this.getTitle = function(){
			 return "Title: " + this.title;
		 };
		 this.getPrecedence = function(){
			 return "Precedence: " + this.precedence;
		 };
		 this.getEtc = function(){
			 return "ETC: " + this.etc;
		 };
		 this.getInstructions = function(){
			 return "Instructions: " + this.instructions;
		 };
		 this.toSpecialString = function(){
			 return this.employee + "^" + this.title + "^" + this.precedence + "^" + this.etc + "^" + this.instructions;
		 };
	 } // end function Task()
	 
	 //The Employee Parameterized Constructor
	 //Purpose: To set the Employee data members to the given values
	 //Parameters: A name and id
	 //Return: None
	 function Employee(_name, _id)
	 {
		 this.name = _name;
		 this.id = _id;
		 employees[employees.length] = this;
		 this.getName = function(){
			 return this.name;
		 };
		 this.getId = function(){
			 return this.id;
		 };
	 } // end function Employee()
	 
	 //The addEmployee function
	 //Purpose: To create an employee object and add it to the array
	 //Parameters: The name and id of the employee represented as _name, _id
	 //Return: None
	 function addEmployee(_name, _id)
	 {
		  var myEmployee = new Employee(_name, _id);
	 } // end function addEmployee()
	 
	 //The deleteEmployee function
	 //Purpose: To remove the specified index from the employee array
	 //Parameters: An integer represented as _index
	 //Return: None
	 function deleteEmployee(_index)
	 {
		 //Clear the employee object
		 employees[_index] = undefined;
		 
		 //Clean up gaps in array
		 arrayCleaner(employees);
		 
		 //Decrement array length
		 employees.length = employees.length - 1;
	 } // end function deleteEmployee()
	 
	 //The getEmployees function
	 //Purpose: To return an array of employee objects
	 //Parameters: None
	 //Return: An array of employee objects
	 function getEmployees()
	 {
		 return employees;
	 } // end function getEmployees()
	 
	 //The addTask function
	 //Purpose: To add the given task to the specified 2D index
	 //Parameters: 2D index represented as _row/_col, and the given task
	 //Return: None
	 function addTask(_row, _col, _task)
	 {
		 //Get the current months data structure
		 var data = getCurrentMonthData();
		 
		 //Push the _task into the array at the specified 2D index
		 data[_row - 1][_col].push(_task); // offset by 1 to account for THeads
	 } // end function addTask()
	 
	 //The getTasks function
	 //Purpose: To get the taskArray at the specified 2D index
	 //Parameters: 2D index represented as _row/_col
	 //Return: An array of task objects
	 function getTasks(_row, _col)
	 {
		 //Get the current months data structure
		 var data = getCurrentMonthData();
		 
		 return data[_row - 1][_col]; // offset by 1 to account for THeads
	 } // end function getTasks()
	 
	 //The getDailyTaskTotal function
	 //Purpose: To return the length of the array at the given 2D index
	 //Parameters: The 2D index represented as _row/_col
	 //Return: The total number of tasks
	 function getDailyTaskTotal(_row, _col)
	 {
		 //Get the current months data structure
		 var data = getCurrentMonthData();
		 
		 //Get the array at the specified index
		 var day = data[_row - 1][_col]; // offset by 1 to account for THeads
		 //Get the arrays length
		 var dailyTaskTotal = day.length;
		 
		 return dailyTaskTotal;
	 } // end function getDailyTaskTotal()
	 
	 //The deleteTask function
	 //Purpose: To delete the specified task from the 2D index
	 //Parameters: A 3D index represented as _row, _col, _taskNum
	 //Return: None
	 function deleteTask(_row, _col, _taskNum)
	 {
		 //Get the current months data structure
		 var data = getCurrentMonthData();
		 
		 //Clear the given 3D index
		 delete data[_row - 1][_col][_taskNum];
		 
		 //Fill any gaps in the array
		 arrayCleaner(data[_row - 1][_col]);
		 
		 //Decrement length by 1
		 data[_row - 1][_col].length = data[_row - 1][_col].length - 1;
	 } // end function deleteTask()
	 
	 //The arrayCleaner function
	 //Purpose: To sort through an array and move around the indexes to fill any gapse
	 //Parameters: An array to clean
	 //Return: None
	 function arrayCleaner(_array)
	 {
		 //Declare vars
		 var count = 0;
		 
		 //Sort through array 
		 for (var i = 0, length = _array.length; i < length; i++)
		 {
			 for (var j = 0, length = _array.length; j < length; j++)
			 {
				 if (_array[j] == undefined) // if index needs to be filled
				 {
					 //Increment through array until next non-undefined index is found
					 while (_array[count + j] == undefined && count < 10) // max of 10 to prevent infinite loop
					 {
						 count++;
					 } // end while
					 
					 //Check to make sure max of 10 wasn't reached
					 if (_array[count + j] != undefined)
					 {
						 _array[j] = _array[count + j]; // copy new value to original index
						 _array[count + j] = undefined; // set new value to undefined
					 } // end if
				 } // end if
			 } // end for
		 } // end for
	 } // end function arrayCleaner()
	 
	 
	 
	 
	 
	 
	