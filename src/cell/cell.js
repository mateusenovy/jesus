import React, { Component } from 'react';

import CellCard from './cellCard';
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
        let congregationId = this.props.params.congregationId,
            gridId = this.props.params.gridId;
        CellActions.findCellOnce(congregationId, gridId);
    }

    handleClick(eventName, currentCell) {
        let showForm = (eventName === C.CELL_ACTION_BUTTON_NEW);
        this.setState({
            'showForm': showForm,
            'currentCell': currentCell || {}
        });
    }

    render() {
        let component = <CellCard 
            handleOnClickNew={this.handleClick.bind(this)} 
            congregationId={this.props.params.congregationId}
            gridId={this.props.params.gridId}
        />;

        if (this.state.showForm) {
            component = <CellForm
                currentCell={this.state.currentCell}
                handleOnClick={this.handleClick.bind(this)}
                congregationId={this.props.params.congregationId}
                gridId={this.props.params.gridId}
            />
        }

        return(
            component
        );
    }
}
