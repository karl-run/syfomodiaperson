import { expect } from 'chai';
import {
    erArbeidsforEtterPerioden,
    erBedringAvArbeidsevnenInformasjon,
    erEkstraDiagnoseInformasjon,
    erFriskmeldingInformasjon,
    erHensynPaaArbeidsplassenInformasjon,
    erMeldingTilArbeidsgiverInformasjon,
    erMeldingTilNavInformasjon,
    erMulighetForArbeidInformasjon,
    erUtdypendeOpplysningerInformasjon,
    arbeidsgivernavnEllerArbeidssituasjon,
    sykmeldingerMedStatusSendt,
    sykmeldingerInnenforOppfolgingstilfellet,
    sykmeldingerSortertNyestTilEldst,
    sykmeldingerGruppertEtterVirksomhet,
    sykmeldingperioderSortertEldstTilNyest,
    stringMedAlleGraderingerFraSykmeldingPerioder,
} from '../../js/utils/sykmeldingUtils';
import { ANTALL_MS_DAG } from '../../js/utils/datoUtils';

describe('sykmeldingUtils', () => {
    describe('erEkstraDiagnoseInformasjon', () => {
        it('skal returnere true dersom sykmeldingen inneholder ekstra informasjon om diagnose', () => {
            const sykmelding = {
                    diagnose: {
                        fravaersgrunnLovfestet: 'Lovfestet grunn!',
                        svangerskap: false,
                        yrkesskade: true,
                    },
                };

           const erEkstraInfo = erEkstraDiagnoseInformasjon(sykmelding);

           expect(erEkstraInfo).to.equal(true);
        });
        it('skal returnere false dersom sykmeldingen ikke inneholder ekstra informasjon om diagnose', () => {
            const sykmelding = {
                diagnose: {
                    fravaersgrunnLovfestet: null,
                    svangerskap: false,
                    yrkesskade: false,
                },
            };


            const erIkkeEkstraInfo = erEkstraDiagnoseInformasjon(sykmelding);

            expect(erIkkeEkstraInfo).to.equal(false);
        });
    });

    describe('erMulighetForArbeidInformasjon', () => {
        it('skal returnere true dersom sykmeldingen inneholder informasjon om mulighet for arbeid', () => {
            const sykmelding = {
                    mulighetForArbeid: {
                        aarsakAktivitetIkkeMulig433: 'andre årsaker til sykefravær',
                        aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær',
                        aktivitetIkkeMulig433: [
                            'Annet',
                        ],
                        aktivitetIkkeMulig434: [
                            'Annet',
                        ],
                        perioder: [
                            {
                                avventende: null,
                                behandlingsdager: null,
                                fom: '2018-12-28',
                                grad: 100,
                                reisetilskudd: null,
                                tom: '2019-01-08',
                            },
                            {
                                avventende: null,
                                behandlingsdager: null,
                                fom: '2018-01-09',
                                grad: 21,
                                reisetilskudd: null,
                                tom: '2019-01-15',
                            },
                        ],
                    },
                };

           const erEkstraInfo = erMulighetForArbeidInformasjon(sykmelding);

           expect(erEkstraInfo).to.equal(true);
        });
        it('skal returnere false dersom sykmeldingen ikke inneholder informasjon om mulighet for arbeid', () => {
            const sykmelding = {
                mulighetForArbeid: {
                    perioder: [
                        {
                            avventende: null,
                            behandlingsdager: null,
                            fom: '2018-12-28',
                            grad: 100,
                            reisetilskudd: null,
                            tom: '2019-01-08',
                        },
                    ],
                },
            };

            const erIkkeEkstraInfo = erMulighetForArbeidInformasjon(sykmelding);

            expect(erIkkeEkstraInfo).to.equal(false);
        });
    });

    describe('erFriskmeldingInformasjon', () => {
        it('skal returnere true dersom sykmeldingen inneholder informasjon om friskmelding', () => {
            const sykmelding = {
                    friskmelding: {
                        antarReturAnnenArbeidsgiver: true,
                        antarReturSammeArbeidsgiver: true,
                        utenArbeidsgiverAntarTilbakeIArbeid: false,
                    },
                };

           const erEkstraInfo = erFriskmeldingInformasjon(sykmelding);

           expect(erEkstraInfo).to.equal(true);
        });
        it('skal returnere false dersom sykmeldingen ikke inneholder informasjon om friskmelding', () => {
            const sykmelding = {
                friskmelding: {
                    antarReturAnnenArbeidsgiver: false,
                    antarReturSammeArbeidsgiver: false,
                    utenArbeidsgiverAntarTilbakeIArbeid: false,
                },
            };


            const erIkkeEkstraInfo = erFriskmeldingInformasjon(sykmelding);

            expect(erIkkeEkstraInfo).to.equal(false);
        });
    });

    describe('erArbeidsforEtterPerioden', () => {
        it('skal returnere true dersom sykmeldingen inneholder informasjon om den sykmeldte er arbeidsfør etter perioden', () => {
            const sykmelding = {
                    friskmelding: {
                        arbeidsfoerEtterPerioden: true,
                    },
                };

           const erEkstraInfo = erArbeidsforEtterPerioden(sykmelding);

           expect(erEkstraInfo).to.equal(true);
        });
        it('skal returnere false dersom sykmeldingen ikke inneholder informasjon om den sykmeldte er arbeidsfør etter perioden', () => {
            const sykmelding = {
                friskmelding: {
                    arbeidsfoerEtterPerioden: false,
                },
            };

            const erIkkeEkstraInfo = erArbeidsforEtterPerioden(sykmelding);

            expect(erIkkeEkstraInfo).to.equal(false);
        });
    });

    describe('erHensynPaaArbeidsplassenInformasjon', () => {
        it('skal returnere true dersom sykmeldingen inneholder informasjon om hensyn på arbeidsplassen', () => {
            const sykmelding = {
                    friskmelding: {
                        hensynPaaArbeidsplassen: 'Må ta det pent',
                    },
                };

           const erEkstraInfo = erHensynPaaArbeidsplassenInformasjon(sykmelding);

           expect(erEkstraInfo).to.equal(true);
        });
        it('skal returnere false dersom sykmeldingen ikke inneholder informasjon om hensyn på arbeidsplassen', () => {
            const sykmelding = {
                friskmelding: {
                    hensynPaaArbeidsplassen: null,
                },
            };


            const erIkkeEkstraInfo = erHensynPaaArbeidsplassenInformasjon(sykmelding);

            expect(erIkkeEkstraInfo).to.equal(false);
        });
    });

    describe('erUtdypendeOpplysningerInformasjon', () => {
        it('skal returnere true dersom sykmeldingen inneholder utdypende opplysninger', () => {
            const sykmelding = {
                utdypendeOpplysninger: {
                    henvisningUtredningBehandling: 'Henvist til fysio',
                    paavirkningArbeidsevne: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket',
                    resultatAvBehandling: 'Nei',
                    sykehistorie: 'Langvarig korsryggsmerter. Ømhet og smerte',
                },
            };

           const erEkstraInfo = erUtdypendeOpplysningerInformasjon(sykmelding);

           expect(erEkstraInfo).to.equal(true);
        });
        it('skal returnere false dersom sykmeldingen ikke inneholder utdypende opplysninger', () => {
            const sykmelding = {
                utdypendeOpplysninger: {
                    henvisningUtredningBehandling: null,
                    paavirkningArbeidsevne: null,
                    resultatAvBehandling: null,
                    sykehistorie: null,
                },
            };


            const erIkkeEkstraInfo = erUtdypendeOpplysningerInformasjon(sykmelding);

            expect(erIkkeEkstraInfo).to.equal(false);
        });
    });

    describe('erBedringAvArbeidsevnenInformasjon', () => {
        it('skal returnere true dersom sykmeldingen inneholder informasjon om bedring av arbeidsevnen', () => {
            const sykmelding = {
                arbeidsevne: {
                    tilretteleggingArbeidsplass: 'Trenger nye sko',
                    tiltakAndre: 'Pasienten vil ha nye sko!',
                    tiltakNAV: 'NAV må gi pasienten skosåler til de nye skoene',
                },
            };

           const erEkstraInfo = erBedringAvArbeidsevnenInformasjon(sykmelding);

           expect(erEkstraInfo).to.equal(true);
        });
        it('skal returnere false dersom sykmeldingen ikke inneholder informasjon om bedring av arbeidsevnen', () => {
            const sykmelding = {
                arbeidsevne: {
                    tilretteleggingArbeidsplass: null,
                    tiltakAndre: null,
                    tiltakNAV: null,
                },
            };


            const erIkkeEkstraInfo = erBedringAvArbeidsevnenInformasjon(sykmelding);

            expect(erIkkeEkstraInfo).to.equal(false);
        });
    });

    describe('erMeldingTilNavInformasjon', () => {
        it('skal returnere true dersom sykmeldingen inneholder informasjon om melding til nav', () => {
            const sykmelding = {
                meldingTilNav: {
                    navBoerTaTakISaken: true,
                },
            };

           const erEkstraInfo = erMeldingTilNavInformasjon(sykmelding);

           expect(erEkstraInfo).to.equal(true);
        });
        it('skal returnere false dersom sykmeldingen ikke inneholder informasjon om melding til nav', () => {
            const sykmelding = {
                meldingTilNav: {
                    navBoerTaTakISaken: false,
                },
            };


            const erIkkeEkstraInfo = erMeldingTilNavInformasjon(sykmelding);

            expect(erIkkeEkstraInfo).to.equal(false);
        });
    });

    describe('erMeldingTilArbeidsgiverInformasjon', () => {
        it('skal returnere true dersom sykmeldingen inneholder informasjon om melding til arbeidsgiver', () => {
            const sykmelding = {
                innspillTilArbeidsgiver: 'Arbeidsgiver må gjøre noe!',
            };

           const erEkstraInfo = erMeldingTilArbeidsgiverInformasjon(sykmelding);

           expect(erEkstraInfo).to.equal(true);
        });
        it('skal returnere false dersom sykmeldingen ikke inneholder informasjon om melding til arbeidsgiver', () => {
            const sykmelding = {
                innspillTilArbeidsgiver: null,
            };


            const erIkkeEkstraInfo = erMeldingTilArbeidsgiverInformasjon(sykmelding);

            expect(erIkkeEkstraInfo).to.equal(false);
        });
    });

    describe('arbeidsgivernavnEllerArbeidssituasjon', () => {
        it('skal returnere navnet på arbeidsgiveren dersom det er satt', () => {
            const sykmelding = {
                innsendtArbeidsgivernavn: 'Test Arbeidsgiver',
            };

           const innsendtArbeidsgivernavn = arbeidsgivernavnEllerArbeidssituasjon(sykmelding);

           expect(innsendtArbeidsgivernavn).to.equal('Test Arbeidsgiver');
        });
        it('Skal returnere arbeidssituasjon dersom innsendt arbeidsgivernavn ikke er satt', () => {
            const sykmelding = {
                innsendtArbeidsgivernavn: null,
                sporsmal: {
                    arbeidssituasjon: 'NAERINGSDRIVENDE',
                },
            };


            const arbeidssituasjon = arbeidsgivernavnEllerArbeidssituasjon(sykmelding);

            expect(arbeidssituasjon).to.equal('Selvstendig næringsdrivende');
        });
    });

    describe('sykmeldingerMedStatusSendt', () => {
        it('skal returnere en liste med bare innsendte sykmeldinger', () => {
            const sykmeldinger = [
                {
                    status: 'AVBRUTT',
                },
                {
                    status: 'SENDT',
                },
                {
                    status: 'AVBRUTT',
                },
            ];


           const sendteSykmeldinger = sykmeldingerMedStatusSendt(sykmeldinger);

           expect(sendteSykmeldinger.length).to.equal(1);
        });
    });

    describe('sykmeldingerInnenforOppfolgingstilfellet', () => {
        it('skal returnere en liste med bare sykmeldinger innenfor oppfølgingstilfellet', () => {
            let oppfolgingstilfelleperioder = [];
            oppfolgingstilfelleperioder['123'] = {
                data: [
                    {
                        orgnummer: '123',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 120)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 90)),
                    },
                    {
                        orgnummer: '123',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 80)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 50)),
                    },
                    {
                        orgnummer: '123',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 40)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 10)),
                    },
                    {
                        orgnummer: '123',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 5)),
                        tom: new Date(Date.now() + (ANTALL_MS_DAG * 15)),
                    },
                ],
            };

            oppfolgingstilfelleperioder['321'] = {
                data: [
                    {
                        orgnummer: '321',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 80)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 50)),
                    },
                    {
                        orgnummer: '321',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 40)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 10)),
                    },
                ],
            };

            const sykmeldinger = [
                {
                    orgnummer: '123',
                    startLegemeldtFravaer: '2018-12-28',
                },
                {
                    orgnummer: '321',
                    startLegemeldtFravaer: '2017-01-01',
                },
            ];


           const sykmeldingerIOppfolgingstilfellet = sykmeldingerInnenforOppfolgingstilfellet(sykmeldinger, oppfolgingstilfelleperioder);

           expect(sykmeldingerIOppfolgingstilfellet.length).to.equal(1);
           expect(sykmeldingerIOppfolgingstilfellet[0].orgnummer).to.equal('123');
        });
    });

    describe('sykmeldingerSortertNyestTilEldst', () => {
        it('skal returnere en liste med sykmeldinger sortert etter utstedelsesdato', () => {

            const sykmeldinger = [
                {
                    bekreftelse: {
                        utstedelsesdato: '2019-01-05',
                    },
                },
                {
                    bekreftelse: {
                        utstedelsesdato: '2019-01-01',
                    },
                },
                {
                    bekreftelse: {
                        utstedelsesdato: '2019-01-02',
                    },
                },
                {
                    bekreftelse: {
                        utstedelsesdato: '2019-01-04',
                    },
                },
                {
                    bekreftelse: {
                        utstedelsesdato: '2019-01-03',
                    },
                },
            ];


           const sykmeldingerSortertPaaUtstedelsesdato = sykmeldingerSortertNyestTilEldst(sykmeldinger);

           expect(sykmeldingerSortertPaaUtstedelsesdato.length).to.equal(5);
           expect(sykmeldingerSortertPaaUtstedelsesdato[0].bekreftelse.utstedelsesdato).to.equal('2019-01-05');
           expect(sykmeldingerSortertPaaUtstedelsesdato[1].bekreftelse.utstedelsesdato).to.equal('2019-01-04');
           expect(sykmeldingerSortertPaaUtstedelsesdato[2].bekreftelse.utstedelsesdato).to.equal('2019-01-03');
           expect(sykmeldingerSortertPaaUtstedelsesdato[3].bekreftelse.utstedelsesdato).to.equal('2019-01-02');
           expect(sykmeldingerSortertPaaUtstedelsesdato[4].bekreftelse.utstedelsesdato).to.equal('2019-01-01');
        });
    });

    describe('sykmeldingerGruppertEtterVirksomhet', () => {
        it('skal returnere en liste med én liste av sykmeldinger per virksomhet', () => {

            const sykmeldinger = [
                {
                    mottakendeArbeidsgiver: {
                        virksomhetsnummer: '1',
                    },
                },
                {
                    mottakendeArbeidsgiver: {
                        virksomhetsnummer: '2',
                    },
                },
                {
                    mottakendeArbeidsgiver: {
                        virksomhetsnummer: '2',
                    },
                },
                {
                    mottakendeArbeidsgiver: {
                        virksomhetsnummer: '3',
                    },
                },
                {
                    mottakendeArbeidsgiver: {
                        virksomhetsnummer: '1',
                    },
                },
                {
                    mottakendeArbeidsgiver: {
                        virksomhetsnummer: '1',
                    },
                },
            ];


           const sykmeldingerSortertPaaVirksomhetsnummer = sykmeldingerGruppertEtterVirksomhet(sykmeldinger);

           expect(Object.keys(sykmeldingerSortertPaaVirksomhetsnummer).length).to.equal(3);
           expect(Object.keys(sykmeldingerSortertPaaVirksomhetsnummer['1']).length).to.equal(3);
           expect(Object.keys(sykmeldingerSortertPaaVirksomhetsnummer['2']).length).to.equal(2);
           expect(Object.keys(sykmeldingerSortertPaaVirksomhetsnummer['3']).length).to.equal(1);

        });
    });

    describe('sykmeldingperioderSortertEldstTilNyest', () => {
        it('skal returnere en liste med perioder sortert etter dato', () => {

            const sykmeldingperioder = [
                {
                    fom: '2019-01-05',
                },
                {
                    fom: '2019-01-04',
                },
                {
                    fom: '2019-01-01',
                },
                {
                    fom: '2019-01-02',
                },
                {
                    fom: '2019-01-03',
                },
            ];


           const sykmeldingperioderSortertEtterDato = sykmeldingperioderSortertEldstTilNyest(sykmeldingperioder);

           expect(sykmeldingperioderSortertEtterDato.length).to.equal(5);
           expect(sykmeldingperioderSortertEtterDato[0].fom).to.equal('2019-01-01');
           expect(sykmeldingperioderSortertEtterDato[1].fom).to.equal('2019-01-02');
           expect(sykmeldingperioderSortertEtterDato[2].fom).to.equal('2019-01-03');
           expect(sykmeldingperioderSortertEtterDato[3].fom).to.equal('2019-01-04');
           expect(sykmeldingperioderSortertEtterDato[4].fom).to.equal('2019-01-05');
        });
    });

    describe('stringMedAlleGraderingerFraSykmeldingPerioder', () => {
        it('skal returnere en string med alle graderinger fra en sykmelding', () => {

            const sykmeldingPerioderSortertEtterDato = [
                {
                    grad: 20,
                },
                {
                    grad: 100,
                },
                {
                    grad: 50,
                },
            ];


           const stringMedAllegraderinger = stringMedAlleGraderingerFraSykmeldingPerioder(sykmeldingPerioderSortertEtterDato);

           expect(stringMedAllegraderinger).to.equal('20% - 100% - 50');
        });
    });


});