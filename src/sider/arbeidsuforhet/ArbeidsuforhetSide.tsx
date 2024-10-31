import React, { ReactElement } from "react";
import Side from "@/sider/Side";
import Sidetopp from "@/components/Sidetopp";
import SideLaster from "@/components/SideLaster";
import UtdragFraSykefravaeret from "@/components/utdragFraSykefravaeret/UtdragFraSykefravaeret";
import * as Tredelt from "@/sider/TredeltSide";
import { Menypunkter } from "@/components/globalnavigasjon/GlobalNavigasjon";
import { useGetArbeidsuforhetVurderingerQuery } from "@/data/arbeidsuforhet/arbeidsuforhetQueryHooks";
import { VurderingHistorikk } from "@/sider/arbeidsuforhet/historikk/VurderingHistorikk";
import { VStack } from "@navikt/ds-react";

const texts = {
  title: "Arbeidsuførhet",
};

interface Props {
  children: ReactElement;
}

export const ArbeidsuforhetSide = ({ children }: Props): ReactElement => {
  const { isLoading, isError } = useGetArbeidsuforhetVurderingerQuery();

  return (
    <Side tittel={texts.title} aktivtMenypunkt={Menypunkter.ARBEIDSUFORHET}>
      <Sidetopp tittel={texts.title} />
      <SideLaster henter={isLoading} hentingFeilet={isError}>
        <Tredelt.Container>
          <Tredelt.FirstColumn>
            <VStack gap="2">
              {children}
              <VurderingHistorikk />
            </VStack>
          </Tredelt.FirstColumn>
          <Tredelt.SecondColumn>
            <UtdragFraSykefravaeret />
          </Tredelt.SecondColumn>
        </Tredelt.Container>
      </SideLaster>
    </Side>
  );
};
