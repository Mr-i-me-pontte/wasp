import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import ConfirmationCodeModal from "../ConfirmationCodeModal";

const WrapperProvider = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe("<ConfirmationCodeModal />", () => {
  it("should render component", () => {
    const wrapper = shallow(
      <WrapperProvider>
        <ConfirmationCodeModal />
      </WrapperProvider>
    );
    const div = wrapper.find(".modal-validation-code");
    expect(div).toBeTruthy();
  });
});
