import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";
import { Provider } from "react-redux";
import store from "../store/store";
import { BrowserRouter } from "react-router-dom";

function wrap(ui){
  return render(<Provider store={store}><BrowserRouter>{ui}</BrowserRouter></Provider>);
}

describe("Login form", () => {
  it("shows validation when fields empty", () => {
    wrap(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByText(/email/i)).toBeInTheDocument();
  });
});
