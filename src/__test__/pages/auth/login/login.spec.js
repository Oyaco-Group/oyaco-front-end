import { render } from "@testing-library/react";
import LoginPage from "@/pages/login/index";

describe("Login page", () => {
  it("renders login page correctly", () => {
    const { page } = render(<LoginPage />);
    expect(page).toMatchSnapshot();
  });
});
