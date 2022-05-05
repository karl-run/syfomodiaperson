import React, { ReactElement } from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import { ValidationErrors } from "final-form";
import {
  Radio,
  RadioGruppe,
  SkjemaelementFeilmelding,
} from "nav-frontend-skjema";
import { UnntakArsak } from "@/data/dialogmotekandidat/types/dialogmoteunntakTypes";

const texts = {
  arsakLegend: "Årsak til unntak (obligatorisk)",
};

interface UnntakArsakText {
  arsak: UnntakArsak;
  text: string;
}

const unntakArsakTexts: UnntakArsakText[] = [
  {
    arsak: UnntakArsak.MEDISINSKE_GRUNNER,
    text: "Medisinske grunner",
  },
  {
    arsak: UnntakArsak.INNLEGGELSE_INSTITUSJON,
    text: "Innleggelse i helseinstitusjon",
  },
  {
    arsak: UnntakArsak.FORVENTET_FRISKMELDING_INNEN_28UKER,
    text: "Forventet friskmelding innen 28 ukers sykmelding",
  },
  {
    arsak: UnntakArsak.DOKUMENTERT_TILTAK_FRISKMELDING,
    text: "Tiltak som sannsynligvis vil føre til en friskmelding",
  },
  {
    arsak: UnntakArsak.ARBEIDSFORHOLD_OPPHORT,
    text: "Arbeidsforholdet er opphørt",
  },
];

export const StyledRadioGruppe = styled(RadioGruppe)`
  margin-bottom: 1em;
`;

export const DialogmoteunntakSkjemaArsakVelgerFieldName = "arsak";

interface DialogmoteunntakSkjemaArsakVelgerProps {
  submitFailed: boolean;
  errors: ValidationErrors;
}

const DialogmoteunntakSkjemaArsakVelger = ({
  submitFailed,
  errors,
}: DialogmoteunntakSkjemaArsakVelgerProps): ReactElement => {
  return (
    <StyledRadioGruppe legend={texts.arsakLegend}>
      {unntakArsakTexts.map((unntakArsakText, index) => (
        <Field<UnntakArsak>
          key={index}
          name={DialogmoteunntakSkjemaArsakVelgerFieldName}
          value={unntakArsakText.arsak}
          type="radio"
        >
          {({ input, meta }) => (
            <Radio
              {...input}
              label={unntakArsakText.text}
              feil={meta.submitFailed && meta.error}
            />
          )}
        </Field>
      ))}
      <SkjemaelementFeilmelding>
        {submitFailed &&
          errors &&
          errors[DialogmoteunntakSkjemaArsakVelgerFieldName]}
      </SkjemaelementFeilmelding>
    </StyledRadioGruppe>
  );
};
export default DialogmoteunntakSkjemaArsakVelger;