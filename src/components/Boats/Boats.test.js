import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Boats from "./Boats";
import "@testing-library/jest-dom";
import { MyContext } from "../../context/myContext";
import App from "../../App";
import { BrowserRouter as Router } from "react-router-dom";
jest.mock("axios");

describe("Boats Component", () => {
  it("prikazuje poruku kada nema čamaca", async () => {
    // Simuliranje praznog odgovora od servera
    axios.get.mockResolvedValue({ data: [] });

    render(<Boats />);

    // Provera da li se prikazuje odgovarajuća poruka
    const message = await screen.findByText(
      "There are no boats matching the criteria"
    );
    expect(message).toBeInTheDocument();
  });

  it("prikazuje čamce nakon uspešnog dohvatanja podataka", async () => {
    // Simuliranje odgovora sa podacima
    const boatsData = [
      {
        id: 1,
        name: "Speedboat",
        type: "Motor",
        price: "100",
        available: true,
        imageName: "speedboat.jpg",
      },
    ];
    axios.get.mockResolvedValue({ data: boatsData });

    render(<Boats />);

    // Provera da li se čamci prikazuju
    await waitFor(() => {
      const boatName = screen.getByText("Speedboat");
      expect(boatName).toBeInTheDocument();
    });
  });
});

afterEach(() => {
  jest.resetAllMocks();
  // Dodajte više testova za različite funkcionalnosti...
});

const mockContextValue = {
  user: {
    name: "Test User",
    user: {
      role: "Admin",
    },
    // ... other user properties ...
  },
  setUserFunction: jest.fn(), // Mock function if needed
};

test("renders learn react link", () => {
  render(
    <Router>
      <MyContext.Provider value={mockContextValue}>
        <App />
      </MyContext.Provider>
    </Router>
  );
  // ... your test assertions ...
});
