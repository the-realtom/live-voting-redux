import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

    /* The application allows loading in a collection of entries to be voted on.
     * We should have a function that takes a previous state and produces a state
     * where the entries are included. The test is to check setEntries does that.
    * */
    describe('setEntries', () => {

        it('adds the entries to the state', () => {
            const state = Map();
            const entries = ['Trainspotting', '28 Days Later'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }));
        });
        
    });

    describe('next', () => {

        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);
            console.log(nextState)
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')
            }));
        });
        it('puts the winner of the current vote back to the entries', () => {
            const state = Map({
                vote: Map({
                   pair: List.of('Trainspotting', '28 Days Later'),
                   tally: Map({
                       'Trainspotting': 4,
                       '28 Days Later': 2
                   })
               }),
               entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions'),
                }),
                entries: List.of('127 Hours', 'Trainspotting')
            }));
        });
        it('puts both from tied entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
            }));
        });
        it('marks winner when just one entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'Trainspotting'
            }));
        });

    });

    describe('vote', () => {

        it('creates a tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later')
            });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 1
                })
            }));
        });
        it('adds to an existing tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 2
                })
            });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 4,
                    '28 Days Later': 2
                })
            }));
        });
    });

});

