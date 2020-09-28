import React, { PureComponent } from 'react';
import Person from './Person/Person';

// Use only in places where there is a chance of error
// and you, as a developer, can't control or prevent.
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

class Persons extends PureComponent {
  // PureComponent has the same effect as shouldComponentUpdate

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[Persons.js] shouldComponentUpdate');
  //   if (nextProps.persons !== this.props.persons) {
  //     console.log('[Persons.js] Yes');
  //     return true;
  //   }
  //   else {
  //     console.log('[Persons.js] No');
  //     return false;
  //   }
  // }

  render() {
    const persons = this.props.persons.map((person, index) => {
      return <ErrorBoundary key={person.id}>
        <Person key={person.id}
          name={person.name}
          age={person.age}
          changed={(event) => this.props.changed(event, person.id)}
          click={() => this.props.clicked(index)}>
          Hobby: Coding</Person>
      </ErrorBoundary>
    });
    return persons;
  }
}

export default Persons;