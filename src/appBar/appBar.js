import React, { Component } from 'react';

import { Drawer, AppBar, MenuItem } from 'material-ui';
import { Link } from 'react-router';
import AppBarStore from './appBarStore';
import C from '../constants';

import NavigationClose from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';

export default class AppBarComponent extends Component {

    constructor() {
        super();

        this.state = {
            openDrawer: false,
            title: 'Jesus'
        }

        this.setTitleBar = this.setTitleBar.bind(this);
    }

    componentWillMount() {
        AppBarStore.on(C.ACTION_CHANGE_TITLE, this.setTitleBar);
    }

    componentWillUnmount() {
        AppBarStore.removeListener(C.ACTION_CHANGE_TITLE, this.setTitleBar);
    }

    setDrawerState(isOpen = false) {
        this.setState({
            openDrawer: isOpen
        });
    }

    hundleTitleTouchTap() {
        this.setDrawerState(true);
    }

    hundleLeftIconButtonTouchTap() {
        this.setDrawerState(true);
    }

    closeDrawer() {
        this.setDrawerState();
    }

    setTitleBar(title) {
        this.setState({
            'title': title,
            'showGoBack': title !== 'Jesus'
        });
    }

    handleGoBack(event) {
        this.props.router.goBack();
    };

    render() {
        let appBarProps = {
            onTitleTouchTap: this.hundleTitleTouchTap.bind(this),
            onLeftIconButtonTouchTap: this.hundleLeftIconButtonTouchTap.bind(this)
        };

        if (this.state.showGoBack) {
            appBarProps.iconElementLeft = <IconButton><NavigationClose /></IconButton>;
            appBarProps.onTitleTouchTap = this.handleGoBack.bind(this);
            appBarProps.onLeftIconButtonTouchTap = this.handleGoBack.bind(this);
        }

        return(
            <div>
                <AppBar
                    {...appBarProps}
                    title={this.state.title}
                />
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.openDrawer}
                    onRequestChange={this.setDrawerState.bind(this)}
                >
                    <Link to="organization"><MenuItem onTouchTap={this.closeDrawer.bind(this)}>Organização</MenuItem></Link>
                    <Link to="congregation"><MenuItem onTouchTap={this.closeDrawer.bind(this)}>Congregação</MenuItem></Link>
                </Drawer>
                {this.props.children}
            </div>
        );
    }
}
