import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { shallow } from 'enzyme'
import { Main } from '../../Main'

const props = {
  authUser: jest.fn(),
  errors: {},
  removeError: jest.fn(),
  currentUser: {}
}

describe('Main Unit Tests', () => {
  it('should render the Main component', () => {
    const wrapper = shallow(
      <Main { ...props } />
    )

    expect(wrapper.find('div.container').length).toEqual(1)
    expect(wrapper.find(Switch).length).toEqual(1)
    expect(wrapper.find(Route).length).toEqual(4)
    expect(wrapper.find(Route).at(0).prop('path')).toEqual('/')
    expect(wrapper.find(Route).at(1).prop('path')).toEqual('/signin')
    expect(wrapper.find(Route).at(2).prop('path')).toEqual('/signup')
    expect(wrapper.find(Route).at(3).prop('path')).toEqual('/users/:id/messages/new')
  })
})
