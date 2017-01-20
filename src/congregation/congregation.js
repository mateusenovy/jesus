import React, { Component } from 'react';

import CongregationList from './congregationList';
// import CongregationForm from './congregationForm';
import C from '../constants';
import * as CongregationActions from './congregationActions';

export default class CongregationComponent extends Component {

    constructor() {
        super();
        this.state = {
            showForm: false,
            currentCongregation: {}
        }
    }

    componentDidMount() {
        CongregationActions.findCongregationOnce();
    }

    handleClick(eventName, currentCongregation) {
        let showForm = (eventName === C.CONGR_ACTION_BUTTON_NEW);
        this.setState({
            'showForm': showForm,
            'currentCongregation': currentCongregation || {}
        });
    }

    render() {
        return(
            <CongregationList handleOnClickNew={this.handleClick.bind(this)} />
        );
    }
}
