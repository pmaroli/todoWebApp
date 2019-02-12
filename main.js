document.getElementById('todoForm').addEventListener('submit', newTodo);

function newTodo() {
	var taskName = document.getElementById('task').value;
	
	// Will not allow empty tasks to be added
	if( taskName == '') {
		return
	}
	
	var todoItem = {
		task: taskName,
		complete: false
	};
	
	if(localStorage.getItem('todoList')) {
		var todoList = JSON.parse(localStorage.getItem('todoList'));
		todoList.push(todoItem);
		localStorage.setItem('todoList', JSON.stringify(todoList));
	} else {
		var todoList = [];
		todoList.push(todoItem);
		localStorage.setItem('todoList', JSON.stringify(todoList));
	}
	
	getTodo();
	
}

function getTodo() {
	var todoList = JSON.parse(localStorage.getItem('todoList'));
	var currentList = document.getElementById('currentList');
	while( currentList.firstChild ) {
		currentList.removeChild(currentList.firstChild); /* Clear the current list before updating */
	}
	
	for( i=0 ; i < todoList.length ; i++ ) {
		var taskName = todoList[i].task;
		var complete = todoList[i].complete;
		
		checkMark = '';
		if( complete == true ) {
			checkMark = ' ✔';
		}
		var text = taskName + checkMark;
		
		var li = document.createElement("LI");
		var a = document.createElement("a");
		var textnode = document.createTextNode(text);
		a.appendChild(textnode);
		a.href = '#';
		a.setAttribute("taskNumber", i+1); /* Create a CUSTOM attribute to keep track of task numbers */
		a.setAttribute("onclick", "toggleComplete(this.getAttribute('taskNumber'));"); /* Is there a better way to do this ??? */
		var span = document.createElement("SPAN"); /*Making the remove button a SPAN element allows it to be placed in the list nicely */
		var closetxt = document.createTextNode("\u00D7");
		span.className = "remove";
		span.appendChild(closetxt);
		span.setAttribute("taskNumber", i+1);
		span.setAttribute("onclick", "todoRemove(this.getAttribute('taskNumber'));");
		li.appendChild(a);
		li.appendChild(span);
		currentList.appendChild(li);
		
	}
}

function toggleComplete(taskNumber) {
	var todoList = JSON.parse(localStorage.getItem('todoList'));
	
	for( i=0 ; i < todoList.length ; i++ ) {
		if( taskNumber == i+1 ) {
			todoList[i].complete = (!todoList[i].complete); /* Toggles the complete status of the task */
		}
	}
	
	//Update the local storage appropriately
	localStorage.setItem('todoList', JSON.stringify(todoList));
	getTodo();
}

function todoRemove(taskNumber) {
		var todoList = JSON.parse(localStorage.getItem('todoList'));
		
		// Delete the task number
		todoList.splice( taskNumber-1, 1);
		
		//Update the local storage appropriately
		localStorage.setItem('todoList', JSON.stringify(todoList));
		getTodo();
}

document.getElementById('clearall').addEventListener("click", clearTodos);
function clearTodos() {
	var r = confirm("Do you want to delete all tasks?");

	if (r == true) {
	var emptyList = [];
	localStorage.setItem('todoList', JSON.stringify(emptyList));
	
	getTodo();

	} else {
		return
	}
}

function testing(input) {
	console.log(input);
}