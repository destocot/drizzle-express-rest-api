import { UserTable } from "@/drizzle/schema";
import db from "../drizzle";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

const drizzleMock: DeepMockProxy<typeof db> = mockDeep();

jest.mock("../drizzle", () => ({
  __esModule: true,
  ...jest.requireActual("../drizzle"),
  default: drizzleMock,
}));

beforeEach(() => {
  mockReset(drizzleMock);
});

export { drizzleMock };
