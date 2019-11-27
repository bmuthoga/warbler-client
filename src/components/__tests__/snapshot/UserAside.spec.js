import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import UserAside from '../../UserAside'

const props = {
  profileImageUrl: 'https://lorempixel.com/200/200/',
  username: 'testemail'
}

describe('UserAside Snapshot Tests', () => {
  it('should render the UserAside component', () => {
    const wrapper = shallow(
      <UserAside { ...props } />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
