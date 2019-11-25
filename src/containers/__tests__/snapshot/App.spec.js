import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import App from '../../App'

describe('App Snapshot Tests', () => {
  it('should render the App component', () => {
    const wrapper = shallow(
      <App />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })  
})
