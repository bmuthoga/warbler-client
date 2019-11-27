import errorReducer from '../../errors'
import { ADD_ERROR, REMOVE_ERROR } from '../../../actionTypes'

describe('Error Reducer Snapshot Tests', () => {
  it('should return the initial state', () => {
    expect(errorReducer(undefined, {})).toMatchSnapshot()
  })

  it('should handle ADD_ERROR', () => {
    const error = 'Sample error message'
    expect(errorReducer(undefined, { type: ADD_ERROR, error })).toMatchSnapshot()
  })

  it('should handle REMOVE_ERROR', () => {
    expect(errorReducer(undefined, { type: REMOVE_ERROR })).toMatchSnapshot()
  })
})
