import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './style.scss';

import {setText, setThunkText} from './actions/HelloWorldActions';

import {Button} from 'antd';

class HelloWorld extends React.Component {
    
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.clicks = 0;
    }

    handleClick() {
        // this.props.dispatch(setText('Clicked ' + this.clicks++));
        this.props.dispatch(setThunkText(this.clicks++));
    }

    render() {
        return (
            <div>
                <h3>EPMAT</h3>
                <Button  onClick={this.handleClick}>{this.props.text}</Button>
                <p></p>
            </div>
        )
    }
}

HelloWorld.propTypes = {
    text:PropTypes.string
}

HelloWorld.defaultProps = {
    text:"Provide the props you moron"
}
const mapStateToProps = (state) => {
    return {
        text : state.text.text
    }
};

export default connect(mapStateToProps)(HelloWorld);


