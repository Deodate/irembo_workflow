export interface stateConfig {
    name: string,
    names: string,
    tasks: string;
    position: point
}

export interface transitionConfig {
    id: number;
    event: any;
    description: string;
    name: string,
    names: string,
    startState: string,
    emailTemplate: string,
    smsTemplate: string,
    notificationTitle: string,
    endStateOne: IremboEndState | undefined,
    endStateTwo: IremboEndState | undefined,
    breakingAction?: IremboAction | undefined,
    nonBreakingActionList?: IremboAction[] | undefined,
    position: point
}

export interface irembo {
    description: string,
}

export interface createNewTransitions {
    id: number;
    event: string;
    startState: string;
    state: string;
    endStateOne: {
        stateName: string;
        stateCode: string;
        breakingAction: {
            actionType: string;
            args: any;
        } | null;
        nonBreakingActionList: {
            actionType: string;
            args: {
                frenchNotificationTemplate: {
                    smsTemplate: string;
                    emailTemplate: string;
                    notificationTitle: string;
                };
                englishNotificationTemplate: {
                    smsTemplate: string;
                    emailTemplate: string;
                    notificationTitle: string;
                };
                kinyarwandaNotificationTemplate: {
                    smsTemplate: string;
                    emailTemplate: string;
                    notificationTitle: string;
                };
            };
        }[];
    };
    endStateTwo: null | any;
    breakingAction: string;
    nonBreakingAction: string;
}


  
export interface point {
    x: number,
    y: number,
}

export enum SlotType {
    Input, Output
}

export interface Workflow {
    states: Map<string, stateConfig>,
    transitions: transitionConfig[],
}

interface NotificationTemplate {
    smsTemplate: string;
    emailTemplate: string;
    notificationTitle: string;
  }
  
  export interface Action {
    actionType: string;
    args: {
      frenchNotificationTemplate: NotificationTemplate;
      englishNotificationTemplate: NotificationTemplate;
      kinyarwandaNotificationTemplate: NotificationTemplate;
    };
  }
  
  export interface Developer {
    state: string;
    id: number;
    startState: string;
    event: string;
    endStateOne: {
      stateName: string;
      stateCode: string;
      breakingAction?: {
        actionType: string;
        args: any;
      };
      nonBreakingActionList: Action[];
    };
  }


export interface IremboTransition {
    event: string,
    startState: string,
    endStateOne?: IremboEndState | undefined,
    endStateTwo?: IremboEndState | undefined,
    position?: point
}


export interface IremboEndState {
    nextEvent: string | undefined,
    stateCode: string,
    stateName: string,
    breakingAction?: IremboAction | undefined,
    nonBreakingActionList?: IremboAction[] | undefined,
    position?: point | undefined
    emailTemplate?: string; 
    smsTemplate?: string;
    notificationTitle?: string
}

export interface IremboAction {
    args: any
    actionType: string
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

interface NotificationTemplate {
    smsTemplate: string;
    emailTemplate: string;
    notificationTitle: string;
  }

  interface NonBreakingAction {
    actionType: string;
    args: {
      kinyarwandaNotificationTemplate: NotificationTemplate;
      englishNotificationTemplate: NotificationTemplate;
      frenchNotificationTemplate: NotificationTemplate;
    };
  }

  interface BreakingAction {
    actionType: string;
    args: any | null;
  }

  interface EndState {
    stateName: string;
    stateCode: string;
    breakingAction: BreakingAction;
    nonBreakingActionList: NonBreakingAction[];
  }



  interface TransitionConfig {
    id: number;
    startState: string;
    event: string;
    state: string;
    endStateOne: EndState;
    endStateTwo: EndState | null;
    description: string;
    name: string;
    names: string[];
    emailTemplate: string;
    breakingAction: string;
    nonBreakingAction: string;
    notificationTitle: string | undefined;
  }

  interface CreateNewTransitions extends Omit<TransitionConfig, 'description' | 'name' | 'names' | 'emailTemplate'> {}

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


