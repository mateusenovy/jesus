import React, { Component } from 'react';

import FloatButton from '../components/floatButton/';
import C from '../constants';

export default class GridFloatButton extends Component {

    handleClick(eventName) {
        this.props.handleOnClick(eventName);
    }

    handleOnClickNew() {
        this.props.handleOnClickNew && this.props.handleOnClickNew();
        this.handleClick(C.GRID_ACTION_BUTTON_NEW);
    }

    handleOnClickConfirm() {
        this.props.handleOnClickConfirm && this.props.handleOnClickConfirm();
        this.handleClick(C.GRID_ACTION_BUTTON_CONFIRM);
    }

    handleOnClickCancel() {
        this.props.handleOnClickCancel && this.props.handleOnClickCancel();
        this.handleClick(C.GRID_ACTION_BUTTON_CANCEL);
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
