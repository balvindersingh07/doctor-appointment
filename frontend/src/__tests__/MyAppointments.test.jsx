import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyAppointments from "../pages/MyAppointments";
import { BrowserRouter } from "react-router-dom";

describe("MyAppointments", () => {
  it("renders year dropdown", () => {
    render(<BrowserRouter><MyAppointments /></BrowserRouter>);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
