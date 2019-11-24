import React from 'react'
import { shallow, mount } from 'enzyme'
import UserAside from '../../UserAside'

const props = {
  profileImageUrl: 'http://lorempixel.com/200/200/',
  username: 'testemail'
}

describe('UserAside Unit Tests', () => {
  it('should render the UserAside component with the default profile image if none is provided', () => {
    const wrapper = mount(
      <UserAside username='testemail' />
    )

    expect(wrapper.props().username).toEqual(props.username)
    expect(wrapper.props().profileImageUrl).not.toEqual(props.profileImageUrl)
    expect(wrapper.find('aside').length).toEqual(1)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').prop('src')).not.toEqual(props.profileImageUrl)
    expect(wrapper.find('img').prop('alt')).toEqual(props.username)
  })
  
  it('should render the UserAside component with the provided image url', () => {
    const wrapper = mount(
      <UserAside { ...props } />
    )

    expect(wrapper.props().username).toEqual(props.username)
    expect(wrapper.props().profileImageUrl).toEqual(props.profileImageUrl)
    expect(wrapper.find('aside').length).toEqual(1)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').prop('src')).toEqual(props.profileImageUrl)
    expect(wrapper.find('img').prop('alt')).toEqual(props.username)
  })
})
