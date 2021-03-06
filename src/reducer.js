import {Map, List} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
}

function vote(state, entry) {
    const currentPair = state.getIn(['vote', 'pair']);
    const currentRound = state.getIn(['vote', 'round']);
    if (currentPair && currentPair.includes(entry)) {
        return state.set('myVote', Map({
            round: currentRound,
            entry
        }));
    } else {
        return state;
    }
}

function resetVote(state) {
    const votedFormRound = state.getIn(['myVote', 'round']);
    const currentRound = state.getIn(['vote', 'round']);
    if (votedFormRound !== currentRound) {
        return state.remove('myVote');
    } else {
        return state;
    }
}

export default function(state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return resetVote(setState(state, action.state));
        case 'VOTE':
            return vote(state, action.entry);
    }
    return state;
}