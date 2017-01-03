import React, { Component } from 'react';

import { FloatingActionButton } from 'material-ui';
import ActionDone from 'material-ui/svg-icons/action/done';

export default class ConfirmButton extends Component {

    render() {
        return(
            <FloatingActionButton
                style={this.props.style}
                onClick={this.props.handleOnClickConfirm} >
                    <ActionDone />
            </FloatingActionButton>
        );
    }
}
