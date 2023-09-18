import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { useForm } from "react-hook-form";
import Radio from "../Radio";

const WrapperComponent = ({ onSubmit = (_) => _, ...props }) => {
  const methods = useForm();

  return (
    <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
      <Radio {...{ ...props, ...methods }} />
      <button className="btn-test" />
    </form>
  );
};

describe("<Radio />", () => {
  describe("when rendering the component", () => {
    it("should show in vertical direction", () => {
      const props = {
        inline: false,
        name: "radiobutton",
        options: ["SIM", "NAO"]
      };

      const wrapper = mount(<WrapperComponent {...props} />);

      expect(wrapper.find(".radio__block").exists()).toBeTruthy();
    });

    it("should show in the horizontal direction", () => {
      const props = {
        inline: true,
        name: "radiobutton",
        options: ["SIM", "NAO"]
      };

      const wrapper = mount(<WrapperComponent {...props} />);

      expect(wrapper.find(".radio__inline").exists()).toBeTruthy();
    });

    it("must contain the text of the buttons, text label and help icon", () => {
      const props = {
        inline: true,
        name: "radiobutton",
        options: [
          { label: "SIM", value: 1 },
          { label: "NAO", value: 2 }
        ],
        helpInformation: "informacao de ajuda",
        label: "Deseja adicionar mais um pagador?"
      };

      const wrapper = mount(<WrapperComponent {...props} />);

      const texts = wrapper.text();

      expect(texts.includes(props.options[0].label)).toBeTruthy();
      expect(texts.includes(props.options[1].label)).toBeTruthy();
      expect(texts.includes(props.label)).toBeTruthy();

      expect(wrapper.find(".help-information").exists()).toBeTruthy();
    });

    it("should initially be the default value", async () => {
      const props = {
        inline: true,
        name: "radiobutton",
        options: ["SIM", "NAO"],
        defaultChecked: "SIM",
        label: "O empréstimo é em nome de:"
      };

      const wrapper = mount(<WrapperComponent {...props} />);

      expect(
        wrapper
          .find(".form-check-input")
          .filterWhere((node) => node.props().defaultChecked)
          .exists()
      ).toBeTruthy();
    });
  });

  describe("when submit the form", () => {
    it("must be possible to capture the input data and check", async () => {
      const props = {
        inline: true,
        name: "radiobutton",
        options: ["SIM", "NAO"],
        defaultChecked: "SIM",
        label: "O empréstimo é em nome de:"
      };

      const onSubmit = jest.fn();

      const wrapper = mount(
        <WrapperComponent onSubmit={onSubmit} {...props} />
      );

      const form = wrapper.find("form").first();

      await act(async () => Promise.resolve(form.simulate("submit")));

      expect(onSubmit).toBeCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({ radiobutton: "SIM" });
     
    });
  });
});
