import React, { Component } from 'react';
import './index.css';

class DashboardView extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentWillMount() {}

    componentDidMount() {}

    render() {
        const { userDetails } = this.props;
        return (
            <div className='user-details'>
                <div className='user-row'>
                    <div className='item-title'>User Name</div>
                    <div className='item-value'>{userDetails.userName}</div>
                </div>
                <div className='user-row'>
                    <div className='item-title'>Email</div>
                    <div className='item-value'>{userDetails.email}</div>
                </div>
                <div className='user-row'>
                    <div className='item-title'>Phone Number</div>
                    <div className='item-value'>{userDetails.phoneNumber}</div>
                </div>
                <div className='user-row'>
                    <div className='item-title'>Role</div>
                    <div className='item-value'>{userDetails.value}</div>
                </div>
            </div>
        );
    }
}

export default DashboardView;
