import React, { Component } from 'react';

import GridList from './gridList';
import GridForm from './gridForm';
import C from '../constants';
import * as GridActions from './gridActions';
import CongregationStore from './../congregation/congregationStore';

export default class GridComponent extends Component {

    constructor() {
        super();
        this.state = {
            showForm: false,
            currentGrid: {},
            congregations: this.findCongregations()
        }
    }

    componentDidMount() {
        GridActions.findGridOnce();
    }

    findCongregations() {
        let congregations = CongregationStore.findCongregations();
        congregations.forEach(function(value, key) {
            congregations[key] = {
                id: value.id,
                label: value.name
            }
        });
        return congregations;
    }

    handleClick(eventName, currentGrid) {
        let showForm = (eventName === C.GRID_ACTION_BUTTON_NEW);
        this.setState({
            'showForm': showForm,
            'currentGrid': currentGrid || {}
        });
    }

    render() {
        let component = <GridList
            handleOnClickNew={this.handleClick.bind(this)}
            congregations={this.state.congregations}
        />;

        if (this.state.showForm) {
            component = <GridForm
                currentGrid={this.state.currentGrid}
                handleOnClick={this.handleClick.bind(this)}
                congregations={this.state.congregations}
            />;
        }

        return(
            component
        );
    }
}
