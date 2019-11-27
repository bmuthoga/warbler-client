import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import MessageTimeline from '../../MessageTimeline'

const props = {
  profileImageUrl: 'https://lorempixel.com/200/200/',
  username: 'testemail'
}

describe('MessageTimeline Snapshot Tests', () => {
  it('should render the MessageTimeline component', () => {
    const wrapper = shallow(
      <MessageTimeline { ...props } />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })  
})
