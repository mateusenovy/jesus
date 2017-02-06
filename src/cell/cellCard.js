import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardActions, GridList, FlatButton } from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentEdit from 'material-ui/svg-icons/image/edit';
import CellStore from './cellStore';
import * as CellActions from './cellActions';
import CellFloatButton from './cellFloatButton';
import AlertRemove from '../components/alertRemove';
import C from '../constants';

export default class CellCard extends Component {

    constructor() {
        super();

        this.state = {
            cells: CellStore.findCells(),
            showAlertRemove: false
        };

        this.findCells = this.findCells.bind(this);
    }

    findCells() {
        this.setState({
            cells: CellStore.findCells()
        });
    }

    componentWillMount() {
        CellStore.on(C.CELL_CHANGE_LIST, this.findCells);
    }

    componentWillUnmount() {
        CellStore.removeListener(C.CELL_CHANGE_LIST, this.findCells);
    }

    stopPropagation(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    getCellByIndex(index) {
        if (isNaN(Number(index))) {
            throw new Error('Invalid number of index');
        }
        return this.state.cells[index];
    }

    openAlertRemove(event) {
        let id = event.currentTarget.id,
            currentCell = this.getCellByIndex(id);
        this.setState({
            'showAlertRemove': true,
            'currentCell': currentCell
        });

        this.stopPropagation(event);
    }

    closeAlertRemove() {
        this.setState({
            showAlertRemove: false
        });
    }

    editRegister(event) {
        let id = event.currentTarget.id,
            currentCell = this.getCellByIndex(id);
        
        this.props.handleOnClickNew('new', currentCell);
        this.stopPropagation(event);
    }

    handleOnClickRemove() {
        let congregationId = this.props.congregationId, 
            gridId = this.props.gridId,
            cellId = this.state.currentCell.id;

        CellActions.deleteCell(congregationId, gridId, cellId);
        this.closeAlertRemove();
    }

    render() {
        let cards,
            removeIcon = <ContentRemove color={'#740000'} />,
            editIcon = <ContentEdit />;

        cards =
            <GridList cols={1} padding={10} cellHeight={'auto'} >
                {this.state.cells.map( (row, index) =>
                    <Card key={index} >
                        <CardHeader
                            title={row.name} />
                        <CardText>
                            {<div><b>Nome:</b> {row.name}</div>}
                            {<div><b>Endereço:</b> {row.address}</div>}
                            {<div><b>Responsável:</b> {row.responsible}</div>}
                        </CardText>
                        <CardActions style={{'text-align': 'center'}}>
                            <FlatButton name="edit" id={index} icon={editIcon}
                                onClick={this.editRegister.bind(this)}
                            />
                            <FlatButton name="remove" id={index} icon={removeIcon}
                                onClick={this.openAlertRemove.bind(this)}
                            />
                        </CardActions>
                    </Card>
                )}
            </GridList>
        ;

        return (
            <div>
                {cards}
                <CellFloatButton handleOnClick={this.props.handleOnClickNew}/>
                <AlertRemove
                    showAlertRemove={this.state.showAlertRemove}
                    onClickCancel={this.closeAlertRemove.bind(this)}
                    onClickRemove={this.handleOnClickRemove.bind(this)}
                />
            </div>
        )
    }
}
