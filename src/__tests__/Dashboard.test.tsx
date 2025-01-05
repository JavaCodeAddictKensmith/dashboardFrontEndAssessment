import { render, screen } from "@testing-library/react";

import DashBoard from "../scenes/dashboard";
import "@testing-library/jest-dom";

test("Example 1 renders successfully", () => {
  render(<DashBoard />);

  const element = screen.getByText(/first test/i);

  expect(element).toBeInTheDocument();
});
