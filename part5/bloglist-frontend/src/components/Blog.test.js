import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog/>", () => {
  let component;
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 0,
    user: {
      username: "username",
      name: "name",
    },
  };
  const user = {
    username: "username",
    name: "name",
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />);
  });

  test("blog component renders title and author but not url or number of likes by default", () => {
    expect(component.container).toHaveTextContent("author");
    expect(component.container).toHaveTextContent("title");
    expect(component.container).not.toHaveTextContent("url");
    expect(component.container).not.toHaveTextContent("likes 0");
  });

  test("blog url and number of likes are shown when view button is pressed", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent("url");
    expect(component.container).toHaveTextContent("likes 0");
  });
});
