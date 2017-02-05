import React, { Component } from 'react';

import GridCard from './gridCard';
import GridForm from './gridForm';
import C from '../constants';
import * as GridActions from './gridActions';

export default class GridComponent extends Component {

    constructor() {
        super();
        this.state = {
            showForm: false,
            currentGrid: {}
        }
    }

    componentDidMount() {
        let congregationId = this.props.params.congregationId;
        GridActions.findGridOnce(congregationId);
    }

    handleClick(eventName, currentGrid) {
        let showForm = (eventName === C.GRID_ACTION_BUTTON_NEW);
        this.setState({
            'showForm': showForm,
            'currentGrid': currentGrid || {}
        });
    }

    render() {
        let component = <GridCard
            handleOnClickNew={this.handleClick.bind(this)}
            congregationId={this.props.params.congregationId}
        />;

        if (this.state.showForm) {
            component = <GridForm
                currentGrid={this.state.currentGrid}
                handleOnClick={this.handleClick.bind(this)}
                congregationId={this.props.params.congregationId}
            />;
        }

        return(
            component
        );
    }
}
