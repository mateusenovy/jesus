import React, { Component } from 'react';

import FloatButton from '../components/floatButton/';
import C from '../constants';

export default class OrganizationFloatButton extends Component {

    constructor() {
        super();

        this.state = {
            showSaveAndCancel: false
        }
    }

    handleClick(eventName, showSaveAndCancel) {
        this.props.handleClick(eventName);
        this.setState({'showSaveAndCancel': showSaveAndCancel});
    }

    handleOnClickNew() {
        this.handleClick(C.ORG_ACTION_BUTTON_NEW, true);
    }

    handleOnClickConfirm() {
        this.handleClick(C.ORG_ACTION_BUTTON_CONFIRM, false);
    }

    handleOnClickCancel() {
        this.handleClick(C.ORG_ACTION_BUTTON_CANCEL, false);
    }

    render() {
        return(
            <div>
                <FloatButton
                    showSaveAndCancel={this.state.showSaveAndCancel}
                    handleOnClickNew={this.handleOnClickNew.bind(this)}
                    handleOnClickConfirm={this.handleOnClickConfirm.bind(this)}
                    handleOnClickCancel={this.handleOnClickCancel.bind(this)}
                />
            </div>
        );
    }
}
