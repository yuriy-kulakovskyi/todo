import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^@presentation/(.*)$": "<rootDir>/presentation/$1",
    "^@shared/(.*)$": "<rootDir>/shared/$1",
    "^@config/(.*)$": "<rootDir>/config/$1",
  },
};