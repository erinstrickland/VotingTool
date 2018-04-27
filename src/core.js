import {List, Map} from 'immutable'

export const setEntries = (state, entries) => state.set('entries', List(entries))

export const next = (state) => {
  const entries = state.get('entries').concat(getWinners(state.get('vote')))
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  })
}

export const vote = (state, entry) => {
  return state.updateIn(
    ['vote', 'tally', entry],
    (tally = 0) => tally + 1
  )
}

const getWinners = (vote) => {
  if (!vote) return []
  const [a, b] = vote.get('pair')
  const aVotes = vote.getIn(['tally', a], 0)
  const bVotes = vote.getIn(['tally', b], 0)
  if (aVotes > bVotes) return [a]
  else if (aVotes < bVotes) return [b]
  else return [a, b]
}