import React, { Component } from 'react';

import FloatButton from '../components/floatButton/';

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
        this.handleClick('new', true);
    }

    handleOnClickConfirm() {
        this.handleClick('confirm', false);
    }

    handleOnClickCancel() {
        this.handleClick('cancel', false);
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
