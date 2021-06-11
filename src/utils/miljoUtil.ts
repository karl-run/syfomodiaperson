export const erProd = () => {
  return window.location.href.indexOf("nais.adeo.no") > -1;
};

export const erPreProd = () => {
  return window.location.href.indexOf("nais.preprod.local") > -1;
};

export const finnMiljoStreng = () => {
  return erPreProd() ? "-q1" : "";
};

export const erLokal = (): boolean => {
  return window.location.host.indexOf("localhost") > -1;
};

export const finnNaisUrlDefault = () => {
  return erPreProd() ? ".nais.preprod.local" : ".nais.adeo.no";
};

export const fullNaisUrlDefault = (host: string, path: string) => {
  if (erLokal()) {
    return path;
  }
  return `https://${host}${finnNaisUrlDefault()}${path}`;
};

const env = {
  DEVELOPMENT: "Development",
  PREPROD: "Preprod",
  PRODUCTION: "Production",
  UNKNOWN: "Unknown",
};

export const getEnvironmentAsString = (): string => {
  if (erProd()) {
    return env.PRODUCTION;
  } else if (erPreProd()) {
    return env.PREPROD;
  } else if (erLokal()) {
    return env.DEVELOPMENT;
  } else {
    return env.UNKNOWN;
  }
};

export const erLokalEllerPreprod = erPreProd() || erLokal();
