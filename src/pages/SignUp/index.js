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
import { Radio, RadioGroup} from 'react-radio-group'

class SignUp extends Component {
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

        if (isEmpty(formData.userName)) {
            errors.userName = `Username can't be blank`;
        }

        if (isEmpty(formData.phoneNumber)) {
            errors.phoneNumber = `Phone Number can't be blank`;
        } else if (
            !isLength(formData.phoneNumber, { gte: 9, lte: 10, trim: true })
        ) {
            errors.phoneNumber = `Enter Valid phone number`;
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

    keypress = (event) => {
        const pattern = /^[1-9][0-9]*(\.\d{0,4})?$/;

        const inputChar = String.fromCharCode(event.charCode);
        if (
            event.keyCode !== 8 &&
            !pattern.test(event.target.value.concat(inputChar))
        ) {
            event.preventDefault();
        }

        if (event.target.value.length >= 10) {
            event.preventDefault();
        }
    };

    register = (e) => {
        e.preventDefault();

        let errors = this.validateLoginForm();
        if (errors === true) {
            localStorage.setItem('loggedIn', true);
            localStorage.setItem(
                'userDetails',
                JSON.stringify(this.state.formData)
            );
            history.push('/dashboard');
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true,
            });
        }
    };

    handleRegisterClick() {
        history.push('/');
    }

    render() {
        const { errors, formSubmitted } = this.state;

        return (
            <div className='Login'>
                <div className='title'>Register</div>
                <form onSubmit={this.register}>
                    <FormGroup
                        controlId='userName'
                        validationState={
                            formSubmitted
                                ? errors.userName
                                    ? 'error'
                                    : 'success'
                                : null
                        }
                    >
                        <label>User Name</label>
                        <FormControl
                            type='text'
                            name='userName'
                            placeholder='Enter User Name'
                            onChange={this.handleInputChange}
                        />
                        {errors.userName && <small>{errors.userName}</small>}
                    </FormGroup>
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
                        controlId='phoneNumber'
                        validationState={
                            formSubmitted
                                ? errors.phoneNumber
                                    ? 'error'
                                    : 'success'
                                : null
                        }
                    >
                        <label>Phone Number</label>
                        <FormControl
                            type='text'
                            name='phoneNumber'
                            placeholder='Enter Phone Number'
                            onKeyPress={this.keypress}
                            onChange={this.handleInputChange}
                        />
                        {errors.phoneNumber && (
                            <small>{errors.phoneNumber}</small>
                        )}
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

                        <RadioGroup name="role" >
                                <div className="radio-button-background">
                                    <Radio value="Admin" className="radio-button" onChange={this.handleInputChange} />Admin
                                </div>
                                <div className="radio-button-background">
                                    <Radio value="normal" className="radio-button"  onChange={this.handleInputChange} />normal
                                </div>
                       </RadioGroup>                   
                    <Button type='submit' bsStyle='primary'>
                        Sign-Up
                    </Button>
                    <Button
                        variant='lnik'
                        bsStyle='primary'
                        onClick={this.handleRegisterClick}
                    >
                        Cancel
                    </Button>
                 
                </form>
            </div>
        );
    }
}

export default SignUp;
