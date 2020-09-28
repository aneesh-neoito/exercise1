import React, { useEffect, memo, useRef, useContext } from 'react';
import styles from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const Cockpit = props => {
  let btnStyles = '';
  const assignedClasses = [];
  const btnRef = useRef(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect...');
    /*const timer = setTimeout(() => {
      console.log('Data Updated');
    }, 1000);*/
    btnRef.current.click();
    return () => {
      //clearTimeout(timer);
      console.log('[Cockpit.js] cleanup in useEffect')
    }
  }, []);
  // To make use effect only once(i.e. no dependencies),
  // pass an empty array as 2nd set of argument below

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect...')
    return () => {
      console.log('[Cockpit.js] cleanup in 2nd useEffect')
    }
  })

  if (props.personsLength <= 2) {
    assignedClasses.push(styles.bold);
  }

  if (props.personsLength <= 1) {
    assignedClasses.push(" " + styles.red);
  }

  if (props.showPersons) {
    btnStyles = styles.Red;
  }

  return (
    <div className={styles.Cockpit}>
      <h1>{props.appTitle}</h1>
      <p className={assignedClasses.join(' ')}>Click on the button below</p>
      <button ref={btnRef} className={btnStyles} onClick={props.clicked}>Toggle Persons</button>
      {<button onClick={authContext.login}>Log In</button>}
    </div>
  );
};

export default memo(Cockpit);
// React memo will allow updating the functional component
// only if there is a change in the input props, thus improves optimization