import React, { Component } from 'react';

import FloatButton from '../components/floatButton/';
import C from '../constants';

export default class CongregationFloatButton extends Component {

    handleClick(eventName, showSaveAndCancel) {
        this.props.handleOnClick(eventName);
    }

    handleOnClickNew() {
        this.props.handleOnClickNew && this.props.handleOnClickNew();
        this.handleClick(C.ORG_ACTION_BUTTON_NEW, true);
    }

    handleOnClickConfirm() {
        this.props.handleOnClickConfirm && this.props.handleOnClickConfirm();
        this.handleClick(C.ORG_ACTION_BUTTON_CONFIRM, false);
    }

    handleOnClickCancel() {
        this.props.handleOnClickCancel && this.props.handleOnClickCancel();
        this.handleClick(C.ORG_ACTION_BUTTON_CANCEL, false);
    }

    render() {
        return(
            <div>
                <FloatButton
                    showSaveAndCancel={this.props.showSaveAndCancel}
                    handleOnClickNew={this.handleOnClickNew.bind(this)}
                    handleOnClickConfirm={this.handleOnClickConfirm.bind(this)}
                    handleOnClickCancel={this.handleOnClickCancel.bind(this)}
                />
            </div>
        );
    }
}
