import React from 'react';
import './App.css';
import './Theme.css';
import TodosManager from './containers/TodosManager/TodosManager';
import useLocalStorage from './containers/UseLocalStorage/UseLocaleStorage';

const App = (props) => {

    const [theme , setTheme] = useLocalStorage('theme',true);

    const handleToggleTheme = () => {
        setTheme(!theme);
    }

    return (
         <div className={`App ${theme ? 'Dark' : 'Light'}`}>

             <TodosManager toggleTheme={handleToggleTheme} theme={theme} /> 

             <p className='challengeByAlex'>Challenge by Frontend Mentor. Coded by <a href='https://www.frontendmentor.io/profile/ByKyZo'>Alex</a>.</p>

         </div>
    )

}

export default App;