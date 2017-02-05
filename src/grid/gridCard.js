import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardActions, GridList, FlatButton } from 'material-ui';
import { Link } from 'react-router';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentEdit from 'material-ui/svg-icons/image/edit';
import GridStore from './gridStore';
import * as GridActions from './gridActions';
import GridFloatButton from './gridFloatButton';
import AlertRemove from '../components/alertRemove';
import C from '../constants';

export default class GridCard extends Component {

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

    stopPropagation(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    getGridByIndex(index) {
        if (isNaN(Number(index))) {
            throw new Error('Invalid number of index');
        }
        return this.state.grids[index];
    }

    openAlertRemove(event) {
        let id = event.currentTarget.id,
            currentGrid = this.getGridByIndex(id);
        this.setState({
            'showAlertRemove': true,
            'currentGrid': currentGrid 
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
            currentGrid = this.getGridByIndex(id);
        
        this.props.handleOnClickNew('new', currentGrid);
        this.stopPropagation(event);
    }

    handleOnClickRemove() {
        GridActions.deleteGrid(this.props.congregationId, this.state.currentGrid.id);
        this.closeAlertRemove();
    }

    render() {
        let cards,
            removeIcon = <ContentRemove color={'#740000'} />,
            editIcon = <ContentEdit />;

        cards =
            <GridList cols={1} padding={10} cellHeight={'auto'} >
                {this.state.grids.map( (row, index) =>
                    <Card key={index} >
                        <Link to={`cell/${this.props.congregationId}/${row.id}`} 
                              style={{ textDecoration: 'none' }} 
                            >
                            <CardHeader
                                title={row.name} />
                            <CardText>
                                {<div><b>Nome:</b> {row.name}</div>}
                                {<div><b>Color:</b> {row.color}</div>}
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
                        </Link>
                    </Card>
                )}
            </GridList>
        ;

        return (
            <div>
                {cards}
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
