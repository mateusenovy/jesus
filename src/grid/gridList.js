import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, FlatButton } from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentEdit from 'material-ui/svg-icons/image/edit';
import GridStore from './gridStore';
import * as GridActions from './gridActions';
import GridFloatButton from './gridFloatButton';
import AlertRemove from '../components/alertRemove';
import C from '../constants';

export default class GridList extends Component {

    constructor() {
        super();

        this.state = {
            grids: GridStore.findGrids(),
            showAlertRemove: false
        };

        this.findGrids = this.findGrids.bind(this);
    }

    findGrids() {
        this.setState({
            grids: GridStore.findGrids()
        });
    }

    componentWillMount() {
        GridStore.on(C.GRID_CHANGE_LIST, this.findGrids);
    }

    componentWillUnmount() {
        GridStore.removeListener(C.GRID_CHANGE_LIST, this.findGrids);
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

    getGridByIndex(index) {
        return this.state.grids[index];
    }

    onCellClick(rowSelected, columnClicked) {

        this.setState(function addCurrentGridOnState(prevState) {
            let currentGrid = this.getGridByIndex(rowSelected);

            if (prevState.handleTableFlatButtonOnClick && columnClicked === 4 ) {
                prevState.handleTableFlatButtonOnClick('new', currentGrid);
            }

            return {'currentGrid': currentGrid}
        });
    }

    editRegister() {
        this.setState({
            handleTableFlatButtonOnClick: this.props.handleOnClickNew
        });
    }

    handleOnClickRemove() {
        GridActions.deleteGrid(this.state.currentGrid.id);
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
                    <TableHeaderColumn style={{ width: 100 }}>Cor</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 100 }}>Responsável</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 150 }}></TableHeaderColumn>
                </TableRow>
            </TableHeader>
        ;

        tableBody =
            <TableBody displayRowCheckbox={false} adjustForCheckbox={false}>
                {this.state.grids.map( (row, index) =>
                    <TableRow key={index}>
                        <TableRowColumn style={{ width: 100 }} >{row.name}</TableRowColumn>
                        <TableRowColumn style={{ width: 100 }} >{row.color}</TableRowColumn>
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
                <GridFloatButton handleOnClick={this.props.handleOnClickNew}/>
                <AlertRemove
                    showAlertRemove={this.state.showAlertRemove}
                    onClickCancel={this.closeAlertRemove.bind(this)}
                    onClickRemove={this.handleOnClickRemove.bind(this)}
                />
            </div>
        )
    }
}
