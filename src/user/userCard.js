import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardActions, GridList, FlatButton } from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentEdit from 'material-ui/svg-icons/image/edit';
import UserStore from './userStore';
import * as UserActions from './userActions';
import UserFloatButton from './userFloatButton';
import AlertRemove from '../components/alertRemove';
import C from '../constants';

export default class UserList extends Component {

    constructor() {
        super();

        this.state = {
            users: UserStore.findUser(),
            currentUser: null,
            showAlertRemove: false
        };

        this.findUsers = this.findUsers.bind(this);
    }

    findUsers() {
        this.setState({
            users: UserStore.findUser()
        });
    }

    componentWillMount() {
        UserStore.on(C.USER_CHANGE_LIST, this.findUsers);
    }

    componentWillUnmount() {
        UserStore.removeListener(C.USER_CHANGE_LIST, this.findUsers);
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    getUserByIndex(index) {
        if (isNaN(Number(index))) {
            throw new Error('Invalid number of index');
        }
        return this.state.users[index];
    }

    handleOnClickRemove() {
        UserActions.deleteUser(this.state.currentUser.id);
        this.closeAlertRemove();
    }

    openAlertRemove(event) {
        let id = event.currentTarget.id,
            currentUser = this.getUserByIndex(id);

        this.setState({
            'showAlertRemove': true,
            'currentUser': currentUser
        });

        this.stopPropagation(event);
    }

    closeAlertRemove(event) {
        this.setState({
            showAlertRemove: false
        });
    }

    editRegister(event) {
        let id = event.currentTarget.id,
            currentUser = this.getUserByIndex(id);

        this.props.handleOnClickNew('new', currentUser);
        this.stopPropagation(event);
    }

    render() {
        let cards,
            removeIcon = <ContentRemove color={'#740000'} />,
            editIcon = <ContentEdit />;

        cards =
            <GridList cols={1} padding={10} cellHeight={'auto'} >
                {this.state.users.map( (row, index) =>
                    <Card key={index} >
                        <CardHeader
                            title={row.name} />
                        <CardText>
                            {<div><b>Nome:</b> {row.name}</div>}
                            {<div><b>Nascimento:</b> {row.birth}</div>}
                            {<div><b>RG:</b> {row.rg}</div>}
                            {<div><b>Endereço:</b> {row.address}</div>}
                            {<div><b>Situação:</b> {row.situation}</div>}
                            {<div><b>Célula:</b> {row.cell}</div>}
                            {<div><b>Discipulador:</b> {row.disciplinarian}</div>}
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
                <UserFloatButton handleOnClick={this.props.handleOnClickNew}/>
                <AlertRemove
                    showAlertRemove={this.state.showAlertRemove}
                    onClickCancel={this.closeAlertRemove.bind(this)}
                    onClickRemove={this.handleOnClickRemove.bind(this)}
                />
            </div>
        )
    }
}
