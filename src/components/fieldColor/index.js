import React, { Component } from 'react';
import Formsy  from 'formsy-react';
import { ChromePicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    over: {
        position: 'absolute',
        zIndex: '5'
    },
    overlap: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
    }
}

class FieldColor extends Component {

    constructor() {
        super();
        
        this.state = {
            showPickerColor: false,
            color: '#FFF'
        }
    }

    componentDidMount() {
        console.log(this.props.value);
        this.setState({
            color: this.props.value || '#FFF'
        });
    }

    handleButtonOnClick() {
        this.setState({
            showPickerColor: true
        });
    }

    handleClickClosePicker() {
        this.setState({
            showPickerColor: false
        });
    }

    handleChangeColor(selectColor, event) {
        this.setState({
            color: selectColor.hex
        });

        this.props.onChange && this.props.onChange(event, selectColor.hex);
    }

    render() {
        const picker = this.state.showPickerColor ?
            <div style={ styles.over } >
                <div style={ styles.overlap } onClick={this.handleClickClosePicker.bind(this) } />
                <ChromePicker
                    disableAlpha={true}
                    color={this.state.value}
                    onChange={this.handleChangeColor.bind(this)}
                />
            </div> :
            <div></div>;

        return (
            <div>
                <RaisedButton
                    label="Cor"
                    fullWidth={true}
                    onClick={this.handleButtonOnClick.bind(this)}
                    backgroundColor={this.state.value}
                />
                {picker}
            </div>
        );
    }
}

const Field =  React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
        requiredError: React.PropTypes.string,
        requiredError: React.PropTypes.string,
        validationError: React.PropTypes.string,
        validationErrors: React.PropTypes.object,
        validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
        value: React.PropTypes.object,
    },

    mixins: [Formsy.Mixin],

    handleChange(event, value) {
        this.setValue(value);
        this.props.onChange && this.props.onChange(event, value);
    },

    render() {
        return (
            <FieldColor 
                value={this.props.value}
                onChange={this.handleChange} 
            />
        );
    }

});

export default Field;
