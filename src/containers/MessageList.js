import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchMessages, removeMessage, remove } from '../store/actions/messages'
import MessageItem from '../components/MessageItem'

export class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages()
  }
  
  render() {
    const { messages, removeMessage, currentUser } = this.props
    let messageList = messages.map(m => {
      return (
        <MessageItem
          key={m._id}
          date={m.createdAt}
          text={m.text}
          username={m.user.username}
          profileImageUrl={m.user.profileImageUrl}
          removeMessage={removeMessage.bind(this, m.user._id, m._id)}
          isCorrectUser={currentUser === m.user._id}
        />
      )
    })

    return (
      <div className='row col-sm-8'>
        <div className='offset-1 col-sm-10'>
          <ul className='list-group' id='messages'>
            {messageList}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    currentUser: state.currentUser.user.id
  }
}

export default connect(mapStateToProps, { fetchMessages, removeMessage })(MessageList)
