import React from "react";
import { BodyShort, Button, Heading, Panel } from "@navikt/ds-react";
import { useOppfolgingstilfellePersonQuery } from "@/data/oppfolgingstilfelle/person/oppfolgingstilfellePersonQueryHooks";
import { useCreateAktivitetskrav } from "@/data/aktivitetskrav/useCreateAktivitetskrav";
import { SkjemaInnsendingFeil } from "@/components/SkjemaInnsendingFeil";
import { GjelderOppfolgingstilfelle } from "@/components/aktivitetskrav/GjelderOppfolgingstilfelle";
import {
  AktivitetskravDTO,
  AktivitetskravStatus,
  AktivitetskravVurderingDTO,
} from "@/data/aktivitetskrav/aktivitetskravTypes";
import { useNavBrukerData } from "@/data/navbruker/navbruker_hooks";
import { vurderingArsakTexts } from "@/data/aktivitetskrav/aktivitetskravTexts";

export const texts = {
  header: "Start ny aktivitetskrav-vurdering",
  noVurdering:
    "Aktivitetskravet er ikke tidligere vurdert i dette sykefraværet.",
  changeUtfall: "For å endre utfall må du starte en ny vurdering.",
  button: "Start ny vurdering",
};

interface VurderingTextProps {
  vurdering: AktivitetskravVurderingDTO;
}

const VurderingText = ({ vurdering }: VurderingTextProps) => {
  const { navn: brukersNavn } = useNavBrukerData();
  const { status, arsaker, beskrivelse } = vurdering;

  const statusText = (): string => {
    switch (status) {
      case AktivitetskravStatus.OPPFYLT: {
        return `Det ble vurdert at ${brukersNavn} er i aktivitet.`;
      }
      case AktivitetskravStatus.UNNTAK: {
        return `Det ble vurdert unntak for ${brukersNavn}.`;
      }
      case AktivitetskravStatus.IKKE_OPPFYLT: {
        return `Det ble vurdert at aktivitetskravet ikke er oppfylt for ${brukersNavn}.`;
      }
      case AktivitetskravStatus.IKKE_AKTUELL: {
        return `Det ble vurdert at aktivitetskravet ikke er aktuelt for ${brukersNavn}.`;
      }
      default: {
        throw new Error(`Not supported`);
      }
    }
  };

  const arsakText = () => {
    if (arsaker.length === 0 && !beskrivelse) {
      return "";
    }

    const arsakerText = `${arsaker
      .map((arsak) => vurderingArsakTexts[arsak])
      .join(", ")}`;
    const beskrivelseText = beskrivelse ? `, ${beskrivelse}` : "";

    return `Årsak: ${arsakerText}${beskrivelseText}.`;
  };

  return (
    <BodyShort className="mb-4">{`${statusText()} ${arsakText()} ${
      texts.changeUtfall
    }`}</BodyShort>
  );
};

interface StartNyVurderingProps {
  aktivitetskrav: AktivitetskravDTO | undefined;
}

export const StartNyVurdering = ({ aktivitetskrav }: StartNyVurderingProps) => {
  const { hasActiveOppfolgingstilfelle, latestOppfolgingstilfelle } =
    useOppfolgingstilfellePersonQuery();
  const createAktivitetskrav = useCreateAktivitetskrav();
  const handleStartNyVurdering = () => {
    const newAktivitetskrav = aktivitetskrav
      ? { previousAktivitetskravUuid: aktivitetskrav?.uuid }
      : undefined;
    createAktivitetskrav.mutate(newAktivitetskrav);
  };
  const sisteVurdering = aktivitetskrav?.vurderinger[0];

  return (
    <Panel className="mb-4 flex flex-col p-8">
      <Heading level="2" size="large" className="mb-1">
        {texts.header}
      </Heading>
      {hasActiveOppfolgingstilfelle && (
        <GjelderOppfolgingstilfelle
          oppfolgingstilfelle={latestOppfolgingstilfelle}
        />
      )}
      {sisteVurdering ? (
        <VurderingText vurdering={sisteVurdering} />
      ) : (
        <BodyShort className="mb-4">{texts.noVurdering}</BodyShort>
      )}
      {createAktivitetskrav.isError && (
        <SkjemaInnsendingFeil error={createAktivitetskrav.error} />
      )}
      <Button
        variant="secondary"
        className="mr-auto"
        loading={createAktivitetskrav.isLoading}
        onClick={handleStartNyVurdering}
      >
        {texts.button}
      </Button>
    </Panel>
  );
};