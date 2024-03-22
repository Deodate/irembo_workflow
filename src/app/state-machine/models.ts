export interface stateConfig {
    name : string,
    position : point
}

export interface transitionConfig {
    name : string,
    startState : string,
    endState : string,
    position : point
}

export interface point {
    x : number,
    y : number,
}

export enum SlotType {
    Input, Output
}