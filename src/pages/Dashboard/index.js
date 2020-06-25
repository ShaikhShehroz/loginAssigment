import React, { Component } from 'react';
import DashboardView from './dashobard-view';
import DashboardEdit from './dashobard-edit';
import { Button } from 'react-bootstrap';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {}, // Contains User Details form data
            editable: false,
        };
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            userDetails: this.getUserDetails(),
        });
        this.editRef = React.createRef();
    }

    getUserDetails() {
        return JSON.parse(localStorage.getItem('userDetails'));
    }

    handleEditClick = (event) => {
        this.setState({
            editable: true,
        });
    };

    handleSave = (e) => {
        const editedValue = this.editRef.current.saveEditValue(e);
        this.setState({
            ...this.state,
            userDetails: editedValue,
            editable: false,
        });
    };

    handleCancel = (e) => {
        this.setState({
            ...this.state,
            editable: false,
        });
    };

    render() {
        const { userDetails, editable } = this.state;
        let viewCmp;
        if (!editable) {
            viewCmp = (
                <div>
                    <div className='heading'>
                        <div className='title'>User Details {editable}</div>
                        <div className='actions'>
                            <div className='edit-btn'>
                                <i
                                    className='fa fa-pencil'
                                    onClick={this.handleEditClick}
                                ></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <DashboardView
                            userDetails={userDetails}
                        ></DashboardView>
                    </div>
                </div>
            );
        } else {
            viewCmp = (
                <div>
                    <div className='heading'>
                        <div className='title'>
                            User Details {this.state.editable}
                        </div>
                        <div className='actions'>
                            <div className='edit-btn'>
                                <Button
                                    variant='primary'
                                    onClick={this.handleSave}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant='link'
                                    onClick={this.handleCancel}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <DashboardEdit
                            ref={this.editRef}
                            userDetails={userDetails}
                        ></DashboardEdit>
                    </div>
                </div>
            );
        }
        return <div className='Login'>{viewCmp}</div>;
    }
}
export default Dashboard;
