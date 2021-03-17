import React , { useState } from 'react';
import styles from './AddTodo.module.css';
import TemplateItem from '../../../components/TemplateItem/TemplateItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddTodo = (props) => {

    const [newTodo , setNewTodo] = useState('')

    const addNewTodo = (e) => {
        if (newTodo === '') return;

        if (e.keyCode === 13) {
            props.addNewTodo(newTodo)
            setNewTodo('')
        }
    }

    const addNewTodoByBtn = () => {

        if (newTodo === '') return;

        props.addNewTodo(newTodo)
        setNewTodo('')
    }

     return (
        <div className={styles.todo_addTodo}>

            <TemplateItem>

                <div className={styles.todo_checker}>
                    <div className={styles.fakeCheckMark} onClick={() => addNewTodoByBtn()}>
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </div>
                </div>
                
                <input className={styles.todo_inputAddTodo}  
                    type='text' 
                    placeholder='Create a new todo...'
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={addNewTodo}>
                </input>
                
            </TemplateItem>

        </div>
     )

}

export default AddTodo;