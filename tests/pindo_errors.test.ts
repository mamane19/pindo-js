import { expect } from "chai";
import {
  PindoError,
  PindoCastingError,
  PindoUnexpectedResponseError,
} from "../src/pindo_errors";

describe("PindoError", () => {
  it("has concise toString", () => {
    expect(
      new PindoError(200, "failed", "response", "testing").toString()
    ).to.equal("PindoError: failed");
  });
});

describe("PindoCastingError", () => {
  it("has concise toString", () => {
    expect(new PindoCastingError("failed").toString()).to.equal(
      "PindoCastingError: failed"
    );
  });
});

describe("PindoUnexpectedResponseError", () => {
  const expected = {
    status: 200,
    message: "failed",
  };
  const received = {
    status: 400,
    message: "approved",
  };
  it("has concise toString", () => {
    expect(
      new PindoUnexpectedResponseError(expected, received).toString()
    ).to.eql(`PindoUnexpectedResponseError: expected: ${expected}, but received: ${received}`);
  });
});
