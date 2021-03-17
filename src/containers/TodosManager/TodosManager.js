import React , { useState ,useEffect } from 'react';
import styles from './TodosManager.module.css';
import TodoHeader from './TodoHeader/TodoHeader';
import AddTodo from './AddTodo/AddTodo';
import Todo from './Todo/Todo';
import TodoFilter from './TodoFilter/TodoFilter';
import useLocalStorage from '../UseLocalStorage/UseLocaleStorage';
import uuid from 'react-uuid';
import { DragDropContext , Droppable , Draggable} from 'react-beautiful-dnd';

const TodosManager = (props) => {

    const [itemsLeft , setItemsLeft] = useState(0);

    const [todoEdit , setTodoEdit] = useState('');

    const [todos , setTodos] = useLocalStorage('todo',[
        {id : uuid() , todo : 'Complete online JavaScript course', checked : false},
        {id : uuid() , todo : 'Jog around the park 3x' , checked : false},
        {id : uuid() , todo : '10 minutes meditation' , checked : false},
        {id : uuid() , todo : 'Read for 1 hour' , checked : false},
        {id : uuid() , todo : 'Pick up groceries' , checked : false},
        {id : uuid() , todo : 'Complete Todo App on Frontend Mentor' , checked : true},
    ])

    const [filter , setFilter] = useState('All');

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(todos);
        const [reorderItem] = items.splice(result.source.index,1);
        items.splice(result.destination.index,0, reorderItem);

        setTodos(items);
    }

    const handleAddNewTodo = (todoValue) => {
        setTodos([...todos , {id : uuid(), todo : todoValue, checked : false}]);
    }

    const handleRemoveNewTodo = (id) => {
        const todoIndex = todos.findIndex(todo => todo.id === id);
        setTodos(todos.filter((todo , index) => index !== todoIndex));
    }

    const handleTodoChecked = (id) => {
        const todoIndex = todos.findIndex(todo => todo.id === id);

        setTodos([...todos] , todos[todoIndex].checked = !todos[todoIndex].checked);

        handleItemLeft();
    }

    const handleItemLeft = () => {
        let todosLefts = 0;

        todos.forEach(todo => {

            if (!todo.checked) todosLefts++
        })
        setItemsLeft(todosLefts)
    }

    const handleSetFilter = (currentFilter) => {
        setTodoEdit('')
        setFilter(currentFilter)
    }

    const handleClearCompleted = () => {
        setTodos(todos.filter((todo) => todo.checked === false))
    }

    const handleIsEdit = (id,newTodoValue,submit = false) => {
        const todoIndex = todos.findIndex(todo => todo.id === id);

        if (todos[todoIndex].id === todoEdit.id)setTodoEdit('')
        else setTodoEdit(todos[todoIndex])

        if (submit && newTodoValue) setTodos([...todos],todos[todoIndex].todo = newTodoValue);
    }

    useEffect(() => handleItemLeft())

    useEffect(() => setTodoEdit(''), [todos]);

    const todoDisplay = (todo,index) => {
        return <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                        <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>
                            <Todo 
                                key={todo.id} 
                                todos={{...todo}}
                                removeTodo={handleRemoveNewTodo} 
                                isTodoChecked={handleTodoChecked}
                                isTodoEdit={todoEdit}
                                setEdit={handleIsEdit}
                                >
                                {todo.todo}
                            </Todo>  
                        </li>
                    )}
                </Draggable> 
    }

    return (
        <div className={styles.todos_manager}>

            <TodoHeader toggleTheme={props.toggleTheme} theme={props.theme} />

            <AddTodo addNewTodo = {handleAddNewTodo} /> 

        <div className={styles.todos_manager_content}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='todos'>
                {(provided) => (
                    <ul className={styles.todos_list} {...provided.droppableProps} ref={provided.innerRef}>
                            {todos.map((todo, index) => {
                                    if (filter === 'All'){

                                        return todoDisplay(todo,index);

                                    } else if (filter === 'Active'){
                                        if (!todo.checked){

                                            return todoDisplay(todo,index);
                                        }
                                    } else if (filter === 'Completed') {
                                        if (todo.checked){
                                            
                                            return todoDisplay(todo,index);
                                        }
                                    } 
                                    return null;
                                })}
                            {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
            <TodoFilter 
            clearCompleted={handleClearCompleted}
            filterSelect={handleSetFilter} 
            currentFilter={filter} 
            todosLength = {itemsLeft} 
            />
        </div>

            <h4 style={{textAlign : 'center', marginTop : '50px' , color : '#585a71'}}>Drag and drop to reorder list</h4>

        </div>
    )

}

export default TodosManager;