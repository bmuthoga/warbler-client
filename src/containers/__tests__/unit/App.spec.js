import React from 'react'
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import Navbar from '../../Navbar'
import Main from '../../Main'
import App from '../../App'

describe('App Unit Tests', () => {
  it('should render the App component', () => {
    const wrapper = shallow(
      <App />
    )

    expect(wrapper.find(Provider).exists()).toBe(true)
    expect(wrapper.find(Provider).length).toEqual(1)
    expect(wrapper.find(Provider).exists()).toBe(true)
    expect(wrapper.find(Router).length).toEqual(1)
    expect(wrapper.find('div.onboarding').exists()).toBe(true)
    expect(wrapper.find('div.onboarding').props().children.length).toEqual(2)
    expect(wrapper.find(Navbar).exists()).toBe(true)
    expect(wrapper.find(Main).exists()).toBe(true)
  })
})
