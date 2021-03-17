import React , { useState , useEffect } from 'react';
import styles from './Todo.module.css';
import deleteImg from '../../../assets/icon-cross.svg'
import TemplateItem from '../../../components/TemplateItem/TemplateItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit , faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Todo = (props) => {

    const [todoEdit , setTodoEdit] = useState('t');

    useEffect(() => {

        setTodoEdit(props.isTodoEdit.todo);

    },[props.isTodoEdit])

    const handleTodoIsChecked = (e) => {
        props.isTodoChecked(props.todos.id)
    }
    
    return (
        <div className={styles.todo}>

        <TemplateItem speClass='todo-container'>
        
            <label className={styles.todo_checker}>
                <input className={styles.inputCheckBox} type='checkbox' hidden onChange={handleTodoIsChecked} checked={props.todos.checked ? true : false}/>
                <div className={styles.customCheckMark}></div>
            </label>

            <div className={styles.todo_content}>

                {
                    props.isTodoEdit.id !== props.todos.id ? <span className={props.todos.checked ? styles.todo_checked : ''}>{props.children}</span>

                    : <input 
                        type='text' 
                        className={styles.todo_editInput}
                        onChange={(e) => setTodoEdit(e.target.value)} 
                        onKeyDown={(e) => e.keyCode === 13 && props.setEdit(props.todos.id,todoEdit,true)}
                        autoFocus
                        value={todoEdit || ''}>
                    </input>
                }

                <button 
                    className={styles.todo_btnEdit}
                    onClick={() => props.setEdit(props.todos.id,todoEdit)}
                    >
                    {props.isTodoEdit.id !== props.todos.id ? 
                        <FontAwesomeIcon 
                            icon={faEdit}
                        />
                        :
                        <FontAwesomeIcon 
                            onClick={() => props.setEdit(props.todos.id,todoEdit,true)}
                            icon={faPlusCircle}
                        />
                    }
                </button>

                <button 
                    className={styles.todo_btnDelete} 
                    onClick={() => props.removeTodo(props.todos.id)}>
                    <img src={deleteImg} alt='todo-delete'></img>
                </button> 

            </div>

        </TemplateItem>

        </div>
     )

}

export default Todo;