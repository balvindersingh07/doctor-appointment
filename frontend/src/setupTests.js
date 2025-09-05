import "@testing-library/jest-dom";
import { vi } from "vitest";

// Default fetch mock so components with fetch don't crash.
if (typeof global.fetch === "undefined") {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
}
