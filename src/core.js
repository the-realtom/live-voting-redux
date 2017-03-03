import {List, Map} from 'immutable';

/* The implementation of setEntries simply sets an entries key
 * in the state Map, then sets the value as the given List of entries.
* */
export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

function getWinners(vote) {
    if (!vote) return [];
    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    if      (aVotes > bVotes) return [a];
    else if (aVotes < bVotes) return [b];
    else                      return [a, b];
}



export function next(state) {
    const entries = state.get('entries')
        .concat(getWinners(state.get('vote')));
    if (entries.size === 1) {
        return state.remove('vote')
                    .remove('entries')
                    .set('winner', entries.first());
    } else {
        // This will merge an update into the old state, where the first
        // two entries are put into one List in 'pair' and the rest in the new
        // version of entries
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        });
    }
}

/* updateIn makes reaches into the data structure path and applies the function.
 * If there are keys missing, new Maps are put in there place.
 * If the value at the end is missing, initialize it with 0.
* */
export function vote(voteState, entry) {
    return voteState.updateIn(
        ['tally', entry],
        0,
        tally => tally + 1
    );
}

export const INITIAL_STATE = Map();
