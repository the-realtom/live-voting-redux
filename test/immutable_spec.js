import {expect} from 'chai'
import {List} from 'immutable';


describe('immutability', () => {

    describe('a number', () => {

        function increment(current_state) {
            return current_state + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let next_state = increment(state);

            expect(state).to.equal(42);
            expect(next_state).to.equal(43);
        });
    });

    describe('A list', () => {

        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }

        it('is immutable', () => {
            let state = List.of('Trainspotting', '28 Days Later');
            let nextState = addMovie(state, 'Sunshine');

            expect(state).to.equal(List.of(
                'Trainspotting',
                '28 Days Later'
            ));
            expect(nextState).to.equal(List.of(
                'Trainspotting',
                '28 Days Later',
                'Sunshine'
            ))
        });
    });
});