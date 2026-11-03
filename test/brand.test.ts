import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { BRAND } from "../src/brand.js";

const srcDir = join(__dirname, "..", "src");
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

describe("brand", () => {
  it("derives the defaults from the brand file", () => {
    expect(BRAND.apiUrl).toContain("/api/v1");
    expect(BRAND.gatewayUrl.startsWith("wss://")).toBe(true);
  });

  it("keeps the product name and brand domain out of string literals outside brand.ts", () => {
    const base = new URL(BRAND.webUrl).hostname.split(".").slice(-2).join(".");
    const escape = (v: string) => v.split(".").join("[.]");
    const literal = new RegExp("[\"'`][^\"'`]*(" + BRAND.name + "(?![A-Za-z])|" + escape(base) + ")");
    const offenders = walk(srcDir)
      .filter((f) => f.endsWith(".ts") && relative(srcDir, f).split(sep).join("/") !== "brand.ts")
      .filter((f) => readFileSync(f, "utf8").split("\n").some((l) => !/^\s*(\/\/|\*|\/\*)/.test(l) && literal.test(l)))
      .map((f) => relative(srcDir, f));
    expect(offenders).toEqual([]);
  });
});
