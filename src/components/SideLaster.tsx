import React, { ReactElement, ReactNode } from "react";
import AppSpinner from "./AppSpinner";
import Feilmelding from "./Feilmelding";
import { hentBegrunnelseTekst } from "@/utils/tilgangUtils";
import { useTilgangQuery } from "@/data/tilgang/tilgangQueryHooks";

interface Props {
  henter: boolean;
  hentingFeilet: boolean;
  children: ReactNode;
  className?: string;
}

const texts = {
  errorTitle: "Du har ikke tilgang til denne tjenesten",
};

export default function SideLaster({
  henter,
  hentingFeilet,
  children,
  className,
}: Props): ReactElement {
  const {
    isLoading: henterTilgang,
    isError: hentingTilgangFeilet,
    data: tilgang,
  } = useTilgangQuery();
  const harTilgang = tilgang?.erGodkjent === true;

  if (henter || henterTilgang) {
    return <AppSpinner />;
  }
  if (!harTilgang) {
    return (
      <Feilmelding tittel={texts.errorTitle} melding={hentBegrunnelseTekst()} />
    );
  }
  if (hentingFeilet || hentingTilgangFeilet) {
    return <Feilmelding />;
  }
  return (
    <div className={`w-full ${className ? className : ""}`}>{children}</div>
  );
}
