import React, { Component } from 'react';

import GridList from './gridList';
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
        GridActions.findGridOnce();
    }

    handleClick(eventName, currentGrid) {
        let showForm = (eventName === C.GRID_ACTION_BUTTON_NEW);
        this.setState({
            'showForm': showForm,
            'currentGrid': currentGrid || {}
        });
    }

    render() {
        let component = <GridList handleOnClickNew={this.handleClick.bind(this)} />;

        if (this.state.showForm) {
            component = <GridForm
                currentGrid={this.state.currentGrid}
                handleOnClick={this.handleClick.bind(this)}
            />
        }

        return(
            component
        );
    }
}
