import React from 'react';
import styles from './TemplateItem.module.css';

const TemplateItem = (props) => {

     return (
         <div className={styles.item}>

             {props.children}

         </div>
     )

}

export default TemplateItem;