import React, { Component } from 'react';

import { Drawer, MenuItem } from 'material-ui';
import { Link } from 'react-router';

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
