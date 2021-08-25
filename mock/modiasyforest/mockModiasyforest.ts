import { ledereMock } from "../data/ledereMock";
import { oppfolgingstilfelleperioderMock } from "../data/oppfolgingstilfelleperioderMock";
import { brukerinfoMock } from "../data/brukerinfoMock";
import { MODIASYFOREST_ROOT } from "../../src/apiConstants";

const Auth = require("../../server/auth/index.js");

const getOppfolgingstilfellerPerson = () => {
  return [
    {
      fom: "2020-10-15",
      tom: "2020-10-21",
    },
  ];
};

export const mockModiasyforest = (server) => {
  server.get(
    `${MODIASYFOREST_ROOT}/allnaermesteledere`,
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(ledereMock));
    }
  );

  server.get(
    `${MODIASYFOREST_ROOT}/oppfolgingstilfelleperioder`,
    Auth.ensureAuthenticated(),
    (req, res) => {
      const { orgnummer } = req.query;
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(oppfolgingstilfelleperioderMock[orgnummer]));
    }
  );

  server.get(
    `${MODIASYFOREST_ROOT}/oppfolgingstilfelleperioder/utenarbeidsgiver`,
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(getOppfolgingstilfellerPerson());
    }
  );

  server.get(
    `${MODIASYFOREST_ROOT}/brukerinfo`,
    Auth.ensureAuthenticated(),
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(brukerinfoMock));
    }
  );
};
