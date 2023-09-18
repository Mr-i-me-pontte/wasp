import { mount } from "enzyme";
import { useForm } from "react-hook-form";
import Select from "../Select/Select";

const WrapperComponent = ({ onSubmit, ...props }) => {
  const methods = useForm();

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <Select {...{ ...props, ...methods }} />
      <button />
    </form>
  );
};

describe("<Select />", () => {
  describe("when render the component", () => {
    it("should be possible to click on the header and see the list", () => {

      const props = {
        options: ["SIM", "NÃO"]
      }

      const wrapper = mount(<WrapperComponent  {...props}/>);

      wrapper.find(".select-header").simulate("click");

      expect(wrapper.find(".select-list").exists()).toBeTruthy();
    });
  });

});
