class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {

        this.initial = config.initial;
        this.states = config.states;
        this.currentState = config.initial;
        this.prevState = false;
        this.nextState = false;
        this._history = [];


    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        if (Object.keys(this.states).indexOf(state) != -1) {
            this._history.push(this._currentState);
            this.prevState = this.currentState;
            this.currentState = state;
            return this.currentState;
        } else {
            throw new Exeption(
                'is not existing state of Finite Student Machine'
            );
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (
            Object.keys(this.states[this.currentState].transitions).indexOf(event) !=
            -1
        ) {
            this.prevState = this.currentState;
            this.currentState = this.states[this.currentState].transitions[event];
        } else {
            throw new Error(
                'is not existing transition of Finite Student Machine'
            );
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event == undefined) {
            return Object.keys(this.states);
        } else {
            return Object.keys(this.states).filter(val => this.states[val].transitions[event] != undefined);
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.prevState === false || this.currentState == this.initial) {
            return false;
        } else {
            this.nextState = this.currentState;
            this.currentState = this.prevState;
            this.prevState = false;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState === false) {
            return false;
        } else {
            this.prevState = this.currentState;
            this.currentState = this.nextState;
            this.nextState = false;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.nextState = false;
        this.prevState = false;
    }
}

module.exports = FSM;



/** @Created by Uladzimir Halushka **/