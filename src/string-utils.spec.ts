import { describe, expect, it } from "vitest";
import { trimAndTitleCase } from "./string-utils";

describe("trimAndTitleCase", () => {
  it("title-cases lowercase input", () => {
    expect(trimAndTitleCase("hello world")).toBe("Hello World");
  });

  it("trims surrounding whitespace", () => {
    expect(trimAndTitleCase("  hello world  ")).toBe("Hello World");
  });

  it("preserves internal multiple spaces", () => {
    expect(trimAndTitleCase("hello   world")).toBe("Hello   World");
  });

  it("normalizes mixed-case input", () => {
    expect(trimAndTitleCase("hELLo wORld")).toBe("Hello World");
  });

  it("returns an empty string for an empty input", () => {
    expect(trimAndTitleCase("")).toBe("");
  });

  it("returns an empty string for whitespace-only input", () => {
    expect(trimAndTitleCase("   \t\n  ")).toBe("");
  });

  it("handles accented text", () => {
    expect(trimAndTitleCase("árvíztűrő tükörfúrógép")).toBe("Árvíztűrő Tükörfúrógép");
  });
});
