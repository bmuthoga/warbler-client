import React from 'react'
import { shallow } from 'enzyme'
import { MessageList } from '../../MessageList'
import MessageItem from '../../../components/MessageItem'

const props = {
  fetchMessages: jest.fn(),
  messages: [
    {
      _id: '5dd9623a6b0e9763b9441698',
      text: 'testing if all is working after login tests with another account',
      user: {
        _id: '5dd9621e6b0e9763b9441697',
        username: 'tester10',
        profileImageUrl: 'http://lorempixel.com/200/200/'
      },
      createdAt: '2019-11-23T16:45:46.174Z',
      updatedAt: '2019-11-23T16:45:46.174Z',
      __v: 0
    }
  ],
  removeMessage: jest.fn(),
  currentUser: '783ryy84hfh4u4hgu'
}

describe('MessageList Unit Tests', () => {
  it('should render MessageList component', () => {
    const wrapper = shallow(
      <MessageList { ...props } />
    )

    expect(wrapper.instance().props.fetchMessages).toHaveBeenCalled()
    expect(wrapper.find('ul').length).toEqual(1)
    expect(wrapper.find('ul').prop('id')).toEqual('messages')
    expect(wrapper.find(MessageItem).exists()).toBe(true)
    expect(wrapper.find(MessageItem).length).toEqual(1)
    expect(wrapper.find(MessageItem).at(0).props().date).toEqual(props.messages[0].createdAt)
    expect(wrapper.find(MessageItem).at(0).prop('text')).toEqual(props.messages[0].text)
    expect(wrapper.find(MessageItem).at(0).prop('username')).toEqual(props.messages[0].user.username)
    expect(wrapper.find(MessageItem).at(0).prop('profileImageUrl')).toEqual(props.messages[0].user.profileImageUrl)
    expect(wrapper.find(MessageItem).at(0).prop('isCorrectUser')).toEqual(false)
    expect(wrapper.instance().props.removeMessage).toEqual(props.removeMessage)
    expect(wrapper.instance().props.fetchMessages).toEqual(props.fetchMessages)
    expect(wrapper.instance().props.messages).toEqual(props.messages)
    expect(wrapper.instance().props.removeMessage).toEqual(props.removeMessage)
    expect(wrapper.instance().props.currentUser).toEqual(props.currentUser)
  })

  it('should not render MessageItem child component when props.messages is empty array', () => {
    const wrapper = shallow(
      <MessageList { ...props } messages={[]} />
    )
    expect(wrapper.find(MessageItem).exists()).toBe(false)
    expect(wrapper.find('ul').props().children.length).toEqual(0)
  })

  it('should render MessageItem child component with "isCorrectUer" prop having value of true', () => {
    const wrapper = shallow(
      <MessageList { ...props } currentUser='5dd9621e6b0e9763b9441697' />
    )

    expect(wrapper.find(MessageItem).at(0).props().isCorrectUser).toEqual(true)
  })
})
