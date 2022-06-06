"use strict";

function toDoShka() {
    const todoForm = document.querySelector('.todo-form');
    const todoFormInput = todoForm.querySelector('.input__task');
    const todoTasks = document.querySelector('.todo-tasks');
    const todoTasksCompleted = document.querySelector('.todo-tasks-completed');
    const btnClearList = document.querySelector('.btn__form__clear');
    const lst = window.localStorage;

    let taskArr = lst.tasks ? JSON.parse(lst.getItem('tasks')) : [];
    const pushTask = () => {
        const task = {
            text: todoFormInput.value,
            completed: false
        }
        taskArr.push(task);
        todoFormInput.value = '';
    }

    const setTask = () => {
        lst.setItem("tasks", JSON.stringify(taskArr));
    }

    const editTask = (idx) => {
        const formEdit = document.querySelectorAll('.task__form-edit');
        const formEditText = document.querySelectorAll('.task__form-edit-text');
        formEdit[idx].classList.toggle('visible');

        formEdit.forEach((formEdit, i) => {
            formEdit.addEventListener("submit", (e) => {
                e.preventDefault();
                if (formEditText[i].value) {
                    taskArr[i].text = formEditText[i].value;
                    setTask();
                    renderTask();
                }

            })
        });
    }
    const editTask2 = (e) => {
        const formEdit = document.querySelectorAll('.task__form-edit');
        const formEditText = document.querySelectorAll('.task__form-edit-text');
        formEdit[idx].classList.toggle('visible');
        formEdit.forEach((formEdit, i) => {
            formEdit.addEventListener("submit", (e) => {
                e.preventDefault();
                if (formEditText[i].value) {
                    taskArr[i].text = formEditText[i].value;
                    setTask();
                    renderTask();
                }

            })
        });
    }

    const switchComplete = () => {
        const btnComplete = document.querySelectorAll('.btn__complite');
        btnComplete.forEach((btn, i) => {
            btn.addEventListener("click", () => {
                taskArr[i].completed = !taskArr[i].completed;
                setTask();
                renderTask();
            })
        });
    }
    const deleteTask = (idx) => {
        const btnDelete = document.querySelectorAll('.btn__delete');
        btnDelete.forEach((btn) => {
            btn.addEventListener("click", () => {
                taskArr.splice(idx, 1);
                setTask();
                renderTask();
            })
        });
    }


    const filterTasks = () => {
        const activeTasks = taskArr.length ? taskArr.filter(item => item.completed === false) : [];
        const completedTasks = taskArr.length ? taskArr.filter(item => item.completed === true) : [];
        taskArr = [...activeTasks, ...completedTasks];
    }

    const createTask = (task, i) => {
        const completedClass = `${task.completed === true ? ' complite': ''}`;
        const svg = (id, className = null) => {
            return `
            <svg class = "svg svg-${id} ${className || ''}" >
                    <use xlink:href="assets/svg/svgSprite.svg#${id}"></use>
                </svg>
            `
        }
        return `
    <li class="task">
    <div>
    <span class="task__value ${completedClass}" >${i + 1}) ${task.text} </span>
     <form class="task__form-edit">
            <textarea class="task__form-edit-text">${task.text}</textarea>
            <button class="btn btn__form btn__edit-apply">Применить</button>
         </form> 
    </div>
        <div class="task__controls">
            <button title = "Изменить" class = "btn btn__form btn__edit" >
                ${svg('edit')}
            </button>
            <button title="${task.completed === true ? 'Не выполнено': 'Выполнено'}" class="btn btn__form btn__complite">${task.completed === true ? svg('checkMark', 'active'): svg('checkMark')}</button>
            <button title="Удалить" class="btn btn__form btn__delete">
                ${svg('trash')}
            </button>
        </div>
    </li>
    `
    }

    const renderTask = () => {
        const noTasks = () => todoTasks.innerHTML = '<p>Задач нет! Дабавьте задачу</p>';
        todoTasks.innerHTML = '';
        todoTasksCompleted.innerHTML = '';
        if (lst.tasks) {
            filterTasks();
            taskArr.forEach((task, i) => {
                todoTasks.innerHTML += !task.completed ? createTask(task, i) : '';
                todoTasksCompleted.innerHTML += task.completed ? createTask(task, i) : '';

                const btnEdit = document.querySelectorAll('.btn__edit');
                btnEdit.forEach((btnEdit, idx) => btnEdit.addEventListener('click', () => {
                    editTask(idx);
                }))

                switchComplete();
                deleteTask(i);


            })
            if (lst.tasks.length < 4) {
                noTasks();
            }
        } else {
            noTasks();
        }
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (todoFormInput.value !== '') {
            pushTask();
            setTask();
            renderTask();
        } else {
            alert('Напишите задачу...');
        }
    })
    btnClearList.addEventListener('click', () => {
        const question = confirm('Вы уверены, что хотите полностью отчистить список задач!?');
        if (question) {
            lst.clear();
            taskArr = [];
            renderTask();
        }
    })

    renderTask();
}


toDoShka();