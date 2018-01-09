import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PilNed from '../../ikoner/PilNed';
import PilOpp from '../../ikoner/PilOpp';

export class UtvidbarHistorikk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vis: true,
            farge: '#3E3832',
        };
    }

    onMouseEnter() {
        this.setState({
            farge: '#005B82',
        });
    }

    onMouseLeave() {
        this.setState({
            farge: '#3E3832',
        });
    }

    toggle() {
        this.setState({
            vis: !this.state.vis,
        });
    }

    render() {
        return (<div>
            <div
                onClick={() => {this.toggle();} }
                onMouseEnter={() => { this.onMouseEnter(); }}
                onMouseLeave={() => { this.onMouseLeave(); }}
                style={{ cursor: 'pointer', alignItems: 'center', display: 'flex' }}>
                {this.props.head}
                { this.state.vis ? <PilNed farge={this.state.farge} /> : <PilOpp farge={this.state.farge} />}
            </div>
                { this.state.vis && <div>{this.props.body}</div> }
            </div>);
    }
}

UtvidbarHistorikk.propTypes = {
    head: PropTypes.node,
    body: PropTypes.node,
};

export default UtvidbarHistorikk;
