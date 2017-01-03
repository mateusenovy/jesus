import React, { Component } from 'react';

import FloatButton from '../components/floatButton/';

export default class OrganizationFloatButton extends Component {

    constructor() {
        super();

        this.state = {
            showSaveAndCancel: false
        }
    }

    handleOnClickNew() {
        this.setState({showSaveAndCancel: true});
    }

    handleOnClickConfirm() {
        console.debug('confirm');
    }

    handleOnClickCancel() {
        console.debug('cancel');
        this.setState({showSaveAndCancel: false});
    }

    render() {
        return(
            <div
                onClick={this.props.handleClick} >
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
