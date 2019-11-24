import React from 'react'
import { Link, MemoryRouter as Router} from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import Homepage from '../../Homepage'
import MessageTimeline from '../../MessageTimeline'

const currentUser = {
  isAuthenticated: true,
  user: {
    id: '7474hhrutu5it',
    username: 'testemail',
    profileImageUrl: 'http://lorempixel.com/200/200/'
  }
}

describe('Homepage Unit Tests', () => {
  it('should render the welcome page if no user is signed in', () => {
    const wrapper = mount(
      <Router>
        <Homepage
          currentUser={{}}
        />
      </Router>
    )

    expect(wrapper.find('div.home-hero').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toEqual(`What's Happening?`)
    expect(wrapper.find('h4').text()).toEqual('New to Warbler?')
    expect(wrapper.find(Link).exists()).toBe(true)
    expect(wrapper.find(Link).prop('to')).toEqual('/signup')
  })
  
  it('should render the MessageTimeline page/component if a user is signed in', () => {
    const wrapper = shallow(
      <Homepage
        currentUser={currentUser}
      />
    )

    expect(wrapper.find('div').length).toEqual(1)
    expect(wrapper.find(MessageTimeline).exists()).toBe(true)
  })
  
})
