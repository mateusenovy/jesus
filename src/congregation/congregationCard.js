import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardActions, GridList, FlatButton } from 'material-ui';
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

    stopPropagation(event) {
        event.stopPropagation();
    }

    getCongregationByIndex(index) {
        if (isNaN(Number(index))) {
            throw new Error('Invalid number of index');
        }
        return this.state.congregations[index];
    }

    openAlertRemove(event) {
        let id = event.currentTarget.id,
            currentCongregation = this.getCongregationByIndex(id);
        this.setState({
            'showAlertRemove': true,
            'currentCongregation': currentCongregation 
        });

        this.stopPropagation(event);
    }

    closeAlertRemove() {
        this.setState({
            showAlertRemove: false
        });
    }

    getCongregationByIndex(index) {
        return this.state.congregations[index];
    }

    editRegister(event) {
        let id = event.currentTarget.id,
            currentCongregation = this.getCongregationByIndex(id);
        
        this.props.handleOnClickNew('new', currentCongregation);
        this.stopPropagation(event);
    }

    handleOnClickRemove() {
        CongregationActions.deleteCongregation(this.state.currentCongregation.id);
        this.closeAlertRemove();
    }

    render() {
        let cards,
            removeIcon = <ContentRemove color={'#740000'} />,
            editIcon = <ContentEdit />;
            
        cards =
            <GridList cols={2} padding={10} cellHeight={'auto'} >
                {this.state.congregations.map( (row, index) =>
                    <Card key={index} >
                        <CardHeader
                            title={row.name} />
                        <CardText>
                            {<div><b>Nome:</b> {row.name}</div>}
                            {<div><b>CNPJ:</b> {row.cnpj}</div>}
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
