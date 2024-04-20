import usersService from "@/resources/users/users.service";
import { drizzleMock } from "../setup";

describe("Users Service", () => {
  it("should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("create user", () => {
    it("should create a user", async () => {});
  });

  describe("retrieve users", () => {
    it("should find all users", async () => {});
  });

  describe("retrieve user", () => {
    it("should find a user", async () => {});
  });

  describe("update user", () => {
    it("should update a user", async () => {});
  });

  describe("delete user", () => {
    it("should delete a user", async () => {});
  });
});
