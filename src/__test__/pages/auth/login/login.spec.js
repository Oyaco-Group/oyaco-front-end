import { render } from "@testing-library/react";
import LoginPage from "@/pages/login/index";

//Scenario
describe("Login page", () => {
  //Test case
  it("renders login page correctly", () => {
    const { page } = render(<LoginPage />);
    expect(page).toMatchSnapshot();
  });
});
