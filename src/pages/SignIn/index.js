import React, { Component } from 'react';
import { Button, Row, FormGroup, FormControl } from 'react-bootstrap';
import './index.css';
import history from '../../services/history';
import {
    isEmail,
    isEmpty,
    isLength,
    isContainWhiteSpace,
} from '../../shared/validator';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData,
        });
    };

    validateLoginForm = (e) => {
        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = 'Please enter a valid email';
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        } else if (isContainWhiteSpace(formData.password)) {
            errors.password = 'Password should not contain white spaces';
        } else if (
            !isLength(formData.password, { gte: 6, lte: 16, trim: true })
        ) {
            errors.password = "Password's length must between 6 to 16";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    };

    login = (e) => {
        e.preventDefault();

        let errors = this.validateLoginForm();

        if (errors === true) {
            if (this.userExists()) {
                localStorage.setItem('loggedIn', true);
                history.push('/dashboard');
            } else {
                alert('Please Register Yourself');
            }
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true,
            });
        }
    };

    userExists() {
        const { formData } = this.state;
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (!userDetails) {
            return false;
        }
        if (
            userDetails.email === formData.email &&
            userDetails.password === formData.password
        ) {
            return true;
        } else {
            return false;
        }
    }

    handleRegisterClick() {
        history.push('/register');
    }
    render() {
        const { errors, formSubmitted } = this.state;

        return (
            <div className='Login'>
                <div className='title'>Login</div>
                <form onSubmit={this.login}>
                    <FormGroup
                        controlId='email'
                        validationState={
                            formSubmitted
                                ? errors.email
                                    ? 'error'
                                    : 'success'
                                : null
                        }
                    >
                        <label>Email</label>
                        <FormControl
                            type='text'
                            name='email'
                            placeholder='Enter your email'
                            onChange={this.handleInputChange}
                        />
                        {errors.email && <small>{errors.email}</small>}
                    </FormGroup>
                    <FormGroup
                        controlId='password'
                        validationState={
                            formSubmitted
                                ? errors.password
                                    ? 'error'
                                    : 'success'
                                : null
                        }
                    >
                        <label>Password</label>
                        <FormControl
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            onChange={this.handleInputChange}
                        />
                        {errors.password && <small>{errors.password}</small>}
                    </FormGroup>
                    <Button type='submit' bsStyle='primary'>
                        Sign-In
                    </Button>
                    <Button
                        variant='lnik'
                        bsStyle='primary'
                        onClick={this.handleRegisterClick}
                    >
                        Register
                    </Button>
                </form>
            </div>
        );
    }
}

export default SignIn;
