import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Ritesh internship",
    author: "Ritesh",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("Ritesh internship");
  expect(element).toBeDefined();
});
