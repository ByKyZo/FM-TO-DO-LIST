import React from 'react';
import DarkLogo from '../../../assets/icon-moon.svg';
import LightLogo from '../../../assets/icon-sun.svg';
import styles from './TodoHeader.module.css';

const TodoHeader = (props) => {

     return (
         <div className={styles.todo_header}>

             <h1 className={styles.todo_title}>TODO</h1>

             <button onClick={() => props.toggleTheme()} className={styles.todo_toggleTheme}><img src={props.theme ? LightLogo : DarkLogo} alt='theme'></img></button>

         </div>
     )

}

export default TodoHeader;