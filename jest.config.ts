import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/src/__tests__/**/*.+(spec|test).ts"],
};

export default config;
