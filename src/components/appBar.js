import React, { Component } from 'react';

import { Drawer, AppBar, MenuItem } from 'material-ui';

export default class AppBarComponent extends Component {

    constructor() {
        super();

        this.state = {
            openDrawer: false
        }
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

    render() {
        return(
            <div>
                <AppBar
                    title="Jesus"
                    onTitleTouchTap={this.hundleTitleTouchTap.bind(this)}
                    onLeftIconButtonTouchTap={this.hundleLeftIconButtonTouchTap.bind(this)}
                />
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.openDrawer}
                    onRequestChange={this.setDrawerState.bind(this)}
                >
                    <MenuItem onTouchTap={this.closeDrawer.bind(this)}>Organização</MenuItem>
                    <MenuItem onTouchTap={this.closeDrawer.bind(this)}>Congregação</MenuItem>
                    <MenuItem onTouchTap={this.closeDrawer.bind(this)}>Rede</MenuItem>
                    <MenuItem onTouchTap={this.closeDrawer.bind(this)}>Célula</MenuItem>
                </Drawer>
            </div>
        );
    }
}
