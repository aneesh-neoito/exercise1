import React, { Component } from 'react';
import styles from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

class App extends Component {
  state = {
    persons: [
      { id: 'hdfiuehd', name: 'Aneesh', age: 27 },
      { id: 'hjdiuwjs', name: "Anup", age: 31 },
      { id: 'poiuyhkk', name: "Sujin", age: 26 }
    ],
    showpersons: false,
    showCockpit: true,
    authenticated: false
  };

  deleteNameHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1)
    this.setState({ persons: persons });
  }

  nameChangehandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons });
  }

  toggleShowPersons = () => {
    const doesShow = this.state.showpersons;
    this.setState({ showpersons: !doesShow });
  }

  toggleHeaders = () => {
    // If state update depends on previous state,
    // then use this method to guarentee that we get the
    // expected previous state.
    this.setState((prevState, props) => {
      return {
        showCockpit: !prevState.showCockpit
      }
    })
  }

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render() {
    let persons = null;
    if (this.state.showpersons) {
      persons = <Persons
        persons={this.state.persons}
        changed={this.nameChangehandler}
        clicked={this.deleteNameHandler}
      />;
    }
    return (
      <Aux>
        <button
          onClick={this.toggleHeaders}>
          Toggle Headers</button>
        <AuthContext.Provider
        value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler
        }}>
          {
            this.state.showCockpit ?
              <Cockpit
                appTitle={this.props.appTitle}
                personsLength={this.state.persons.length}
                showPersons={this.state.showpersons}
                clicked={this.toggleShowPersons}/>
              : null
          }
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, styles.App);
