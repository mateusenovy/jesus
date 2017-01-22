import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, FlatButton } from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentEdit from 'material-ui/svg-icons/image/edit';
import CongregationStore from './congregationStore';
import * as CongregationActions from './congregationActions';
import CongregationFloatButton from './congregationFloatButton';
import AlertRemove from '../components/alertRemove';
import C from '../constants';

export default class CongregationList extends Component {

    constructor() {
        super();

        this.state = {
            congregations: CongregationStore.findCongregations(),
            showAlertRemove: false
        };

        this.findCongregations = this.findCongregations.bind(this);
    }

    findCongregations() {
        this.setState({
            congregations: CongregationStore.findCongregations()
        });
    }

    componentWillMount() {
        CongregationStore.on(C.CONGR_CHANGE_LIST, this.findCongregations);
    }

    componentWillUnmount() {
        CongregationStore.removeListener(C.CONGR_CHANGE_LIST, this.findCongregations);
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

    getCongregationByIndex(index) {
        return this.state.congregations[index];
    }

    onCellClick(rowSelected, columnClicked) {

        this.setState(function addCurrentCongregationOnState(prevState) {
            let currentCongregation = this.getCongregationByIndex(rowSelected);

            if (prevState.handleTableFlatButtonOnClick && columnClicked === 5 ) {
                prevState.handleTableFlatButtonOnClick('new', currentCongregation);
            }

            return {'currentCongregation': currentCongregation}
        });
    }

    editRegister() {
        this.setState({
            handleTableFlatButtonOnClick: this.props.handleOnClickNew
        });
    }

    handleOnClickRemove() {
        CongregationActions.deleteCongregation(this.state.currentCongregation.id);
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
                    <TableHeaderColumn style={{ width: 100 }}>CNPJ</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 100 }}>Endereço</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 100 }}>Responsável</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 150 }}></TableHeaderColumn>
                </TableRow>
            </TableHeader>
        ;

        tableBody =
            <TableBody displayRowCheckbox={false} adjustForCheckbox={false}>
                {this.state.congregations.map( (row, index) =>
                    <TableRow key={index}>
                        <TableRowColumn style={{ width: 100 }} >{row.name}</TableRowColumn>
                        <TableRowColumn style={{ width: 100 }} >{row.cnpj}</TableRowColumn>
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
                <CongregationFloatButton handleOnClick={this.props.handleOnClickNew}/>
                <AlertRemove
                    showAlertRemove={this.state.showAlertRemove}
                    onClickCancel={this.closeAlertRemove.bind(this)}
                    onClickRemove={this.handleOnClickRemove.bind(this)}
                />
            </div>
        )
    }
}
