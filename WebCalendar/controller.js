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
	 
	 //The controllerFlowOfControl function
	 //Purpose: To implement test cases to display the given state of the grid
	 //Parameters: Two integers represnted as _numRows, _numCols
	 //Return: None
	 function controllerFlowOfControl(_numRows, _numCols)
	 {		 
		 //TASK Test Cases
		 createTask("Jimmy", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 1, 3);
		 createTask("Gerika", "Clean Balls", "2", "60 minutes", "Run bowling balls through ball cleaner", 1, 3);
		 createTask("Miriam", "Coorinate Events", "3", "90 minutes", "Clean: on-top/underneath counters, inside drawers", 1, 3);
		 createTask("Whitney", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 1, 5);
		 createTask("Jimmy", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 2, 1);
		 createTask("Autumn", "Clean Balls", "2", "60 minutes", "Run bowling balls through ball cleaner", 2, 1);
		 createTask("Mitch", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 2, 2);
		 createTask("Gerika", "Clean Balls", "2", "60 minutes", "Run bowling balls through ball cleaner", 2, 2);
		 createTask("Miriam", "Coorinate Events", "3", "90 minutes", "Clean: on-top/underneath counters, inside drawers", 2, 2);
		 createTask("Whitney", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 2, 3);
		 createTask("Miriam", "Clean Balls", "2", "60 minutes", "Run bowling balls through ball cleaner", 2, 3);
		 createTask("Mitch", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 2, 5);
		 createTask("Whitney", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 2, 6);
		 createTask("Jimmy", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 3, 1);
		 createTask("Autumn", "Clean Balls", "2", "60 minutes", "Run bowling balls through ball cleaner", 3, 1);
		 createTask("Mitch", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 3, 2);
		 createTask("Whitney", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 3, 4);
		 createTask("Jimmy", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 3, 5);
		 createTask("Miriam", "Clean Balls", "2", "60 minutes", "Run bowling balls through ball cleaner", 3, 5);
		 createTask("Mitch", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 4, 4);
		 createTask("Gerika", "Clean Balls", "2", "60 minutes", "Run bowling balls through ball cleaner", 4, 4);
		 createTask("Mitch", "Clean Control Desk", "1", "20 minutes", "Clean: on-top/underneath counters, inside drawers", 4, 5);
		 
		 //EMPLOYEE test cases
		 addEmployee("Jimmy", "10675175");
		 addEmployee("Whitney", "10754568");
		 addEmployee("Miriam", "10858623");
		 addEmployee("Mitch", "10658985");
		 addEmployee("Autumn", "10911235");
		 addEmployee("Gerika", "10747568");
		 
		 //Update the calendar
		 populateCalendarTasks(_numRows, _numCols);
	 } // end function controllerFlowOfControl()
	 
	 //The populateCalendarTasks function
	 //Purpose: To iterate through each row/col of the calendar, get numOfTasks, and display in cell
	 //Parameters: The number of rows and columns in the calendar
	 //Return: None
	 function populateCalendarTasks(_numRows, _numCols)
	 {
		 //Get the calendar
		 var table = document.getElementById("calendar");
		 
		 //Iterate through each row
		 for (var i = 1; i <= _numRows; i++)
		 {
			 //Iterate through columns
			 for (var j = 0; j <= _numCols; j++)
			 {				 
				 //get the current cell
				 var cell = table.rows[i].cells[j];
				 //get the total task number for that day
				 var numTasks = getDailyTaskTotal(i, j);
				 
				 //get taskSpan in cell
				 var todaysTaskSpan = cell.getElementsByClassName("task_span"); 
				 
				 //If data is good and there's tasks for the given day
				 if (numTasks != undefined && numTasks != "0")
				 {
					 todaysTaskSpan[0].innerHTML = "Tasks: " + numTasks; // display numTasks 
				 } // end for
				 else // NO data
				 {
					 todaysTaskSpan[0].innerHTML = ""; // clear numTasks
				 } // end else
			 } // end for
		 } // end for
	 } // end function populateCalendarTasks()
	 
	 //The createTask function
	 //Purpose: To create a Task object with the Inputs from the form
	 //Parameters: The object generating the event, and the event args
	 //Return: None
	 function createTask(_employee, _title, _precedence, _eta, _instructions, _row, _col)
	 {
		 //Create a new task
		 var task = new Task(_employee, _title, _precedence, _eta, _instructions);
		 //Add task to data structure
		 addTask(_row, _col, task);														
	 } // end function createTask()
	 
	 //The formatTodaysTasks function
	 //Purpose: To get the data (tasks) for the given day and format it in a listStyleType
	 //Parameters: The object generating the event, and the event args
	 //Return: None
	 function formatTodaysTasks(_row, _col)
	 {
		 //Get array of task objects
		 var unformattedTasks = getTasks(_row, _col);
		 
		 //Declare var to return
		 var formattedTasks;
		 
		 //If no tasks
		 if (unformattedTasks.length == 0)
			 formattedTasks = "No Tasks Today";
		 else // there ARE tasks
		 {
			 //Create formatted array
			 formattedTasks = [];
		 
			 //Create helper 
			 var helper;
			 
			 //Get data members for each task and format into list string
			 for (var t = 0, length = unformattedTasks.length; t < length; t++)
			 {
				 //Inject Checkbox into front of list
				 helper = "<ul style='list-style:none'><input type='checkbox' class='taskChkBox' style='float:left'>";
				 helper += "<li>" + unformattedTasks[t].getEmployee() + "</li>";
				 helper += "<ul style='list-style:disc'><li>" + unformattedTasks[t].getTitle();
				 helper += "<li>" + unformattedTasks[t].getPrecedence() + "</li>";
				 helper += "<li>" + unformattedTasks[t].getEtc() + "</li>";
				 helper += "<li>" + unformattedTasks[t].getInstructions() + "</li>";
				 helper += "</li></ul></ul>";
				 //Add string to array
				 formattedTasks[t] = helper;
			 } // end for
		 } // end else
		 
		 return formattedTasks;		 
	 } // end function formatTodaysTasks()
	 
	 //The taskChkBoxChanged function
	 //Purpose: To toggle the delete button visibility and draw a line-through the checked task
	 //Parameters: None
	 //Return: None
	 function taskChkBoxChanged()
	 {
		 //Box is checked
		 if (this.checked == true)
		 {
			 document.getElementById("deleteTaskBtn").style.visibility = "visible"; // cancel button visible
			 var taskEmpName = this.nextSibling; // get task employee name
			 var taskData = taskEmpName.nextSibling; // get task data
			 taskEmpName.style.textDecoration = "line-through"; // draw line through employee name
			 taskData.style.textDecoration = "line-through"; // draw line through task data
		 } // end if
		 else // box unchecked
		 {
			 document.getElementById("deleteTaskBtn").style.visibility = "hidden"; // cancel button hidden
			 var taskEmpName = this.nextSibling; // get task employee name
			 var taskData = taskEmpName.nextSibling; // get task data
			 taskEmpName.style.textDecoration = "none"; // employee name without line through
			 taskData.style.textDecoration = "none"; // task data without line through
		 } // end else
	 } // end function taskChkBoxChanged()
 
	 //The formatEmployeeKey function
	 //Purpose: To get the array of employees, format data in a list, and inject into employee key
	 //Parameters: None
	 //Return: None
	 function formatEmployeeKey()
	 {
 		 //Declare helpers:
		 var helper = "";
		 var formattedEmployeeList = [];
		 
		 //Get employees
		 var myEmployees = getEmployees();

		 //Iterate through each employee and format their data
		 for (var e = 0, length = myEmployees.length; e < length; e++) 
		 {
			 //Create list with checkbox
			 helper = "<ul style='list-style:none'><input type='checkbox' class='employeeChkBox'  style='float:left'>";
			 
			 //Get employee name and format as list item
			 helper +=  "<li>" + "Name: " + myEmployees[e].getName() + "</li>";
			 
			 //Create new sub-list, get employee ID, and format as list item
			 helper += "<ul style='list-style:disc'><li>" + "ID: " + myEmployees[e].getId();
			 
			 //Closing tags for list items and lists
			 helper += "</li></ul></ul>";
			 
			 //Add string to array
			 formattedEmployeeList[e] = helper;
		 } // end for
		 
		 //Add each employee list to employee key div
		 for (var i = 0, length = formattedEmployeeList.length; i < length; i++)
		 {
			 //Add list to div
			 document.getElementById("employeeKeySpan").innerHTML += formattedEmployeeList[i];
		 } // end for		  		 
	 } // end function formatEmployeeKey()
 
	 //The employeeChkBoxChanged function
	 //Purpose: To toggle the delete button visibility and draw a line-through the checked employee
	 //Parameters: None
	 //Return: None
	 function employeeChkBoxChanged()
	 {
		 //Box is checked
		 if (this.checked == true)
		 {
			 document.getElementById("deleteEmployeeBtn").style.visibility = "visible"; // cancel button visible
			 var employeeName = this.nextSibling; // get employee name
			 var employeeID = employeeName.nextSibling; // get employee id
			 employeeName.style.textDecoration = "line-through"; // draw line through employee name
			 employeeID.style.textDecoration = "line-through"; // draw line through task data
		 } // end if
		 else // box unchecked
		 {
			 document.getElementById("deleteEmployeeBtn").style.visibility = "hidden"; // cancel button hidden
			 var employeeName = this.nextSibling; // get task employee name
			 var employeeID = employeeName.nextSibling; // get task data
			 employeeName.style.textDecoration = "none"; // employee name without line through
			 employeeID.style.textDecoration = "none"; // employee id without line through
		 } // end else
	 } // end function employeeChkBoxChanged()
 
	 //The previousMonth function
	 //Purpose: To create a DateTime object for the previous month, then pass it for month calculations
	 //Parameters: None
	 //Return: None
	 function previousMonth()
	 {
		 //Create DateTime Object
		 calculateMonthDT(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 01)); // year, month, day
		 
		 //Set NEW currentMonth
		 currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 01);
		 
		 //Re-populate tasks
		 populateCalendarTasks(6, 6);
	 } // end function previousMonth()
	 
	 //The nextMonth function
	 //Purpose: To create a DateTime object for the next month, then pass it for month calculations
	 //Parameters: None
	 //Return: None
	 function nextMonth()
	 {
		 //Create DateTime Object
		 calculateMonthDT(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 01)); // year, month, day
		 
		 //Set NEW currentMonth
		 currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 01);
		 
		 //Re-populate tasks
		 populateCalendarTasks(6, 6);
	 } // end function nextMonth()
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 