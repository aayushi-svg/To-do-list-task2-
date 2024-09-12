document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Save tasks to local storage
    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to the DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        
        // Task Text with Strike-through for Completed Tasks
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        if (task.completed) {
            taskSpan.style.textDecoration = 'line-through';
            taskSpan.style.color = '#999';
        }

        // Complete Button (to mark task as done)
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '✔';  // Cute checkmark
        completeBtn.classList.add('complete');
        completeBtn.addEventListener('click', () => toggleCompleteTask(task.text));

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '📝';  // Emoji for Edit
        editBtn.classList.add('edit');
        editBtn.addEventListener('click', () => editTask(task.text));

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '❌';  // Cute delete icon
        deleteBtn.addEventListener('click', () => deleteTask(task.text));

        li.appendChild(taskSpan);
        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    };

    // Add a new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText === '') return;

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        saveTasks(tasks);
        addTaskToDOM(newTask);

        // Cute notification for adding a task
        alert('Yay! You added a new task! 🌸');

        taskInput.value = '';
    });

    // Delete a task
    const deleteTask = (taskText) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        saveTasks(tasks);
        taskList.innerHTML = '';
        loadTasks();
        alert('Task deleted! 😢');
    };

    // Edit a task
    const editTask = (taskText) => {
        const newTaskText = prompt('Edit your task: ', taskText);
        if (newTaskText === null || newTaskText.trim() === '') return;

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.text === taskText);
        if (taskIndex !== -1) {
            tasks[taskIndex].text = newTaskText.trim();
            saveTasks(tasks);
            taskList.innerHTML = '';
            loadTasks();
            alert('Task updated! ✨');
        }
    };

    // Toggle task completion (mark as done)
    const toggleCompleteTask = (taskText) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.text === taskText);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTasks(tasks);
            taskList.innerHTML = '';
            loadTasks();

            if (tasks[taskIndex].completed) {
                alert('Congrats! Task completed! 🎉');
            } else {
                alert('Task marked as incomplete. Keep going! 💪');
            }
        }
    };

    // Initial load of tasks
    loadTasks();
});