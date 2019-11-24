import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Homepage from '../../Homepage'

it('should render the welcome page if no user is signed in', () => {
  const wrapper = shallow(
    <Homepage
      currentUser={{}}
    />
  )

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('should render the MessageTimeline page/component if a user is signed in', () => {
  const currentUser = {
    isAuthenticated: true,
    user: {
      id: '7474hhrutu5it',
      username: 'testemail',
      profileImageUrl: 'http://lorempixel.com/200/200/'
    }
  }
  const wrapper = shallow(
    <Homepage
      currentUser={currentUser}
    />
  )

  expect(toJson(wrapper)).toMatchSnapshot()
})
