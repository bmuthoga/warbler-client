import React from 'react'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'
import { Navbar } from '../../Navbar'

const props = {
  logout: jest.fn(),
  currentUser: {
    isAuthenticated: false,
    user: {}
  }
}

const currentUser = {
  isAuthenticated: true,
  user: {
    id: '848hrjhgj48u4585',
    username: 'testuser',
    profileImageUrl: 'http://lorempixel.com/200/200/'
  }
}

describe('Navbar Unit Tests', () => {
  it('should render the signed out state Navbar component', () => {
    const wrapper = shallow(
      <Navbar { ...props } />
    )

    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('nav').length).toEqual(1)
    expect(wrapper.find('div.navbar-header').exists()).toBe(true)
    expect(wrapper.find(Link).length).toEqual(3)
    expect(wrapper.find(Link).at(0).prop('to')).toEqual('/')
    expect(wrapper.find(Link).at(0).props().children.type).toEqual('img')
    expect(wrapper.find(Link).at(0).props().children.props.src).toEqual('warbler-logo.png')
    expect(wrapper.find(Link).at(0).props().children.props.alt).toEqual('Warbler Home')
    expect(wrapper.find('ul').props().children.length).toEqual(2)
    expect(wrapper.find(Link).at(1).prop('to')).toEqual('/signup')
    expect(wrapper.find(Link).at(1).props().children).toEqual('Sign up')
    expect(wrapper.find(Link).at(2).prop('to')).toEqual('/signin')
    expect(wrapper.find(Link).at(2).props().children).toEqual('Log in')
  })
  
  it('should render the signed in state Navbar component', () => {
    const wrapper = shallow(
      <Navbar { ...props } currentUser={currentUser} />
    )

    expect(wrapper.find(Link).length).toEqual(2)
    expect(wrapper.find(Link).at(1).props().to).toEqual(`/users/${currentUser.user.id}/messages/new`)
    expect(wrapper.find(Link).at(1).props().children).toEqual('New Message')
    expect(wrapper.find('li').last().props().children.type).toEqual('a')
    expect(typeof wrapper.find('a').props().onClick).toEqual('function')
    expect(wrapper.find('a').props().children).toEqual('Log out')
  })

  it('should call props.logout() when Logout button clicked', () => {
    const wrapper = shallow(
      <Navbar { ...props } currentUser={currentUser} />
    )
    const logoutButton = wrapper.find('a')
    logoutButton.simulate('click', {
      preventDefault: () => {}
    })

    expect(wrapper.instance().props.logout).toHaveBeenCalled()
  })  
})
