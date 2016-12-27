import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

export default class OrganizationComponent extends Component {
    render() {
        let table, tableBody = <TableBody></TableBody>;

        const TABLE_HEADER =
            <TableHeader displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>Descição</TableHeaderColumn>
                    <TableHeaderColumn>Telefone Principal</TableHeaderColumn>
                </TableRow>
            </TableHeader>
        ;

        if (false) {
            tableBody =
                <TableBody>
                    {this.state.users.map( (row, index) =>
                        <TableRow key={index}>
                            <TableRowColumn>{row.description}</TableRowColumn>
                            <TableRowColumn>{row.principalPhone}</TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>
            ;
        }

        table =
            <Table>
                {TABLE_HEADER}
                {tableBody}
            </Table>
        ;

        return (
            <div>
                {table}
            </div>
        )
    }
}
