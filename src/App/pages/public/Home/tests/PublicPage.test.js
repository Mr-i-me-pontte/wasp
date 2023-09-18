import { mount } from 'enzyme';
import Home from '../Home'

describe("<Home />", () => {
  it("must contain a iframe", () => {
    const wrapper = mount(<Home />)
    expect(wrapper.find('iframe').prop('src').length).not.toBe(0);
  })
})