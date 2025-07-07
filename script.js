document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get input value and remove whitespace 

        if (taskText === '') {
            alert('Task cannot be empty!'); // Basic validation for empty tasks 
            return;
        }

        const li = document.createElement('li');

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', toggleTaskCompletion);
        li.appendChild(checkbox);

        // Task text span
        const taskSpan = document.createElement('span');
        taskSpan.classList.add('task-text');
        taskSpan.textContent = taskText;
        taskSpan.addEventListener('dblclick', () => editTask(taskSpan)); // Double-click to edit
        li.appendChild(taskSpan);

        // Action buttons container
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('task-actions');

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.innerHTML = '&#9998;'; // Pencil icon
        editBtn.addEventListener('click', () => editTask(taskSpan));
        actionsDiv.appendChild(editBtn);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&#10006;'; // Cross icon
        deleteBtn.addEventListener('click', () => deleteTask(li));
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(actionsDiv);
        taskList.appendChild(li);

        taskInput.value = ''; // Clear the input field
        saveTasks(); // Save tasks to local storage
    }

    // Function to toggle task completion
    function toggleTaskCompletion(event) {
        const checkbox = event.target;
        const li = checkbox.parentElement;
        li.classList.toggle('completed', checkbox.checked); // Add/remove 'completed' class based on checkbox state 
        saveTasks(); // Save tasks after completion change
    }

    // Function to edit a task
    function editTask(taskSpan) {
        const currentText = taskSpan.textContent;
        const newText = prompt('Edit your task:', currentText); // Prompt for new text 

        if (newText !== null && newText.trim() !== '') {
            taskSpan.textContent = newText.trim();
            saveTasks(); // Save tasks after editing
        } else if (newText !== null && newText.trim() === '') {
            alert('Task cannot be empty after editing!');
        }
    }

    // Function to delete a task
    function deleteTask(li) {
        if (confirm('Are you sure you want to delete this task?')) {
            taskList.removeChild(li); // Remove the task from the list 
            saveTasks(); // Save tasks after deletion
        }
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('.task-text').textContent;
            const isCompleted = li.classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Store as JSON string 
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')); // Parse JSON string back to array 
        if (tasks) {
            tasks.forEach(task => {
                const li = document.createElement('li');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.addEventListener('change', toggleTaskCompletion);
                li.appendChild(checkbox);

                const taskSpan = document.createElement('span');
                taskSpan.classList.add('task-text');
                taskSpan.textContent = task.text;
                taskSpan.addEventListener('dblclick', () => editTask(taskSpan));
                li.appendChild(taskSpan);

                const actionsDiv = document.createElement('div');
                actionsDiv.classList.add('task-actions');

                const editBtn = document.createElement('button');
                editBtn.classList.add('edit-btn');
                editBtn.innerHTML = '&#9998;';
                editBtn.addEventListener('click', () => editTask(taskSpan));
                actionsDiv.appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.innerHTML = '&#10006;';
                deleteBtn.addEventListener('click', () => deleteTask(li));
                actionsDiv.appendChild(deleteBtn);

                li.appendChild(actionsDiv);

                if (task.completed) {
                    li.classList.add('completed');
                }
                taskList.appendChild(li);
            });
        }
    }
});