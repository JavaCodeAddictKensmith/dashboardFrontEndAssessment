import { render, screen } from "@testing-library/react";
import ManageLoan from "../scenes/manageLoan";
import '@testing-library/jest-dom';

test("Example 1 renders successfully", () => {
  render(<ManageLoan />);

  const element = screen.getByText(/first test/i);

  expect(element).toBeInTheDocument();
});
