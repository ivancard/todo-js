import './styles.css';
import { Todo, TodoList } from './Class';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach((element) => {
    crearTodoHtml(element);
});
