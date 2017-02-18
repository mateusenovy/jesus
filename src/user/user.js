import React, { Component } from 'react';

import UserCard from './userCard';
import UserForm from './userForm';
import C from '../constants';
import * as UserActions from './userActions';

export default class UserComponent extends Component {

    constructor() {
        super();
        this.state = {
            showForm: false,
            currentUser: {}
        }
    }

    componentDidMount() {
        UserActions.findUsersOnce();
    }

    handleClick(eventName, currentUser) {
        let showForm = (eventName === C.USER_ACTION_BUTTON_NEW);
        this.setState({
            'showForm': showForm,
            'currentUser': currentUser || {}
        });
    }

    render() {
        let component = <UserCard handleOnClickNew={this.handleClick.bind(this)} />;

        if (this.state.showForm) {
            component = <UserForm
                currentUser={this.state.currentUser}
                handleOnClick={this.handleClick.bind(this)}
            />
        }

        return(
            <div>
                {component}
            </div>
        );
    }
}
