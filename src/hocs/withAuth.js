import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component {
    constructor(props) {
      super(props)
      if (!props.isAuthenticated) {
        props.history.push('/signin')
      } 
    }

    UNSAFE_componentWillUpdate() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/signin')
      }
    }

    render() {
      return <ComponentToBeRendered { ...this.props } />
    }
  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.currentUser.isAuthenticated
    }
  }

  return connect(mapStateToProps)(Authenticate)
}
