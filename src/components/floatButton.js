import React, { Component } from 'react';

import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionDone from 'material-ui/svg-icons/action/done';

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
}, miniStyle = {...style, right: 80 };

export default class FloatButton extends Component {

    constructor() {
        super();

        this.state = {
            icon: 'add'
        }
    }

    render() {
        let icon = this.props.icon || this.state.icon,
            iconComponent, displayCancel, handleChange;
        if (icon === 'add') {
            iconComponent = <ContentAdd />;
            handleChange = this.props.handleOnClickNew
        } else {
            //TODO Put Popover
            iconComponent = <ActionDone />;
            displayCancel = <FloatingActionButton mini={true} style={miniStyle} onClick={this.props.handleOnClickCancel}>
                                <ContentClear />
                            </FloatingActionButton>;
            handleChange = this.props.handleOnClickSave
        }

        return(
            <div>
                <FloatingActionButton style={style} onClick={handleChange}>
                    {iconComponent}
                </FloatingActionButton>
                {displayCancel}
            </div>
        );
    }
}
