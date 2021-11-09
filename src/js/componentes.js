import { Todo } from '../Class';
import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorarTodos = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');

export const crearTodoHtml = ({ tarea, completado, id }) => {
    const htmlTodo = `
        <li class="${completado ? 'completed' : ''}" data-id="${id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${
                    completado ? 'cheked' : ''
                }>
                <label>${tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.appendChild(div.firstElementChild);
    return div.firstElementChild;
};

/// Eventos
txtInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && txtInput.value.length > 0) {
        const newTodo = new Todo(e.target.value);
        todoList.nuevoTodo(newTodo);
        crearTodoHtml(newTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (e) => {
    const nombreElemento = e.target.localName; // input, lalbel, button
    const todoElemento = e.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        //Click en el checkbox
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorarTodos.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFilters.addEventListener('click', (e) => {
    const filtro = e.target.text;

    if (!filtro) return;

    anchorFilters.forEach((element) => element.classList.remove('selected'));
    e.target.classList.add('.selected');

    for (const element of divTodoList.children) {
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) element.classList.add('hidden');
                break;
            case 'Completados':
                if (!completado) element.classList.add('hidden');
                break;
            default:
                break;
        }
    }
});
