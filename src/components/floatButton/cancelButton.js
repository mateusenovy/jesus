import React, { Component } from 'react';

import { FloatingActionButton } from 'material-ui';
import ContentClear from 'material-ui/svg-icons/content/clear';

export default class CancelButton extends Component {

    render() {
        return(
            <FloatingActionButton
                style={this.props.style}
                onClick={this.props.handleOnClickCancel}
                mini={this.props.isMini} >
                    <ContentClear />
            </FloatingActionButton>
        );
    }
}
