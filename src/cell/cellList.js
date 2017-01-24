import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, FlatButton } from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentEdit from 'material-ui/svg-icons/image/edit';
import CellStore from './cellStore';
import * as CellActions from './cellActions';
import CellFloatButton from './cellFloatButton';
import AlertRemove from '../components/alertRemove';
import C from '../constants';

export default class CellList extends Component {

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

    openAlertRemove() {
        this.setState({
            showAlertRemove: true
        });
    }

    closeAlertRemove() {
        this.setState({
            showAlertRemove: false
        });
    }

    getCellByIndex(index) {
        return this.state.cells[index];
    }

    onCellClick(rowSelected, columnClicked) {

        this.setState(function addCurrentCellOnState(prevState) {
            let currentCell = this.getCellByIndex(rowSelected);

            if (prevState.handleTableFlatButtonOnClick && columnClicked === 4 ) {
                prevState.handleTableFlatButtonOnClick('new', currentCell);
            }

            return {'currentCell': currentCell}
        });
    }

    editRegister() {
        this.setState({
            handleTableFlatButtonOnClick: this.props.handleOnClickNew
        });
    }

    handleOnClickRemove() {
        CellActions.deleteCell(this.state.currentCell.id);
        this.closeAlertRemove();
    }

    render() {
        let table,
            tableBody  = <TableBody></TableBody>,
            removeIcon = <ContentRemove color={'#740000'} />,
            editIcon = <ContentEdit />,
            flatButtonRemove =
                <FlatButton icon={removeIcon}
                    onClick={this.openAlertRemove.bind(this)}
                />,
            flatButtonEdit =
                <FlatButton icon={editIcon}
                    onClick={this.editRegister.bind(this)}
                />;

        const TABLE_HEADER =
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                <TableRow>
                    <TableHeaderColumn style={{ width: 100 }}>Nome</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 100 }}>Endereço</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 100 }}>Responsável</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 150 }}></TableHeaderColumn>
                </TableRow>
            </TableHeader>
        ;

        tableBody =
            <TableBody displayRowCheckbox={false} adjustForCheckbox={false}>
                {this.state.cells.map( (row, index) =>
                    <TableRow key={index}>
                        <TableRowColumn style={{ width: 100 }} >{row.name}</TableRowColumn>
                        <TableRowColumn style={{ width: 100 }} >{row.address}</TableRowColumn>
                        <TableRowColumn style={{ width: 100 }} >{row.responsible}</TableRowColumn>
                        <TableRowColumn style={{ width: 150 }} >{flatButtonEdit}{flatButtonRemove}</TableRowColumn>
                    </TableRow>
                )}
            </TableBody>
        ;

        table =
            <div>
                <Table onCellClick={this.onCellClick.bind(this)} bodyStyle={{overflow:'visible'}}>
                    {TABLE_HEADER}
                    {tableBody}
                </Table>
            </div>
        ;

        return (
            <div>
                {table}
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
