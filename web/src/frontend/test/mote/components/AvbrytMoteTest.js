import { expect } from 'chai';
import AvbrytMote from '../../../js/mote/components/AvbrytMote'
import { mount, shallow } from 'enzyme';
import React from 'react'

describe("AvbrytMote", () => {

    it("Viser endel selv om varselinnhold av varsel hentes", () => {
        const arbeidsgiver = {
            deltakerUuid: "uuid1",
            navn: "arbeidsgiver",
        };
        const sykmeldt = {
            deltakerUuid: "uuid2",
            navn: "sykmeldt",
        };

        let component = shallow(<AvbrytMote arbeidsgiver={arbeidsgiver} sykmeldt={sykmeldt} henterInnhold={true}/>)
        expect(component.find('.epostinnhold__mottakere')).to.length(2);
        expect(component.find('.epostinnhold__knapp')).to.length(2);
    });

    it("Viser ikke den sykmeldte dersom den ikke fikk moteOpprettetVarsel", () => {
        const arbeidsgiver = {
            deltakerUuid: "uuid1",
            navn: "arbeidsgiver",
        };
        const sykmeldt = {
            deltakerUuid: "uuid2",
            navn: "sykmeldt",
            hendelser: [{
                resultat: "RESERVERT",
                varseltype: "OPPRETTET"
            }],
        };

        let component = shallow(<AvbrytMote arbeidsgiver={arbeidsgiver} sykmeldt={sykmeldt} henterInnhold={true}/>)
        expect(component.find('.epostinnhold__mottakere')).to.length(1);
        expect(component.find('.epostinnhold__knapp')).to.length(1);
    });

});