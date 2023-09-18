import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "../../Auth";
import Header from "../Header";

const WrapperProvider = ({ children, value }) => {
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ ...value }}>
        {children}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe("<Header />", () => {
  it("must contain link for admin to access the help page", () => {
    const wrapper = mount(
      <WrapperProvider
        value={{
          user: {
            cognitoGroups: ["Admin"],
            isAuthenticated: true
          }
        }}
      >
        <Header />
      </WrapperProvider>
    );

    const headerWrapper = wrapper.find(".header-wrapper");

    expect(headerWrapper.length).not.toBe(0);
    expect(wrapper.find("a").at(1).prop("href")).toContain(
      "/private/help"
    );
  });

  it("must contain link for pontte_users to access the dashboard page", () => {
    const wrapper = mount(
      <WrapperProvider
        value={{
          user: {
            cognitoGroups: ["Pontte_Users"],
            isAuthenticated: true
          }
        }}
      >
        <Header />
      </WrapperProvider>
    );

    const headerWrapper = wrapper.find(".header-wrapper");

    expect(headerWrapper.length).not.toBe(0);
    expect(wrapper.find("a").at(1).prop("href")).toContain(
      "/private/dashboard"
    );
  });

  it("must contain link for user to access the help page", () => {
    const wrapper = mount(
      <WrapperProvider
        value={{
          user: {
            cognitoGroups: [],
            isAuthenticated: false
          }
        }}
      >
        <Header />
      </WrapperProvider>
    );

    const headerWrapper = wrapper.find(".header-wrapper");

    expect(headerWrapper.length).not.toBe(0);
    expect(wrapper.find("a").at(1).prop("href")).toContain("/private/help");
  });
});
