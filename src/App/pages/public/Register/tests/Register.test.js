import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../../components/Auth";
import RegisterPage from "../Register";
import * as dataStore from "../../../../helpers/dataStore";



const WrapperProvider = ({ children, value }) => {
  return (
    <MemoryRouter initialEntries={["?userInviteId=d344401c-340e-4512-a76e-bab04d83dcd3"]}>
      <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>
    </MemoryRouter>
  );
};

describe("<Register />", () => {
  describe("tes", () => {
    it("must receive a user invite id by query string and search user invite", () => {
      jest
        .spyOn(dataStore, "subscribeToModel")
        .mockImplementation(({ callback }) => {
          callback([{ id: "d344401c-340e-4512-a76e-bab04d83dcd3" }]);
        });

      render(
        <WrapperProvider value={{ user: {} }}>
          <RegisterPage />
        </WrapperProvider>
      );

      expect(dataStore.subscribeToModel).toBeCalledTimes(1);
    });
  });
});
