import { describe, expect, test } from "bun:test";
import { isAllowedLogin } from "./auth-allowlist";

describe("isAllowedLogin", () => {
  test("allows the configured admin login (case-insensitive)", () => {
    expect(isAllowedLogin("Peafield", "peafield")).toBe(true);
    expect(isAllowedLogin("peafield", "peafield")).toBe(true);
  });

  test("rejects any other login", () => {
    expect(isAllowedLogin("someone-else", "peafield")).toBe(false);
  });

  test("rejects when login is missing", () => {
    expect(isAllowedLogin(undefined, "peafield")).toBe(false);
    expect(isAllowedLogin("peafield", undefined)).toBe(false);
  });
});
