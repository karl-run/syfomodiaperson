import React from "react";
import { SykmeldingOldFormat } from "@/data/sykmelding/types/SykmeldingOldFormat";
import SykmeldingNokkelOpplysning from "./SykmeldingNokkelOpplysning";
import SykmeldingPerioder from "./SykmeldingPerioder";
import { Egenmeldingsdager } from "./Egenmeldingsdager";
import { Heading } from "@navikt/ds-react";

const texts = {
  diagnose: "Diagnose",
  diagnosekode: "Diagnosekode",
};

interface Props {
  sykmelding: SykmeldingOldFormat;
}

export default function DineKoronaSykmeldingOpplysninger({
  sykmelding,
}: Props) {
  return (
    <div className="dine-opplysninger">
      <Heading size="medium" className="mb-6">
        Opplysninger
      </Heading>
      <div className="blokk-l side-innhold fjern-margin-bottom">
        <SykmeldingPerioder perioder={sykmelding.mulighetForArbeid.perioder} />
        {sykmelding.sporsmal.egenmeldingsdager &&
          sykmelding.sporsmal.egenmeldingsdager.length > 0 && (
            <Egenmeldingsdager
              egenmeldingsdager={sykmelding.sporsmal.egenmeldingsdager}
            />
          )}
        {sykmelding.diagnose.hoveddiagnose ? (
          <div className="hoveddiagnose">
            <div className="rad-container">
              <SykmeldingNokkelOpplysning
                className="nokkelopplysning--hoveddiagnose"
                tittel={texts.diagnose}
              >
                <div>
                  <p className="js-hoveddiagnose">
                    {sykmelding.diagnose.hoveddiagnose.diagnose}
                  </p>
                </div>
              </SykmeldingNokkelOpplysning>
              <div className="nokkelopplysning nokkelopplysning--hoveddiagnose js-hoveddiagnose-kode-container">
                <div className="medHjelpetekst">
                  <h3 className="nokkelopplysning__tittel">
                    {texts.diagnosekode}
                  </h3>
                </div>
                <p>
                  <span className="js-hoveddiagnose-kode">
                    {sykmelding.diagnose.hoveddiagnose.diagnosekode}
                  </span>
                  &nbsp;
                  <span className="js-hoveddiagnose-system">
                    {sykmelding.diagnose.hoveddiagnose.diagnosesystem}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
