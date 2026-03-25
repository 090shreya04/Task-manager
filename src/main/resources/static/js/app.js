document.addEventListener('DOMContentLoaded', () => {
    // === State Management ===
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // === DOM Elements ===
    const taskForm = document.getElementById('taskFrom');
    const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
    const taskIdInput = document.getElementById('taskId');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescInput = document.getElementById('taskDesc');
    const taskCategoryInput = document.getElementById('taskCategory');
    const taskPriorityInput = document.getElementById('taskPriority');
    const taskDueDateInput = document.getElementById('taskDueDate');

    // Filter Elements
    const searchInput = document.getElementById('searchInput');
    const filterCategory = document.getElementById('filterCategory');
    const filterPriority = document.getElementById('filterPriority');

    // Counts
    const counts = {
        todo: document.getElementById('count-todo'),
        'in-progress': document.getElementById('count-in-progress'),
        done: document.getElementById('count-done')
    };

    // Columns
    const columns = {
        todo: document.getElementById('todo-tasks'),
        'in-progress': document.getElementById('in-progress-tasks'),
        done: document.getElementById('done-tasks')
    };

    // === Initial Render ===
    renderTasks();

    // === Event Listeners ===
    taskForm.addEventListener('submit', handleTaskSubmit);
    
    // Search and Filter Listeners
    if (searchInput) searchInput.addEventListener('input', renderTasks);
    if (filterCategory) filterCategory.addEventListener('change', renderTasks);
    if (filterPriority) filterPriority.addEventListener('change', renderTasks);
    
    // Clear modal on hidden
    document.getElementById('taskModal').addEventListener('hidden.bs.modal', resetForm);

    // === Theme Management ===
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');

    let currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    });

    function applyTheme(theme) {
        document.body.setAttribute('data-bs-theme', theme);
        if(theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // Setup Drag and Drop Containers
    document.querySelectorAll('.kanban-col').forEach(col => {
        const bodyObj = col.querySelector('.kanban-body');
        
        col.addEventListener('dragover', e => {
            e.preventDefault();
            bodyObj.classList.add('drag-over');
            
            const draggingCard = document.querySelector('.dragging');
            if (draggingCard) {
                const afterElement = getDragAfterElement(bodyObj, e.clientY);
                if (afterElement == null) {
                    bodyObj.appendChild(draggingCard);
                } else {
                    bodyObj.insertBefore(draggingCard, afterElement);
                }
            }
        });

        col.addEventListener('dragleave', () => {
             bodyObj.classList.remove('drag-over');
        });

        col.addEventListener('drop', e => {
             e.preventDefault();
             bodyObj.classList.remove('drag-over');
             
             const draggingCard = document.querySelector('.dragging');
             if(draggingCard) {
                 const id = draggingCard.dataset.id;
                 const newStatus = col.dataset.status;
                 window.updateTaskStatus(id, newStatus);
             }
        });
    });

    // === Core Functions ===

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        // Clear all columns
        Object.values(columns).forEach(col => col.innerHTML = '');

        // Reset Counts
        Object.keys(counts).forEach(key => counts[key].textContent = '0');

        // Get filter values safely
        const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
        const categoryFilter = filterCategory ? filterCategory.value : 'All';
        const priorityFilter = filterPriority ? filterPriority.value : 'All';

        const filteredTasks = tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchQuery) ||
                                  (task.description && task.description.toLowerCase().includes(searchQuery));
            const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter;
            const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
            return matchesSearch && matchesCategory && matchesPriority;
        });

        filteredTasks.forEach(task => {
            const taskCard = createTaskElement(task);
            if (columns[task.status]) {
                columns[task.status].appendChild(taskCard);
            }
        });

        // Update Counts
        const countObj = filteredTasks.reduce((acc, curr) => {
            acc[curr.status] = (acc[curr.status] || 0) + 1;
            return acc;
        }, {});

        Object.keys(countObj).forEach(key => {
            if(counts[key]) {
                counts[key].textContent = countObj[key];
            }
        });
    }

    function handleTaskSubmit(e) {
        e.preventDefault();
        
        const id = taskIdInput.value;
        const newTask = {
            id: id ? id : Date.now().toString(),
            title: taskTitleInput.value.trim(),
            description: taskDescInput.value.trim(),
            category: taskCategoryInput.value,
            priority: taskPriorityInput.value,
            dueDate: taskDueDateInput.value,
            status: id ? getTaskStatus(id) : 'todo'
        };

        if (id) {
            // Update
            tasks = tasks.map(t => t.id === id ? newTask : t);
        } else {
            // Create
            tasks.push(newTask);
        }

        saveTasks();
        taskModal.hide();
        resetForm();
    }

    function getTaskStatus(id) {
        const task = tasks.find(t => t.id === id);
        return task ? task.status : 'todo';
    }

    window.updateTaskStatus = function(id, newStatus) {
        const task = tasks.find(t => t.id === id);
        if (task && task.status !== newStatus) {
             task.status = newStatus;
             saveTasks();
        }
    }

    window.editTask = function(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            taskIdInput.value = task.id;
            taskTitleInput.value = task.title;
            taskDescInput.value = task.description;
            taskCategoryInput.value = task.category;
            taskPriorityInput.value = task.priority;
            taskDueDateInput.value = task.dueDate;
            
            document.getElementById('taskModalLabel').textContent = 'Edit Task';
            taskModal.show();
        }
    }

    window.deleteTask = function(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(t => t.id !== id);
            saveTasks();
        }
    }

    function resetForm() {
        taskForm.reset();
        taskIdInput.value = '';
        document.getElementById('taskModalLabel').textContent = 'Add New Task';
    }

    // === UI Elements ===

    function createTaskElement(task) {
        const card = document.createElement('div');
        card.classList.add('task-card', `priority-${task.priority.toLowerCase()}`);
        card.setAttribute('draggable', 'true');
        card.dataset.id = task.id;

        // format date nicely
        const dateStr = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date';

        card.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge badge-${task.category.toLowerCase()}">${task.category}</span>
                <span class="badge badge-${task.priority.toLowerCase()}"><i class="fa-solid fa-flag me-1"></i>${task.priority}</span>
            </div>
            <div class="task-title">${escapeHTML(task.title)}</div>
            ${task.description ? `<div class="task-desc">${escapeHTML(task.description)}</div>` : ''}
            <div class="mt-2 text-start">
                <select class="status-select" onchange="updateTaskStatus('${task.id}', this.value)">
                    <option value="todo" ${task.status === 'todo' ? 'selected' : ''}>To Do</option>
                    <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                    <option value="done" ${task.status === 'done' ? 'selected' : ''}>Done</option>
                </select>
            </div>
            <div class="task-meta mt-2">
                <span><i class="fa-regular fa-clock me-1"></i>${dateStr}</span>
                <div class="task-actions">
                    <button class="btn-action btn-edit" onclick="editTask('${task.id}')" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn-action btn-delete" onclick="deleteTask('${task.id}')" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        `;

        // Drag Events for Task Card
        card.addEventListener('dragstart', () => {
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });

        return card;
    }

    // Drag Helper functions
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            // find vertical center of each box
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    
    // Security to prevent XSS in task titles and descriptions
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
