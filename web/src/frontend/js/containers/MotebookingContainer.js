import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import MotebookingSkjema from '../mote/skjema/MotebookingSkjema';
import MotestatusContainer from '../mote/containers/MotestatusContainer';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import * as moterActions from '../mote/actions/moter_actions';
import * as ledereActions from '../actions/ledere_actions';

export class MotebookingSide extends Component {
    constructor(props) {
        super(props);
        this.props.hentMoter(this.props.fnr);
        this.props.hentLedere(this.props.fnr);
    }

    render() {
        const { henter, hentMoterFeiletBool, mote, avbrytMote, avbryter, avbrytFeilet, fnr } = this.props;
        return (<Side tittel="Møteplanlegger">
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentMoterFeiletBool) {
                        return <Feilmelding />;
                    }
                    if (mote) {
                        return <MotestatusContainer moteUuid={mote.moteUuid} />;
                    }
                    return <MotebookingSkjema {...this.props} />;
                })()
            }
        </Side>);
    }
}

MotebookingSide.propTypes = {
    fnr: PropTypes.string,
    mote: PropTypes.object,
    hentMoter: PropTypes.func,
    hentLedere: PropTypes.func,
    henter: PropTypes.bool,
    hentMoterFeiletBool: PropTypes.bool,
    hentLedereFeiletBool: PropTypes.bool,
    avbrytMote: PropTypes.func,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
};

export const mapStateToProps = (state, ownProps) => {
    const fnr = state.navbruker.data.fnr;
    const aktivtMote = state.moter.data.filter((mote) => {
        return mote.status === 'OPPRETTET';
    })[0];
    const ledere = state.ledere.data.filter((leder) => {
        return leder.erOppgitt;
    });
    
    return {
        fnr,
        mote: aktivtMote,
        ledere,
        henter: state.moter.henter || state.ledere.henter,
        sender: state.moter.sender,
        hentMoterFeiletBool: state.moter.hentingFeilet,
        hentLedereFeiletBool: state.ledere.hentingFeilet,
        sendingFeilet: state.moter.sendingFeilet,
    };
};

const MotebookingContainer = connect(mapStateToProps, Object.assign({}, moterActions, ledereActions))(MotebookingSide);

export default MotebookingContainer;
