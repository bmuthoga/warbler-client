import React from 'react'
import { Link, MemoryRouter as Router } from 'react-router-dom'
import Moment from 'react-moment'
import { mount } from 'enzyme'
import MessageItem from '../../MessageItem'

const messageItemProps = {
  date: '2019-11-18T01:31:05.005Z',
  text: 'Sample message text',
  username: 'testemail',
  profileImageUrl: 'https://lorempixel.com/200/200/',
  removeMessage: jest.fn()
}

describe('MessageItem Unit Tests', () => {
  it('should render the MessageItem component without the Delete message button if the message belongs to another user', () => {
    const wrapper = mount(
      <Router>
        <MessageItem { ...messageItemProps } />
      </Router>
    )

    expect(wrapper.find('li').length).toEqual(1)
    expect(wrapper.find('img').prop('src')).toEqual(messageItemProps.profileImageUrl)
    expect(wrapper.find('img').prop('alt')).toEqual(messageItemProps.username)
    expect(wrapper.find('div.message-area').length).toEqual(1)
    expect(wrapper.find(Link).text()).toEqual(`@${messageItemProps.username}`)
    expect(wrapper.find(Link).prop('to')).toEqual('/')
    expect(wrapper.find(Moment).text()).toEqual('18 Nov 2019')
    expect(wrapper.find('p').text()).toEqual(messageItemProps.text)
    expect(wrapper.find('a.btn btn-danger').length).toEqual(0)
  })

  it('should render the MessageItem component with the Delete message button if the message belongs to the current user', () => {
    const wrapper = mount(
      <Router>
        <MessageItem { ...messageItemProps } isCorrectUser={true} />
      </Router>
    )

    expect(wrapper.find('li').length).toEqual(1)
    expect(wrapper.find('img').prop('src')).toEqual(messageItemProps.profileImageUrl)
    expect(wrapper.find('img').prop('alt')).toEqual(messageItemProps.username)
    expect(wrapper.find('div.message-area').length).toEqual(1)
    expect(wrapper.find(Link).text()).toEqual(`@${messageItemProps.username}`)
    expect(wrapper.find(Link).prop('to')).toEqual('/')
    expect(wrapper.find(Moment).text()).toEqual('18 Nov 2019')
    expect(wrapper.find('p').text()).toEqual(messageItemProps.text)
    expect(wrapper.find('a').at(1).exists()).toBe(true)
    
    const deleteButton = wrapper.find('a').at(1)
    deleteButton.simulate('click')
    expect(wrapper.instance().props.children.props.removeMessage).toHaveBeenCalled()
  })
})
