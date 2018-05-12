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
	 
	 //Create calendar table
	 var calendar = document.createElement("TABLE");
	 
	 //Declare Animation vars
	 var willyAnimeImg;
	 var willyAnime;
	 var timer;
	 var stoppingCoords;
	 var animeCount = 0;
	 
	 //Declare & initialize variables
	 var numRows = 6;
	 var numCols = 6;
	 var currentCell = undefined;
	 var currentMonth = new Date();
	 
	 //The createCalendar function
	 //Purpose: To create the calendar table and its associated th, tr, and td
	 //Parameters: numberOfColumns, and numberOfRows
	 //Return: None
	 function createCalendar(_numRows, _numCols)
	 {
		 //CreateAnimation Elements
		 //createAnimationElements();
		 
		 //Set calendar id and add to document
		 calendar.setAttribute("id", "calendar");
		 calendar.className = "calendar";
		 document.body.appendChild(calendar);
		 
		 //Create table headers
		 createTableHeaders(_numCols);
		 
		 //Create primary table
		 createTableData(_numRows, _numCols, getDateNumbers());
		 
		 //Create cell coordinates div
		 createCoordDiv();
		 
		 //Add event handlers to cells
		 addCellEvents();
		 
		 //Initialize Animation
		 //initAnimation();
		 
		 //Display user login
		 //displayUserLogin();
		 
		 //Display XML
		 getXML();
		 
		 //Get saved data
		 getLocalStorage();
		 
		 //Display DateTimes
		 calculateMonthDT(currentMonth);
		 
		 //Pass the flow to the controller
		 controllerFlowOfControl(_numRows, numCols);
		 
		 //Create employee key
		 createEmployeeKey();

		 //Create delete data button
		 createDeleteDataBtn();
	 } // end function createCalendar()
	 
	 //The createTableHeaders function
	 //Purpose: To create the header row, and insert cell data
	 //Parameters: None
	 //Return: None
	 function createTableHeaders(_numCols)
	 {
		 //Create an array to hold days of week
		 var daysOfWeek = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
		 
		 //Initialize & insert header row
		 var header = calendar.createTHead();
		 var headerRow = header.insertRow(0);
		 
		 //Create header cells & insert daysOfWeek
		 for (var h = 0; h <= _numCols; h++)
		 {
			 var headerCell = headerRow.insertCell(h);
			 headerCell.innerHTML = daysOfWeek[h];
			 headerCell.className = "table-headers";
		 }  // end for
	 } // end function createTableHeaders()
	 
	 //The createTableData function
	 //Purpose: To create the table rows & cells, and to insert their data
	 //Parameters: None
	 //Return: None
	 function createTableData(_numRows, _numCols,  _dateNumbers)
	 {
		 //Declare helper vars
		 var row;
		 var cell;
		 var dayCount = 0;
		 var firstRoundFlag = true;
		 
		 //Create primary table
 		 for (var i = 1; i <= _numRows; i++)
		 {
			 //Don't adjust count first time through
			 if (firstRoundFlag === false)
			 {
				 dayCount = dayCount + 7; // increment dayCount by 7 to compensate for previous rows count
			 } // end if
			 
			 row = calendar.insertRow(i); // create rows
			 row.setAttribute("style", "line-height: 30px"); // set line-height
			 
			 //Create Cells
			 for (var j = 0; j <= _numCols; j++)
			 {
				 cell = row.insertCell(j); // insert cells
				 cell.style.border = "2px solid black";
				 cell.style.cursor = "pointer";
				 
				 //Day Numbers
				 var dateSpan = document.createElement("SPAN"); // create span
				 dateSpan.setAttribute("class", "dayNumberSpans");
				 cell.appendChild(dateSpan); // append dateSpan
				 dateSpan.innerHTML = _dateNumbers[dayCount + j]; // insert day numbers into cells
				 dateSpan.style.verticalAlign = "10px";
				 dateSpan.style.fontWeight = "bold";
				 
				 //Create centralCellDiv
				 var centralCellDiv = document.createElement("DIV");
				 centralCellDiv.setAttribute("class", "centralCellDiv");
				 centralCellDiv.className = "central_cell_div";
				 cell.appendChild(centralCellDiv);
				 
				 //Day Tasks
				 var taskSpan = document.createElement("SPAN"); // create span
				 taskSpan.setAttribute("class", "task_span") // set class name
				 taskSpan.className = "task_span";
				 cell.appendChild(taskSpan); // append taskSpan
				 
				 //If cell is even, change attr
				 /* if ((j % 2) == 0)
					 cell.setAttribute("style", "background-color: #f5f5dc"); */
				 
				 firstRoundFlag = false;
			 } // end for
		 } // end for  
	 } // end function createTableData()
	 
	 //The getDateNumbers function
	 //Purpose: To fill an array with the dates from last, current, and previous months in view
	 //Parameters: None
	 //Return: dateNumbers in the form of an array
	 function getDateNumbers()
	 {
		 //Declare helpers
		 var nextMonth = 32;
		 
		 //Create an array to hold numbers
		 var dateNumbers = new Array(43);
		 
		 //Save values for previous month
		 dateNumbers[0] = 30;
		 dateNumbers[1] = 31;
		 
		 //Save values for current month
		 for (var i = 1; i < dateNumbers.length - 12; i++) // offset of 12 to prevent succession into following months indexes
		 {
			 dateNumbers[i + 1] = i; // offset of 1 to compensate for previous months values
		 } // end for
		 
		 //Save values for following months
		 for (var i = 1; i < dateNumbers.length - 32; i++) // offset of 32 to only create '10' values for following month
		 {
			 dateNumbers[nextMonth] = i;
			 nextMonth++;
		 } // end for
		 
		 return dateNumbers;
	 } // end function getDateNumbers()
	
	 //The createCoordDiv function
	 //Purpose: To create a div which holds the current cell coordinates
	 //Parameters: None
	 //Return: None
	 function createCoordDiv()
	 {
		 //Create, set ID, and append the div
		 var coordDiv = document.createElement("DIV");
		 coordDiv.setAttribute("id", "coordDiv");
		 document.body.appendChild(coordDiv);
		 //Append p into coordDiv
		 var coordDivText = document.createElement("P");
		 coordDivText.setAttribute("id", "coordDivText");
		 coordDiv.appendChild(coordDivText);
		 
		 //Set coordDiv styles
		 coordDiv.style.position = "absolute";
		 coordDiv.style.cssFloat = "left";
		 coordDiv.style.margin = "10px";
		 coordDiv.style.width = "150px";
		 coordDiv.style.height = "75px";
		 coordDiv.style.border = "2px solid red";
		 coordDiv.style.boxShadow = "5px 5px 5px #888888";
		 coordDiv.style.backgroundColor = "black";
		 coordDiv.style.boxShadow = "5px 5px 5px #888888";
		 
		 //Set coordDivText styles
		 coordDivText.style.position = "absolute";
		 coordDivText.style.margin = "0px 0px 0px 0px";
		 coordDivText.style.fontSize = "xx-large";
		 coordDivText.style.color = "white";
		 coordDivText.style.fontFamily = "'Helvetica', serif";
		 coordDivText.style.textAlign = "center";
	 } // end function createCoordDiv()
	 
	 //The updateCoordDiv function
	 //Purpose: To format and update the coordDiv
	 //Parameters: The current cell row and column
	 //Return: None
	 function updateCoordDiv(_row, _col)
	 {
		 //Format the row and col
		 var string = "Row: " + _row;
		 string += "\nCol: " + _col;
		 
		 //Display in coordDiv
		 document.getElementById("coordDivText").innerHTML = string;
	 } // end function updateCoordDiv()
	
	 //The addCellEvents function
	 //Purpose: To add event handlers to each cell in the calendar
	 //Parameters: None
	 //Return: None
	 function addCellEvents()
	 {
		 //Get an array of cells
		 var allCells = calendar.getElementsByTagName("TD");
		 
		 //Add event to each cell
		 for (var i = 0, length = allCells.length; i < length; i++)
		 {
			 allCells[i].onclick = cellClick;
		 } // end for
	 } // end function addCellEvents()

	 //The cellClick function
	 //Purpose: To create & display the day div for the given day
	 //Parameters: The object generating the event, and the event args
	 //Return: None
	 function cellClick()
	 {
		 //If another day is open, close it
		 if (document.getElementById("dayDiv"))
		 {
			 var parent = document.getElementById("dayDiv").parentNode;
			 parent.removeChild(document.getElementById("dayDiv"));
			 currentCell.style.backgroundColor = "white"; // reset cell background
		 } // end if
		 
		 //Update the coordDiv
		 updateCoordDiv(this.parentNode.rowIndex, this.cellIndex);
		 
		 //Change cell object color
		 currentCell = this;
		 currentCell.style.backgroundColor = "#faebd7";
		 
		 //Get cell & position
		 var cellPosition = this.getBoundingClientRect();
		 var bodyPosition = document.body.getBoundingClientRect();
		 //Calc offsets
		 var topOffset = (cellPosition.top - bodyPosition.top) + 130; // fine tune by +130
		 var leftOffset = (cellPosition.left - bodyPosition.left) - 100; // fine tune by -100
		 
		 //Create dayDiv
		 var dayDiv = document.createElement("DIV");
		 dayDiv.setAttribute("id", "dayDiv");
		 dayDiv.className = "dayDiv";
		 document.body.appendChild(dayDiv);
		 dayDiv.style.left = leftOffset + "px";
		 dayDiv.style.top = topOffset + "px";
		 
		 //Create daySpanHeader
		 var daySpanHeader = document.createElement("SPAN");
		 daySpanHeader.setAttribute("id", "daySpanHeader");
		 daySpanHeader.setAttribute("class", "divHeaders");
		 daySpanHeader.className = "div_headers";
		 dayDiv.appendChild(daySpanHeader);		 
		 daySpanHeader.innerHTML = getDayHeader(this.parentNode.rowIndex, this.cellIndex);
		 
		 //Create newTaskBtn, taskList, deleteBtn, okBtn
		 createNewTaskBtn();
		 createTaskList();
		 createDeleteBtn(); 
		 createOkBtn(); 
	 } // end function cellClick()
	 
	 //The createNewTaskBtn function
	 //Purpose: To create a new task button
	 //Parameters: None
	 //Return: None
	 function createNewTaskBtn()
	 {
		 var newTaskBtn = document.createElement("BUTTON"); // create button element
		 newTaskBtn.setAttribute("class", "newTaskBtn"); // set class 
		 newTaskBtn.className = "new_task_btn";
		 var newTaskText = document.createTextNode("New Task"); // create text node
		 newTaskBtn.appendChild(newTaskText); // add text node to button
		 document.getElementById("dayDiv").appendChild(newTaskBtn); // add button to dayDiv
		 newTaskBtn.onclick = newTaskClick; // add event handler
	 } // end function createNewTaskBtn()
	 
	 //The newTaskClick function
	 //Purpose: To create a new task div
	 //Parameters: None
	 //Return: None
	 function newTaskClick()
	 {
		 //Get dayDiv & body position
		 var dayDivPosition = document.getElementById("dayDiv").getBoundingClientRect();
		 var bodyPosition = document.body.getBoundingClientRect();
		 
		 //Move newTaskDiv to left of dayDiv is too close to right
		 if (currentCell.cellIndex > 4)
		 {
			 //Calc offsets
			 var topOffset = (dayDivPosition.top - bodyPosition.top) + 8; // fine tune by +8
			 var leftOffset = (dayDivPosition.left - bodyPosition.left - 420); // fine tune by -420
		 } // end if
		 else // open newTaskDiv on right
		 {
			 //Calc offsets
			 var topOffset = (dayDivPosition.top - bodyPosition.top) + 8; // fine tune by +8
			 var leftOffset = (dayDivPosition.left - bodyPosition.left) + 530; // fine tune by +530
		 } // end else
		 
		 //Create newTaskDiv
		 var newTaskDiv = document.createElement("DIV"); // create div element
		 newTaskDiv.setAttribute("id", "newTaskDiv"); // set id
		 newTaskDiv.className = "new_task_div";
		 document.body.appendChild(newTaskDiv); // add newTaskDiv
		 newTaskDiv.style.top = topOffset + "px";
		 newTaskDiv.style.left = leftOffset + "px";
		 
		 //Create newTaskDiv header
		 var newTaskSpanHeader = document.createElement("SPAN"); // create span element
		 newTaskSpanHeader.setAttribute("id", "newTaskSpanHeader"); // set id
		 newTaskSpanHeader.setAttribute("class", "divHeaders"); // set class
		 newTaskSpanHeader.className = "div_headers";
		 newTaskDiv.appendChild(newTaskSpanHeader); // add span to div
		 newTaskSpanHeader.innerHTML = "New Task"; // set header text
		 
		 //Create content, populate employee options, create delete & ok buttons
		 createNewTaskContent();
		 populateEmployeeOptions();
		 createCancelBtn();
		 createSaveBtn(); 
	 } // end function newTaskClick()
	 
	 //The createNewTaskContent function
	 //Purpose: To create a list of labels and fields
	 //Parameters: None
	 //Return: None
	 function createNewTaskContent()
	 {
		 var txtBoxLblList = document.createElement("UL"); // create list element
		 txtBoxLblList.setAttribute("id", "txtBoxLblList"); // set id
		 txtBoxLblList.className = "new_task_content";
		 document.getElementById("newTaskDiv").appendChild(txtBoxLblList); // add txtBoxLblList
		 
		 //Create <li> content
		 var content = "<li>Employee:<select id='employeeSelect' style='margin:0px 5px 0px 110px'></select></li>" +
						"<li>Title:<input type='text' id='titleInput' style='margin:0px 5px 0px 119px'></input></li>" +
						"<li>ETC:<input type='text' id='etcInput' style='margin:0px 5px 0px 117px'></input></li>" +
						"<li>Precedence:<input type='text' id='precInput' style='margin:0px 5px 0px 48px'></input></li>" +
						"<li>Instructions:<textarea type='text' id='instrInput' style='width:140px;height:80px;margin:10px 5px 0px 53px;resize:none'></textarea></li>";
		 
		 //Insert content
		 txtBoxLblList.innerHTML = content; 
	 } // end function createNewTaskContent()
	 
	 //The populateEmployeeOptions function
	 //Purpose: To populate the employee select element with the employee objects from the model
	 //Parameters: None
	 //Return: None
	 function populateEmployeeOptions()
	 {
		 //Get select element
		 var employeeSelect = document.getElementById("employeeSelect");
		 
		 //Get employee objects
		 var allEmployees = getEmployees();
		 
		 //Iterate through all employees and create select options for them
		 for (var i = 0, length = allEmployees.length; i < length; i++)
		 {
			 var thisOption = document.createElement("OPTION"); // create option element
			 thisOption.setAttribute("value", allEmployees[i].getName()); // get employee name and set as value
			 var thisOptionText = document.createTextNode(allEmployees[i].getName()); // create text node
			 thisOption.appendChild(thisOptionText); // add text to option element
			 document.getElementById("employeeSelect").appendChild(thisOption); // add option to select element
		 } // end for
	 } // end function populateEmployeeOptions()
	 
	 //The createCancelBtn function
	 //Purpose: To create a cancel btn
	 //Parameters: None
	 //Return: None
	 function createCancelBtn()
	 {
		 var cancelBtn = document.createElement("BUTTON"); // create button element
		 cancelBtn.setAttribute("id", "cancelBtn"); // set id
		 cancelBtn.setAttribute("class", "deleteTaskBtn"); // set id
		 cancelBtn.className = "delete_btn";
		 var cancelBtnText = document.createTextNode("Cancel"); // create text node
		 cancelBtn.appendChild(cancelBtnText); // add text node to button
		 document.getElementById("newTaskDiv").appendChild(cancelBtn); // add button to div
		 cancelBtn.onclick = closeWindow; // add event handler 
	 } // end function createCancelBtn
	 
	 //The createSaveBtn function
	 //Purpose: To create a save button
	 //Parameters: None
	 //Return: None
	 function createSaveBtn()
	 {
		 var saveBtn = document.createElement("BUTTON"); // create button element
		 saveBtn.setAttribute("id", "saveBtn"); // set id
		 saveBtn.className = "save_btn";
		 var saveText = document.createTextNode("Save"); // create text node
		 saveBtn.appendChild(saveText); // add text node to button
		 document.getElementById("newTaskDiv").appendChild(saveBtn); // add button to dayDiv
		 saveBtn.addEventListener("click", formatTask); // add event handler 
	 } // end function createSaveBtn()
	 
	 //The formatTask function
	 //Purpose: To format a task object with user data
	 //Parameters: None
	 //Return: None
	 function formatTask()
	 {
		 //Indicate task was saved, Play audio - dinging bell
		 document.getElementById("audioDing").play();
		 
		 //Get user input
		 var thisEmployee = document.getElementById("employeeSelect").value;
		 var thisTitle = document.getElementById("titleInput").value;
		 var thisPrec = document.getElementById("precInput").value;
		 var thisEtc = document.getElementById("etcInput").value;
		 var thisInstr = document.getElementById("instrInput").value;
		 
		 //Create task object
		 createTask(thisEmployee, thisTitle, thisPrec, thisEtc, thisInstr, currentCell.parentNode.rowIndex, currentCell.cellIndex);
		 
		 //Add new task to dayDiv
		 addEntry();
		 
		 //Close the newTaskDiv
		 var thisParent = this.parentNode;
		 thisParent.parentNode.removeChild(thisParent);
	 } // end function formatTask()
	 
	 //The addEntry function
	 //Purpose: To update the dayDiv to include the recently added task
	 //Parameters: None
	 //Return: None
	 function addEntry()
	 {
		 //Clear dayDiv
		 var dayDivChildren = document.getElementById("dayDiv").childNodes;
		 for (var i = 1, length = dayDivChildren.length; i < length; i++) // offset by 1 to avoid header
		 {
			 var thisParent = document.getElementById("dayDiv") // get parent
			 thisParent.removeChild(dayDivChildren[1]); // remove second child each time
		 } // end for
		 
		 //Rebuild dayDiv
		 createNewTaskBtn();
		 createTaskList();
		 createDeleteBtn();
		 createOkBtn();
	 } // end function addEntry()
	 
	 //The createTaskList function
	 //Purpose: To create the task list
	 //Parameters: None
	 //Return: None
	 function createTaskList()
	 {
		 //Get array of task strings
		 var taskArray = formatTodaysTasks(currentCell.parentNode.rowIndex, currentCell.cellIndex);
		 
		 //Declare vars
		 var todaysTasks;
		 
		 //If no tasks
		 if (taskArray == "No Tasks Today")
		 {
			 todaysTasks = document.createElement("P"); // create p element
			 todaysTasks.setAttribute("class", "taskList"); // set class
			 todaysTasks.innerHTML = taskArray; // inject string into P element
			 document.getElementById("dayDiv").appendChild(todaysTasks); // add todaysTasks to dayDiv
			 todaysTasks.style.fontSize = "100%";
		     todaysTasks.style.fontFamily = "'Helvetica', serif";
			 todaysTasks.style.textAlign = "center";
		 } // end if
		 else // there ARE tasks
		 {
			  //Create and style elements for each task
			 for (var i = 0, length = taskArray.length; i < length; i++)
			 {
				 todaysTasks = document.createElement("P"); // create p element
				 todaysTasks.setAttribute("class", "taskList"); // set class
				 todaysTasks.innerHTML = taskArray[i]; // inject string into P element
				 document.getElementById("dayDiv").appendChild(todaysTasks); // add todaysTasks to dayDiv
				 todaysTasks.style.fontSize = "100%";
				 todaysTasks.style.fontFamily = "'Helvetica', serif";
				 document.getElementsByClassName("taskChkBox")[i].addEventListener("change", taskChkBoxChanged); // add event handler
			 } // end for
		 } // end else
	 } // end function createTaskList()
	 
	 //The createDeleteBtn function
	 //Purpose: To create a delete button
	 //Parameters: None
	 //Return: None
	 function createDeleteBtn()
	 {
		 var deleteTaskBtn = document.createElement("BUTTON"); // create button element
		 deleteTaskBtn.setAttribute("id", "deleteTaskBtn"); // set id
		 deleteTaskBtn.setAttribute("class", "deleteTaskBtn"); // set id
		 deleteTaskBtn.className = "delete_btn";
		 var deleteTaskBtnText = document.createTextNode("Delete"); // create text node
		 deleteTaskBtn.appendChild(deleteTaskBtnText); // add text node to button
		 document.getElementById("dayDiv").appendChild(deleteTaskBtn); // add button to dayDiv
		 deleteTaskBtn.style.visibility = "hidden";
		 deleteTaskBtn.onclick = removeEntry; // add event handler 
	 } // end function createDeleteBtn()
	 
	 //The removeEntry function
	 //Purpose: To remove a task from the list
	 //Parameters: None
	 //Return: None
	 function removeEntry()															
	 {
		 //Declare helpers
		 var checkedBoxes = [];
		 var count = 0;
		 
		 //Get array of check boxes
		 var allChkBoxes = document.getElementsByClassName("taskChkBox");
		 
		 //Iterate through array, find chkBoxes that are checked and save to array
		 for (var i = 0, length = allChkBoxes.length; i < length; i++)
		 {
			 //Box is checked
			 if (allChkBoxes[i].checked == true)
			 {
				 //Save chkBox
				 checkedBoxes[count] = i;
				 count++;
			 } // end if
		 } // end for
		 
		 //Delete tasks from model
		 for (var r = 0, length = checkedBoxes.length; r < length; r++)
		 {
			 deleteTask(currentCell.parentNode.rowIndex, currentCell.cellIndex, checkedBoxes[r]); 
		 } // end for
		 
		 //Clear dayDiv
		 var dayDivChildren = document.getElementById("dayDiv").childNodes;
		 for (var i = 1, length = dayDivChildren.length; i < length; i++) // offset by 1 to avoid header
		 {
			 var thisParent = document.getElementById("dayDiv") // get parent
			 thisParent.removeChild(dayDivChildren[1]); // remove second child each time
		 } // end for
		 
		 //Rebuild dayDiv
		 createNewTaskBtn();
		 createTaskList();
		 createDeleteBtn();
		 createOkBtn();
	 } // end function removeEntry()
	 
	 //The createOkBtn function
	 //Purpose: To create an OK button
	 //Parameters: A parent element represented as _parent
	 //Return: None
	 function createOkBtn()
	 {
		 var okBtn = document.createElement("BUTTON"); // create button element
		 okBtn.setAttribute("id", "okBtn"); // set id
		 okBtn.className = "okay_btn";
		 var okText = document.createTextNode("OK"); // create text node
		 okBtn.appendChild(okText); // add text node to button
		 document.getElementById("dayDiv").appendChild(okBtn); // add button to dayDiv
		 okBtn.addEventListener("click", closeWindow); // add event handler 
	 } // end function createOkBtn()
	 
	 //The closeWindow function
	 //Purpose: To remove the implicit object's parent
	 //Parameters: None
	 //Return: None
	 function closeWindow() 
	 {
		 //Get the div
		 var thisParent = this.parentNode;
		 //Remove the div
		 thisParent.parentNode.removeChild(thisParent);
		 
		 //If dayDiv needs to be closed
		 if (thisParent.id == "dayDiv")
		 {
			 //Change the current cell background and coordDiv text
			 currentCell.style.backgroundColor = "white";
			 document.getElementById("coordDivText").innerHTML = "";
			 
			 //Refresh cell
			 var newNumberOfTasks = getDailyTaskTotal(currentCell.parentNode.rowIndex, currentCell.cellIndex); // get new task total
			 var todaysTaskSpan = currentCell.getElementsByClassName("task_span"); // get taskSpan in cell
			 
			 if (newNumberOfTasks == 0) // no tasks
				todaysTaskSpan[0].innerHTML = ""; // display empty string
			 else // there ARE tasks
				todaysTaskSpan[0].innerHTML = "Tasks: " + newNumberOfTasks; // display numTasks 
		 } // end for
	 } // end function closeWindow()

	 //The createAnimationElements function
	 //Purpose: To create the elements needed for the animation
	 //Parameters: None
	 //Return: None
	 function createAnimationElements()
	 {
		 //Create img element
		 willyAnimeImg = document.createElement("IMG");
		 willyAnimeImg.setAttribute("id", "willyAnimeImg");
		 willyAnimeImg.setAttribute("src", "Images/wolverine_head.png");
		 willyAnimeImg.setAttribute("alt", "Willy Animation");
		 willyAnimeImg.style.position = "absolute";
		 willyAnimeImg.style.width = "100px";
		 willyAnimeImg.style.height = "90px";
		 
		 //Create Div element
		 willyAnime = document.createElement("DIV");
		 willyAnime.setAttribute("id", "willyAnime");
		 willyAnime.style.position = "relative";
		 willyAnime.style.display = "inline";
		 willyAnime.style.zIndex = "2";
		 willyAnime.style.left = "120px";
		 willyAnime.style.top = "5px";
		 
		 //Add img to div and div to body
		 willyAnime.appendChild(willyAnimeImg);
		 document.body.appendChild(willyAnime);
	 } // end function createAnimationElements()
	 
	 //The initAnimation function
	 //Purpose: To set stopping coordinates and call animation()
	 //Parameters: None
	 //Return: None
	 function initAnimation()
	 {
		 //Get stopping coords
		 var coordDivPosition = document.getElementById("coordDiv").getBoundingClientRect();
		 var bodyPosition = document.body.getBoundingClientRect();
		 stoppingCoords = coordDivPosition.top - bodyPosition.top;
	
		 //Start animation
		 animate();
	 } // end function initAnimation()
	 
	 //The animate function
	 //Purpose: To move the image on the page
	 //Parameters: None
	 //Return: None
	 function animate()
	 {
		 //Get willy position
		 var willyPosition = willyAnime.getBoundingClientRect();
		 bodyPosition = document.body.getBoundingClientRect();
		 var currentTop = willyPosition.top - bodyPosition.top;
		 
		 //If willyAnime has reached stoppingCoords
		 if (currentTop > stoppingCoords - 150)
		 {
			 //Stop animation after 10 cycles
			 if (animeCount == 10)
				clearTimeout(timer);
			 else // continue
			 {
				 willyAnime.style.top = "70px"; // reset willyAnime back to top of page
				 animeCount++;
				 timer = setTimeout(animate, 100); // recursion
			 } // end else
		 } // end if
		 else
		 {
			 //Increment willyAnime top
			 willyAnime.style.top = (currentTop + 1) + "px";
			 
			 //Save timer so timeout can be stopped with clearTimeout
			 timer = setTimeout(animate, 100); // recursion
		 } // end else
	 } // end function animate()
 
	 //The displayUserLogin function
	 //Purpose: To create a div, read the previous successful login from local storage, and display it
	 //Parameters: None
	 //Return: None
	 function displayUserLogin()
	 {
		 //Create div
		 var lastLoginDiv = document.createElement("DIV");
		 lastLoginDiv.setAttribute("id", "lastLoginDiv");
		 lastLoginDiv.className = "last_login_div";
		 //document.body.appendChild(lastLoginDiv);
		 document.body.insertBefore(lastLoginDiv, document.getElementById("coordDiv"));
		 
		 //Create last login header
		 var lastLoginHeader = document.createElement("SPAN");
		 lastLoginHeader.setAttribute("id", "lastLoginHeader");
		 lastLoginHeader.className = "last_login_header";
		 lastLoginDiv.appendChild(lastLoginHeader);
		 lastLoginHeader.innerHTML = "Last Login";
		 
		 //Create span to hold text
		 var lastLoginSpan = document.createElement("SPAN");
		 lastLoginSpan.setAttribute("id", "lastLoginSpan");
		 lastLoginSpan.className = "last_login_span";
		 lastLoginDiv.appendChild(lastLoginSpan);
		 
		 //Get last successful login data from local storage
		 var userLogin = localStorage.getItem("cs2550timestamp");
		 lastLoginSpan.innerHTML = userLogin;
		 
		 //Create clear button
		 var clearBtn = document.createElement("BUTTON");
		 clearBtn.setAttribute("id", "clearBtn");
		 clearBtn.className = "clear_btn";
		 lastLoginDiv.appendChild(clearBtn);
		 clearBtn.innerHTML = "Clear User";
		 clearBtn.onclick = clearUser;
	 } // end function displayUserLogin()
	 	 
	 //The clearUser function
	 //Purpose: To clear the user data from local storage and lastLoginDiv
	 //Parameters: None
	 //Return: None
	 function clearUser()
	 {
		 //Clear the div
		 lastLoginSpan.innerHTML = "";
		 
		 //Remove user from loval storage
		 localStorage.removeItem("cs2550timestamp");
	 } // end function clearUser
	 
	 //The createEmployeeKey function
	 //Purpose: To create the employeeKey div
	 //Parameters: None
	 //Return: None
	 function createEmployeeKey()
	 {
		 //Create div
		 var employeeKeyDiv = document.createElement("DIV");
		 employeeKeyDiv.setAttribute("id", "employeeKeyDiv");
		 employeeKeyDiv.className = "employee_key_div";
		 document.body.insertBefore(employeeKeyDiv, document.getElementById("coordDiv"));
		 
		 //Create employee key header
		 var employeeKeyHeader = document.createElement("SPAN");
		 employeeKeyHeader.setAttribute("id", "employeeKeyHeader");
		 employeeKeyHeader.className = "employee_key_header";
		 employeeKeyDiv.appendChild(employeeKeyHeader);
		 employeeKeyHeader.innerHTML = "Employees";
		 
		 //Create span to hold employee list
		 var employeeKeySpan = document.createElement("SPAN");
		 employeeKeySpan.setAttribute("id", "employeeKeySpan");
		 employeeKeySpan.className = "employee_key_span";
		 employeeKeyDiv.appendChild(employeeKeySpan);
		 
		 //Create add & delete buttons
		 createEmployeeList();
		 createAddEmployeeBtn();
		 createDeleteEmployeeBtn();
	 } // end function createEmployeeKey()
	 
	 //The createEmployeeList function
	 //Purpose: To create a list of employees
	 //Parameters:
	 //Return: 
	 function createEmployeeList()
	 {
		 //Get array of employees
		 formatEmployeeKey();
		 
		 //Get employees
		 var myEmployees = getEmployees();
		 
		 //Add event handlers to all employeeChkBoxes
		 for (var i = 0, length = myEmployees.length; i < length; i++)
		 {
			 document.getElementsByClassName("employeeChkBox")[i].addEventListener("change", employeeChkBoxChanged); // add event handler
		 } // end for
	 } // end function createEmployeeList()
	 
	 //The createAddEmployeeBtn function
	 //Purpose: To create the addEmployeeBtn
	 //Parameters: None
	 //Return: None
	 function createAddEmployeeBtn()
	 {
		 //Create addEmployeeBtn
		 var addEmployeeBtn = document.createElement("BUTTON");
		 addEmployeeBtn.setAttribute("id", "addEmployeeBtn");
		 addEmployeeBtn.className = "add_employee_button";
		 document.getElementById("employeeKeyDiv").appendChild(addEmployeeBtn);
		 addEmployeeBtn.innerHTML = "Add";
		 addEmployeeBtn.onclick = addEmployeeClick;
	 } // end function createAddEmployeeBtn()
	 
	 //The createDeleteEmployeeBtn function
	 //Purpose: To create the deleteEmployeeBtn
	 //Parameters: None
	 //Return: None
	 function createDeleteEmployeeBtn()
	 {
		 //Create deleteEmployeeBtn
		 var deleteEmployeeBtn = document.createElement("BUTTON"); // create button element
		 deleteEmployeeBtn.setAttribute("id", "deleteEmployeeBtn"); // set id
		 deleteEmployeeBtn.className = "delete_employee_button";
		 deleteEmployeeBtn.style.visibility = "hidden";
		 document.getElementById("employeeKeyDiv").appendChild(deleteEmployeeBtn);
		 deleteEmployeeBtn.innerHTML = "Delete";
		 deleteEmployeeBtn.onclick = deleteEmployeeClick;
	 } // end function createDeleteEmployeeBtn()
	 
	 //The deleteEmployeeClick function
	 //Purpose: To remove an employee from the employee key, the employee array, and rebuild employee key
	 //Parameters: The object generating the event
	 //Return: None
	 function deleteEmployeeClick()
	 {
		 //Declare helpers
		 var checkedBoxes = [];
		 var count = 0;
		 
		 //Get array of check boxes
		 var allChkBoxes = document.getElementsByClassName("employeeChkBox");
		 
		 //Iterate through array, find chkBoxes that are checked and save to array
		 for (var i = 0, length = allChkBoxes.length; i < length; i++)
		 {
			 //Box is checked
			 if (allChkBoxes[i].checked == true)
			 {
				 //Save chkBox
				 checkedBoxes[count] = i;
				 count++;
			 } // end if
		 } // end for
		 
		 //Delete employee from array
		 for (var r = 0, length = checkedBoxes.length; r < length; r++)
		 {
			 deleteEmployee(checkedBoxes[r]); 
		 } // end for
		 
		 //Remove existing addEmployeeBtn, deleteEmployeeBtn, and clear employeeKeySpan contents
		 var parent = document.getElementById("addEmployeeBtn").parentNode;
		 parent.removeChild(document.getElementById("addEmployeeBtn"));
		 parent.removeChild(document.getElementById("deleteEmployeeBtn"));
		 document.getElementById("employeeKeySpan").innerHTML = "";
		 
		 //Rebuild employee key
		 createEmployeeList();
		 createAddEmployeeBtn();
		 createDeleteEmployeeBtn();
	 } // end function deleteEmployeeClick()
	 
	 //The addEmployeeClick function
	 //Purpose: To create the new employee div
	 //Parameters: None
	 //Return: None
	 function addEmployeeClick()
	 {
 		 //Create new employee div
		 var newEmployeeDiv = document.createElement("DIV");
		 newEmployeeDiv.setAttribute("id", "newEmployeeDiv");
		 newEmployeeDiv.className = "new_employee_div";
		 document.body.appendChild(newEmployeeDiv);
		 
		 //Create new employee header
		 var newEmployeeHeader = document.createElement("SPAN");
		 newEmployeeHeader.setAttribute("id", "newEmployeeHeader");
		 newEmployeeHeader.className = "new_employee_header";
		 newEmployeeHeader.innerHTML = "New Employee";
		 newEmployeeDiv.appendChild(newEmployeeHeader);
		 
		 //Create content, cancel & save buttons
		 createNewEmployeeContent();
		 createEmployeeCancelBtn();
		 createEmployeeSaveBtn(); 
	 } // end function addEmployeeClick()

	 //The createNewEmployeeContent function
	 //Purpose: To create a list of labels and fields
	 //Parameters: None
	 //Return: None
	 function createNewEmployeeContent()
	 {
		 var employeeList = document.createElement("UL"); // create list element
		 employeeList.setAttribute("id", "employeeList"); // set id
		 employeeList.className = "new_employee_content";
		 document.getElementById("newEmployeeDiv").appendChild(employeeList); // add employeeList
				
		 //Create <li> content
		 var content = 	"<li>Name:<input type='text' id='nameInput' style='margin:0px 5px 0px 10px'></input></li>" +
						"<li>ID:<input type='text' id='idInput' style='margin:0px 5px 0px 43px'></input></li>";
						
		 employeeList.innerHTML = content; // insert content
	 } // end function createNewEmployeeContent()
	 
	 //The createEmployeeCancelBtn function
	 //Purpose: To create a cancel btn
	 //Parameters: None
	 //Return: None
	 function createEmployeeCancelBtn()
	 {
		 var employeeCancelBtn = document.createElement("BUTTON"); // create button element
		 employeeCancelBtn.setAttribute("id", "employeeCancelBtn"); // set id
		 employeeCancelBtn.setAttribute("class", "deleteTaskBtn"); // set id
		 employeeCancelBtn.className = "delete_btn";
		 var cancelBtnText = document.createTextNode("Cancel"); // create text node
		 employeeCancelBtn.appendChild(cancelBtnText); // add text node to button
		 document.getElementById("newEmployeeDiv").appendChild(employeeCancelBtn); // add button to div
		 employeeCancelBtn.onclick = closeWindow; // add event handler 
	 } // end function createEmployeeCancelBtn
	 
	 //The createEmployeeSaveBtn function
	 //Purpose: To create a save button
	 //Parameters: None
	 //Return: None
	 function createEmployeeSaveBtn()
	 {
		 var employeeSaveBtn = document.createElement("BUTTON"); // create button element
		 employeeSaveBtn.setAttribute("id", "employeeSaveBtn"); // set id
		 employeeSaveBtn.style.left = "80px";
		 employeeSaveBtn.className = "save_btn";
		 var saveText = document.createTextNode("Save"); // create text node
		 employeeSaveBtn.appendChild(saveText); // add text node to button
		 document.getElementById("newEmployeeDiv").appendChild(employeeSaveBtn); // add button to div
		 employeeSaveBtn.addEventListener("click", saveEmployeeClick); // add event handler 
	 } // end function createEmployeeSaveBtn()
	 
	 //The saveEmployeeClick function
	 //Purpose: To take user input, and call addEmployee() to create employee object
	 //Parameters: None
	 //Return: None
	 function saveEmployeeClick()
	 {
		 //Declare helper:
		 var helper = "";
		 
		 //Get user input and save
		 var employeeName = document.getElementById("nameInput").value;
		 var employeeID = document.getElementById("idInput").value;
		 
		 //Create employee object
		 addEmployee(employeeName, employeeID);
		 
		 //Remove existing addEmployeeBtn, deleteEmployeeBtn, and clear employeeKeySpan contents
		 var parent = document.getElementById("addEmployeeBtn").parentNode;
		 parent.removeChild(document.getElementById("addEmployeeBtn"));
		 parent.removeChild(document.getElementById("deleteEmployeeBtn"));
		 document.getElementById("employeeKeySpan").innerHTML = "";
		 
		 //Re-create addEmployeeBtn
		 createEmployeeList();
		 createAddEmployeeBtn();
		 createDeleteEmployeeBtn()
		 
		 //CLOSE THE NEW EMPLOYEE DIV
		 var thisParent = this.parentNode; // get the div
		 thisParent.parentNode.removeChild(thisParent); // remove the div
	 } // end function saveEmployeeClick()
	 
	 //The getXML function
	 //Purpose: To get XML data and display it in the calendar
	 //Parameters: None
	 //Return: None
	 function getXML()
	 {
 		 //Declare helpers:
		 var task1 = "";
		 var task2 = "";
		 var formattedEmployeeList = [];
		 
		 //Create a new ajax object
		 var ajax = new XMLHttpRequest();
		 
		 //Setup POST request using synch
		 ajax.open("POST", "maintenanceSchedule.xml", false);
		 //Set content-type HEADER
		 ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		 //Send NULL
		 ajax.send(null);

		 //Save ajax responseXML
		 var xmlData = ajax.responseXML;

		 //Get tags for monday_wednesday
		 var xmlMonWeds = xmlData.getElementsByTagName("monday_wednesday");
		 //Get tags for tuesday_thursday
		 var xmlTuesThurs = xmlData.getElementsByTagName("tuesday_thursday");
		 //Get tags for friday_saturday
		 var xmlFriSat = xmlData.getElementsByTagName("friday_saturday");
		 
		 //Iterate through each row
		 for (var i = 1; i <= numRows; i++)
		 {
			 //Iterate through each column
			 for (var j = 0; j <= numCols; j++)
			 {				 
				 //If day is a monday or wednesday
				 if (j == 1 || j == 3)
				 {
					 //Get tasks from XML
					 task1 = xmlMonWeds[0].getElementsByTagName("task")[0].firstChild.data;
					 task2 = xmlMonWeds[0].getElementsByTagName("task")[1].firstChild.data;
					 
					 //Get the current cell and its centralCellSpan
					 var cell = calendar.rows[i].cells[j];
					 var centralDiv = cell.getElementsByClassName("central_cell_div");
					 
					 //Add tasks to cell
					 centralDiv[0].innerHTML = task1 + "<br />" + task2;
				 } // end if
				 
				 //If day is a tuesday or thursday
				 if (j == 2 || j == 4)
				 {
					 //Get tasks from XML
					 task1 = xmlTuesThurs[0].getElementsByTagName("task")[0].firstChild.data;
					 task2 = xmlTuesThurs[0].getElementsByTagName("task")[1].firstChild.data;
					 
					 //Get the current cell and its centralCellSpan
					 var cell = calendar.rows[i].cells[j];
					 var centralDiv = cell.getElementsByClassName("central_cell_div");
					 
					 //Add tasks to cell
					 centralDiv[0].innerHTML = task1 + "<br />" + task2;
				 } // end if
				 
				 //If day is a friday or saturday
				 if (j == 5 || j == 6)
				 {
					 //Get tasks from XML
					 task1 = xmlFriSat[0].getElementsByTagName("task")[0].firstChild.data;
					 task2 = xmlFriSat[0].getElementsByTagName("task")[1].firstChild.data;
					 
					 //Get the current cell and its centralCellSpan
					 var cell = calendar.rows[i].cells[j];
					 var centralDiv = cell.getElementsByClassName("central_cell_div");
					 
					 //Add tasks to cell
					 centralDiv[0].innerHTML = task1 + "<br />" + task2;
				 } // end if
			 } // end for
		 } // end for  		 
	 } // end function getXML()
	 
	 //The createDeleteDataBtn function
	 //Purpose: To create and display the deleteData button
	 //Parameters: None
	 //Return: None
	 function createDeleteDataBtn()
	 {
		 //Create and display deleteDataBtn
		 var deleteDataBtn = document.createElement("BUTTON");
		 deleteDataBtn.className = "delete_data_button";
		 document.body.insertBefore(deleteDataBtn, document.getElementById("coordDiv"));
		 deleteDataBtn.innerHTML = "Delete All Data In Storage!";
		 deleteDataBtn.onclick = deleteDataConfirmation;
	 } // end function createDeleteDataBtn()
	 
	 //The deleteDataConfirmation function
	 //Purpose: To display a confirmation box for the user to confirm deleteData
	 //Parameters: None
	 //Return: None
	 function deleteDataConfirmation()
	 {
		 //Display confirmation box 
		 var result = confirm("Are you sure you want to delete everything? ");
		 
		 //If user confirms clear storage
		 if (result)
		 {
			 //Clear storage
			 clearDataFromLocalStorage();
		 } // end if
	 } // end function deleteDataConfirmation()
	 
	 //The saveData function
	 //Purpose: To call saveDataToLocalStorage() to save the data
	 //Parameters: None
	 //Return: None
	 function saveData()
	 {
		 //Save data
		 saveDataToLocalStorage();
		 
		 //Return null to prevent confirmation box from displaying
		 return null;
	 } // end function saveData()
	 
	 
	 //The init function
	 //Purpose: To call createCalendar()
	 //Parameters: None
	 //Return: None
	 function init()
	 {
		 calendar.onsubmit = createCalendar(numRows, numCols);
	 } // end function init()
	 
	 //Add event listener for window close
	 window.onbeforeunload = saveData;
	 	 
	 //Add event listener for window load
	 window.onload = init;
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 