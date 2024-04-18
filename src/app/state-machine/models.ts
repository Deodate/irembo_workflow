export interface stateConfig {
    name : string,
    position : point
}

export interface transitionConfig {
    name : string,
    startState : string,
    endStateOne : IremboEndState | undefined,
    endStateTwo : IremboEndState | undefined,
    breakingAction? : IremboAction | undefined,
    nonBreakingActionList? : IremboAction[] | undefined,
    position : point
}

export interface createNewTransitions {
    startState: string;
    event: string;
    state: string;
    breakingAction: string;
    nonBreakingActionList: string[];
}

export interface point {
    x : number,
    y : number,
}

export enum SlotType {
    Input, Output
}

export interface Workflow {
    states : Map<string,stateConfig>,
    transitions : transitionConfig [],
}


export interface IremboTransition {
    event : string,
    startState : string,
    endStateOne? : IremboEndState | undefined,
    endStateTwo? : IremboEndState | undefined,
    position? : point
}


export interface IremboEndState {
    nextEvent : string | undefined,
    stateCode: string,
    stateName: string,
    breakingAction? : IremboAction | undefined,
    nonBreakingActionList? : IremboAction[] | undefined,
    position? : point | undefined
}

export interface IremboAction {
    args : any
    actionType : string
}

export enum IremboEvent {
    CREATE, PAY, PUSH
}

export enum IremboState {
    NEW, PAYMENT_PENDING, PAID, SUBMITTED
}

export enum IremboActionType {
    NOTIFICATION, BILL_ID_GENERATION
}

// export interface IremboTransition {
//     event : IremboEvent,
//     startState : IremboState,
//     endStateOne? : IremboEndState | undefined,
//     endStateTwo? : IremboEndState | undefined,
//     position? : point 
// }


// export interface IremboEndState {
//     nextEvent : IremboEvent | undefined,
//     stateCode: IremboState,
//     stateName: string,
//     breakingAction? : IremboAction | undefined,
//     nonBreakingActionList? : IremboAction[] | undefined,
//     position? : point  
// }

// export interface IremboAction {
//     args : any
//     actionType : IremboActionType
// }

// export enum IremboEvent {
//     CREATE, PAY, PUSH
// }

// export enum IremboState {
//     NEW, PAYMENT_PENDING, PAID, SUBMITTED
// }

// export enum IremboActionType {
//     NOTIFICATION, BILL_ID_GENERATION, INTEGRATION
// }


