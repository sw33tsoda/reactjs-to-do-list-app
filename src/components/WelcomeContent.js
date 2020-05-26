import React, {Component} from 'react';

class WelcomeContent extends Component {

    render() {
        return (
            <center><h1>{this.props.children}</h1></center>
        );
    }
}

export default WelcomeContent;