import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Boats from "./Boats";
import "@testing-library/jest-dom";
jest.mock("axios");

describe("Boats Component", () => {
  it("prikazuje poruku kada nema čamaca", async () => {
    // Simuliranje praznog odgovora od servera
    axios.get.mockResolvedValue({ data: [] });

    render(<Boats />);
    const message = await screen.findByText(
      "There are no boats matching the criteria"
    );
    expect(message).toBeInTheDocument();
  });

  it("prikazuje čamce nakon uspešnog dohvatanja podataka", async () => {
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
    await waitFor(() => {
      const boatName = screen.getByText("Speedboat");
      expect(boatName).toBeInTheDocument();
    });
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

