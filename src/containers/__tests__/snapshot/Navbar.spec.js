import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Navbar } from '../../Navbar'

const props = {
  logout: jest.fn(),
  currentUser: {
    isAuthenticated: false,
    user: {}
  }
}

describe('Navbar Snapshot Tests', () => {
  it('should render the signed out state Navbar component', () => {
    const wrapper = shallow(
        <Navbar { ...props } />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('should render the signed in state Navbar component', () => {
    const currentUser = {
      isAuthenticated: true,
      user: {
        id: '848hrjhgj48u4585',
        username: 'testuser',
        profileImageUrl: 'http://lorempixel.com/200/200/'
      }
    }
    const wrapper = shallow(
      <Navbar { ...props } currentUser={currentUser} />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
