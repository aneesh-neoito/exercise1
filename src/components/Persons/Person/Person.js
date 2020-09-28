import React, { Component } from 'react';
import styles from './Person.module.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Aux';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super();
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElementRef.current.focus();
    }

    render() {
        return (
            <Aux>
                {this.context.authenticated ?
                    <p>Authenticated</p>
                    : <p>Please Login!</p>
                }
                <p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age} years old.</p>
                <p>{this.props.children}</p>
                <input
                    ref={this.inputElementRef}
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux>
        );
    }
}

Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
    click: PropTypes.func
}

export default withClass(Person, styles.Person);