import {
    tidslinjerSagas,
} from '@navikt/digisyfo-npm';
import { all } from 'redux-saga/effects';
import ledereSagas from './ledereSagas';
import fastlegerSagas from './fastlegerSagas';
import navbrukerSagas from './navbrukerSagas';
import veilederoppgaverSagas from './veilederoppgaverSagas';
import moterSagas from './moterSagas';
import motebehovSagas from './motebehovSagas';
import epostinnholdSagas from './epostinnholdSagas';
import sykmeldingerSagas from './sykmeldingerSagas';
import oppfoelgingsdialogerSagas from './oppfoelgingsdialogerSagas';
import modiacontextSagas from './modiacontextSagas';
import arbeidsgiversSykmeldingerSagas from './arbeidsgiversSykmeldingerSagas';
import sykeforloepSagas from './sykeforloepSagas';
import sykepengesoknaderSagas from './sykepengesoknaderSagas';
import historikkSagas from './historikkSagas';
import behandlendeEnhetSagas from './behandlendeEnhetSagas';
import dokumentInfoSagas from './dokumentInfoSagas';
import virksomhetSagas from './virksomhetSagas';
import veilederinfoSagas from './veilederinfoSagas';
import diskresjonskodeSagas from './diskresjonskodeSagas';
import egenansattSagas from './egenansattSagas';
import ledeteksterSagas from './ledeteksterSagas';
import tilgangSagas from './tilgangSagas';
import soknaderSagas from './soknaderSagas';
import oppfolgingstilfelleperioderSagas from './oppfolgingstilfelleperioderSagas';

export default function* rootSaga() {
    yield all([
        ledereSagas(),
        fastlegerSagas(),
        navbrukerSagas(),
        moterSagas(),
        motebehovSagas(),
        ledeteksterSagas(),
        epostinnholdSagas(),
        virksomhetSagas(),
        modiacontextSagas(),
        sykmeldingerSagas(),
        oppfoelgingsdialogerSagas(),
        sykepengesoknaderSagas(),
        arbeidsgiversSykmeldingerSagas(),
        sykeforloepSagas(),
        historikkSagas(),
        veilederoppgaverSagas(),
        behandlendeEnhetSagas(),
        dokumentInfoSagas(),
        veilederinfoSagas(),
        diskresjonskodeSagas(),
        egenansattSagas(),
        tilgangSagas(),
        tidslinjerSagas(),
        soknaderSagas(),
        oppfolgingstilfelleperioderSagas(),
    ]);
}