import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Main from '../../Main'

describe('Main Snapshot Tests', () => {
  it('should render the Main component', () => {
    const wrapper = shallow(
      <Main />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
