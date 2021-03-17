import React from 'react';
import styles from './TodoFilters.module.css';
import TemplateItem from '../../../components/TemplateItem/TemplateItem';
import MediaQuery from 'react-responsive';

const component = (props) => {

    const filterComponents = () => {
       return <div className={styles.todo_filter}>
                <button 
                    className={`${styles.btn} ${styles.filter} ${props.currentFilter === 'All' ?  styles.active : ''}`}
                    onClick={() => props.filterSelect('All')}
                    >
                All</button>

                <button
                    className={`${styles.btn} ${styles.filter} ${props.currentFilter === 'Active' ?  styles.active : ''}`} 
                    onClick={() => props.filterSelect('Active')}
                    >
                Active
                </button>

                <button 
                    className={`${styles.btn} ${styles.filter} ${props.currentFilter === 'Completed' ?  styles.active : ''}`}
                    onClick={() => props.filterSelect('Completed')}
                    >

                    Completed</button>
                </div>
    }

     return (
        <>
        <TemplateItem>

            <div className={styles.todo_menu}>

                <button className={styles.btn}>{props.todosLength} items left</button>

                <MediaQuery minWidth = { 851 }>
                        {filterComponents()}
                </MediaQuery>

                <button onClick={() => props.clearCompleted()} className={styles.btn}>Clear completed</button>

            </div>

        </TemplateItem>

        <MediaQuery maxWidth = { 850 }>
            <div className={styles.todo_filter_mobile}>
                <TemplateItem>
                    {filterComponents()}
                </TemplateItem>
            </div>
        </MediaQuery>

        </>
     )

}

export default component;