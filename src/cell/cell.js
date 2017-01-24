import React, { Component } from 'react';

import CellList from './cellList';
import CellForm from './cellForm';
import C from '../constants';
import * as CellActions from './cellActions';

export default class CellComponent extends Component {

    constructor() {
        super();
        this.state = {
            showForm: false,
            currentCell: {}
        }
    }

    componentDidMount() {
        CellActions.findCellOnce();
    }

    handleClick(eventName, currentCell) {
        let showForm = (eventName === C.CELL_ACTION_BUTTON_NEW);
        this.setState({
            'showForm': showForm,
            'currentCell': currentCell || {}
        });
    }

    render() {
        let component = <CellList handleOnClickNew={this.handleClick.bind(this)} />;

        if (this.state.showForm) {
            component = <CellForm
                currentCell={this.state.currentCell}
                handleOnClick={this.handleClick.bind(this)}
            />
        }

        return(
            component
        );
    }
}
