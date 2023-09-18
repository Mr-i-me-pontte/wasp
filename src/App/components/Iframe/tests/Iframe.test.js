import { shallow } from "enzyme";
import Iframe from "../Iframe";

describe("<Iframe />", () => {
  it("must receive the url", () => {
    const wrapper = shallow(<Iframe url={"https://"} />);
    expect(wrapper.prop("src")).toBe("https://");
  });
});
