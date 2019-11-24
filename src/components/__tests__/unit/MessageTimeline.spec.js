import React from 'react'
import { shallow } from 'enzyme'
import MessageTimeline from '../../MessageTimeline'
import MessageList from '../../../containers/MessageList'
import UserAside from '../../UserAside'

const props = {
  profileImageUrl: 'http://lorempixel.com/200/200/',
  username: 'testemail'
}

describe('MessageTimeline Unit Tests', () => {
  it('should render the MessageTimeline component', () => {
    const wrapper = shallow(
      <MessageTimeline { ...props } />
    )

    expect(wrapper.find('div.row').length).toEqual(1)
    expect(wrapper.find(UserAside).exists()).toBe(true)
    expect(wrapper.find(UserAside).props().profileImageUrl).toEqual(props.profileImageUrl)
    expect(wrapper.find(UserAside).props().username).toEqual(props.username)
    expect(wrapper.find(MessageList).exists()).toBe(true)
  })
})
