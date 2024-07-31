import { render } from "@testing-library/react";
import LoginPage from "@/pages/login/index";

describe("Login page", () => {
  it("renders login page correctly", () => {
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });
});
