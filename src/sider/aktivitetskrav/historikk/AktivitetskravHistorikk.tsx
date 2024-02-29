import React, { useState } from "react";
import {
  AktivitetskravStatus,
  AktivitetskravVurderingDTO,
} from "@/data/aktivitetskrav/aktivitetskravTypes";
import { FlexColumn, FlexRow, PaddingSize } from "@/components/Layout";
import {
  Accordion,
  BodyLong,
  BodyShort,
  Heading,
  Panel,
} from "@navikt/ds-react";
import { capitalizeWord } from "@/utils/stringUtils";
import { tilDatoMedManedNavn } from "@/utils/datoUtils";
import { useVeilederInfoQuery } from "@/data/veilederinfo/veilederinfoQueryHooks";
import { useAktivitetskravQuery } from "@/data/aktivitetskrav/aktivitetskravQueryHooks";
import { vurderingArsakTexts } from "@/data/aktivitetskrav/aktivitetskravTexts";
import * as Amplitude from "@/utils/amplitude";
import { EventType } from "@/utils/amplitude";
import { VisBrev } from "@/components/VisBrev";

const texts = {
  header: "Historikk",
  subHeader: "Tidligere vurderinger av aktivitetskravet i Modia",
  arsakTitle: "Årsak",
  visBrev: "Se hele brevet",
  visBrevLabel: "Vis brevet",
  vurdertAv: "Vurdert av",
};

const isRelevantForHistorikk = (vurdering: AktivitetskravVurderingDTO) =>
  vurdering.status === AktivitetskravStatus.OPPFYLT ||
  vurdering.status === AktivitetskravStatus.UNNTAK ||
  vurdering.status === AktivitetskravStatus.STANS ||
  vurdering.status === AktivitetskravStatus.IKKE_OPPFYLT ||
  vurdering.status === AktivitetskravStatus.FORHANDSVARSEL ||
  vurdering.status === AktivitetskravStatus.AVVENT;

const byCreatedAt = (
  v1: AktivitetskravVurderingDTO,
  v2: AktivitetskravVurderingDTO
) => new Date(v2.createdAt).getTime() - new Date(v1.createdAt).getTime();

export const AktivitetskravHistorikk = () => {
  const { data } = useAktivitetskravQuery();
  const vurderinger = data.flatMap((aktivitetskrav) =>
    aktivitetskrav.vurderinger.filter(isRelevantForHistorikk)
  );

  return (
    <Panel className="mb-4 flex flex-col p-8">
      <FlexRow bottomPadding={PaddingSize.MD}>
        <FlexColumn>
          <Heading level="2" size="large">
            {texts.header}
          </Heading>
          <BodyShort size="small">{texts.subHeader}</BodyShort>
        </FlexColumn>
      </FlexRow>
      <Accordion>
        {vurderinger.sort(byCreatedAt).map((vurdering, index) => (
          <HistorikkElement key={index} vurdering={vurdering} />
        ))}
      </Accordion>
    </Panel>
  );
};

const headerPrefix = (status: AktivitetskravStatus): string => {
  switch (status) {
    case AktivitetskravStatus.OPPFYLT:
    case AktivitetskravStatus.UNNTAK: {
      return capitalizeWord(status);
    }
    case AktivitetskravStatus.STANS: {
      return "Innstilling om stopp";
    }
    case AktivitetskravStatus.IKKE_OPPFYLT: {
      return "Ikke oppfylt";
    }
    case AktivitetskravStatus.FORHANDSVARSEL: {
      return "Forhåndsvarsel";
    }
    case AktivitetskravStatus.AVVENT: {
      return "Avventer";
    }
    case AktivitetskravStatus.NY:
    case AktivitetskravStatus.NY_VURDERING:
    case AktivitetskravStatus.AUTOMATISK_OPPFYLT:
    case AktivitetskravStatus.LUKKET:
    case AktivitetskravStatus.IKKE_AKTUELL: {
      // Ikke relevant for historikk
      return "";
    }
  }
};

interface HistorikkElementProps {
  vurdering: AktivitetskravVurderingDTO;
}

const HistorikkElement = ({ vurdering }: HistorikkElementProps) => {
  const { arsaker, beskrivelse, createdAt, createdBy, status, varsel } =
    vurdering;
  const [isOpen, setIsOpen] = useState(false);
  const { data: veilederinfo } = useVeilederInfoQuery(createdBy);
  const header = `${headerPrefix(status)} - ${tilDatoMedManedNavn(createdAt)}`;
  const beskrivelseTitle =
    status === AktivitetskravStatus.AVVENT ? "Beskrivelse" : "Begrunnelse";
  const arsakerText = () =>
    arsaker.map((arsak) => vurderingArsakTexts[arsak] || arsak).join(", ");

  const handleAccordionClick = () => {
    if (!isOpen) {
      // Vil bare logge klikk som åpner accordion
      Amplitude.logEvent({
        type: EventType.AccordionOpen,
        data: {
          tekst: `Åpne accordion aktivitetskrav historikk: ${header}`,
          url: window.location.href,
        },
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <Accordion.Item open={isOpen}>
      <Accordion.Header onClick={handleAccordionClick}>
        {header}
      </Accordion.Header>
      <Accordion.Content>
        {arsaker.length > 0 && (
          <Paragraph title={texts.arsakTitle} body={arsakerText()} />
        )}
        {!!beskrivelse && (
          <Paragraph title={beskrivelseTitle} body={beskrivelse} />
        )}
        <Paragraph title={texts.vurdertAv} body={veilederinfo?.navn ?? ""} />
        {status === AktivitetskravStatus.FORHANDSVARSEL && varsel?.document && (
          <VisBrev document={varsel.document} />
        )}
      </Accordion.Content>
    </Accordion.Item>
  );
};

interface ParagraphProps {
  title: string;
  body: string;
}

const Paragraph = ({ title, body }: ParagraphProps) => {
  return (
    <div className="mb-4">
      <b>{title}</b>
      <BodyLong size="small">{body}</BodyLong>
    </div>
  );
};
