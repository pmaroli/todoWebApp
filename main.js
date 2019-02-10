document.getElementById('todoForm').addEventListener('submit', newTodo)

function newTodo() {
	var taskName = document.getElementById('task').value;
	
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
	
	currentList.innerHTML = '';
	
	for( i=0 ; i < todoList.length ; i++ ) {
		var taskName = todoList[i].task;
		var complete = todoList[i].complete;
		var checkMark = '';
		
		//Add a check mark to the end of the task name to signify that task is complete
		if( complete == true ) {
			currentList.innerHTML += `${i + 1}. ` + taskName + '  ' + '✔' + '<br>';	
		} else {
			currentList.innerHTML += `${i + 1}. ` + taskName + '  ' + checkMark +
			'<button type="submit" onclick="todoComplete(\'' + `${i + 1}` + '\')">Complete</button><br>';	
		}
	}

}

function todoComplete(taskNumber) {
	var todoList = JSON.parse(localStorage.getItem('todoList'));
	
	for( i=0 ; i < todoList.length ; i++ ) {
		if( taskNumber == i+1 ) {
			todoList[i].complete = true;
		}
	}
	
	//Update the local storage appropriately
	localStorage.setItem('todoList', JSON.stringify(todoList));
	getTodo();
}

function todoRemove(taskNumber) {
	//Get the Title Text of the task to be deleted
	var titleToDelete = db.get(`todos[${taskNumber-1}].title`).value();
	
	//Delete the task object from the array
	db.get('todos')
	.remove( {title: `${titleToDelete}`} )
	.write();
}

function clearTodos() {
	var todoList = [];
	localStorage.setItem('todoList', JSON.stringify(todoList));

	getTodo();
}