import { shallow } from "enzyme";
import LoadingIndicator from "../LoadingIndicator";

describe("<LoadingIndicator />", () => {
  it("renders the loadingIndicator", () => {
    const wrapper = shallow(<LoadingIndicator />);
    expect(wrapper.find('.loading-indicator')).toHaveLength(1);    
  });

  it("must have 'full' class to increase loading size", () => {
    const wrapper = shallow(<LoadingIndicator isFull={true}/>);
    expect(wrapper.find('.full')).toHaveLength(1);    
  });
});
