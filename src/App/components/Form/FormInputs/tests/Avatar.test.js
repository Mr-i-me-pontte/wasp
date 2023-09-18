import { mount } from "enzyme";
import { useForm } from "react-hook-form";
import Avatar from "../Avatar";

const WrapperComponent = ({ props }) => {
  const methods = useForm();
  return <Avatar {...{ ...props, setValue: methods.setValue }} name="fake-name" />;
};

describe("<Avatar />", () => {
  it("should render a a file input field", () => {
    const component = mount(<WrapperComponent />);
    expect(component.find('input[type="file"]').exists()).toBeTruthy();
  });
});
