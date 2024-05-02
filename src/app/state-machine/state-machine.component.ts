import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StateComponent } from './state/state.component';
import { TransitionNewComponent } from './transition/transition.component';
import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { ApiService } from '../api.service';
import { IremboTransition, Workflow, irembo, stateConfig, transitionConfig } from './models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WorflowSample } from '../sample-workflowy';
import { ChangeDetectorRef } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';


declare var LeaderLine: any;

@Component({
  selector: 'app-state-machine',
  templateUrl: './state-machine.component.html',
  styleUrls: ['./state-machine.component.css']
})

export class StateMachineComponent implements OnInit, AfterViewInit {

  addForm !: FormGroup;
  uniqueStateCodes: string[] = [];
  selectedNonBreakingActions: string[] = [];

  drop($event: CdkDragDrop<Workflow, any, any>) {
    throw new Error('Method not implemented.');
  }

  @Output() crateEmitter: EventEmitter<string> = new EventEmitter<string>();

  newTransitionsObj: createNewTransitions = new createNewTransitions();
  newTransitionsList: createNewTransitions[] = [];
  creationForm !: FormGroup;
  iremboTask: irembo[] = [];
  description: any;
  state: string = '';
  data: string = '';
  workflows: stateConfig[] = [];
  updateIndex: any;
  isEditEnabled: boolean = false;

  onStartStateChange(event: any) {
    const value = (event.target as HTMLSelectElement)?.value || '';
    this.newTransitionsObj.startState = value;
  }

  onEventChange(event: any) {
    const value = (event.target as HTMLSelectElement)?.value || '';
    this.newTransitionsObj.event = value;
  }

  onStateChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.newTransitionsObj.state = target.value;
  }

  onStateCodeChange(event: any) {
    const value = (event.target as HTMLSelectElement)?.value || '';
    this.newTransitionsObj.event = value;
  }

  onBreakingActionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.newTransitionsObj.breakingAction = target.value;
  }

  onNonBreakingActionChange(event: any) {
    const value = event.target?.value;
    const action = this.newTransitionsObj?.endStateOne?.nonBreakingActionList.find((item: any) => item.actionType === value);

    if (value && action) {
      if (event.target.checked) {
        // Add action to the list
        this.newTransitionsObj?.endStateOne?.nonBreakingActionList.push(action);
      } else {
        // Remove action from the list
        const index = this.newTransitionsObj?.endStateOne?.nonBreakingActionList.indexOf(action);
        if (index !== -1) {
          this.newTransitionsObj?.endStateOne?.nonBreakingActionList.splice(index, 1);
        }
      }
    }
  }

  addData() {
    this.workflows.push({
      tasks: this.addForm.value.items,
      position: { x: 0, y: 0 },
      name: '',
      names: ''
    });
    this.addForm.reset();
  }

  updateWorkFlow() {
    this.workflows[this.updateIndex].tasks = this.addForm.value.item;
    this.addForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  // onUpdated(item: createNewTransitions) {
  //   this.newTransitionsObj = item;

  // }

  onUpdated(transition: createNewTransitions) {
    // Handle the updated transition here
  }


  // createNew(){
  //   this.data = 'Deodate',
  //   this.iremboTask.push({
  //     description: this.creationForm.value.data
  //   })
  // }

  // createForm() {
  //   this.creationForm = this.formBuilder.group({
  //     event: ['', Validators.required],
  //     startState: ['', Validators.required],
  //     endStateOne: this.formBuilder.group({
  //       stateName: ['', Validators.required],
  //       stateCode: ['', Validators.required],
  //       breakingAction: this.formBuilder.group({
  //         actionType: ['', Validators.required],
  //         args: null // Assuming args is always null
  //       }),
  //       nonBreakingActionList: [[]] // Initialize as an empty array
  //     })
  //   });
  // }

  // After form submission
  // createNew() {
  //   const isLocalPresent = localStorage.getItem("iremboWorkflow");
  //   if (isLocalPresent != null) {
  //     const oldArray = JSON.parse(isLocalPresent);
  //     this.newTransitionsObj.id = oldArray.length + 1;
  //     oldArray.push(this.newTransitionsObj);
  //     this.newTransitionsList = oldArray;
  //     localStorage.setItem("iremboWorkflow", JSON.stringify(oldArray));
  //   } else {
  //     const newArray = [this.newTransitionsObj];
  //     this.newTransitionsObj.id = 1;
  //     this.newTransitionsList = newArray;
  //     localStorage.setItem("iremboWorkflow", JSON.stringify(newArray));
  //   }
  // }
  // createNew() {
  //   // Prepare the new transition object
  //   const newTransition: createNewTransitions = {
  //     id: 0,
  //     startState: "NEW",
  //     event: "CREATE",
  //     state: "PAYMENT_PENDING",
  //     endStateOne: {
  //       stateName: "Payment Pending",
  //       stateCode: "PAYMENT_PENDING",
  //       nextEvent: null,
  //       breakingAction: {
  //         actionType: "BILL_ID_GENERATION",
  //         args: null
  //       },
  //       nonBreakingActionList: [
  //         {
  //           actionType: "NOTIFICATION",
  //           args: {
  //             frenchNotificationTemplate: {
  //               smsTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation  ${billId}  a été renvoyée avec succès! \n Vous pouvez suivre votre demande avec les détails suivants: \n Numéro de demande:: ${applicationNumber}",
  //               emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
  //               notificationTitle: "Demande renvoyée"
  //             },
  //             englishNotificationTemplate: {
  //               smsTemplate: "Dear ${APPLICANT_LAST_NAME},Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully resubmitted! \n You can track your application with the following details: \n Application number: ${applicationNumber}",
  //               emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
  //               notificationTitle: "Application resubmitted"
  //             },
  //             kinyarwandaNotificationTemplate: {
  //               smsTemplate: "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw’u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yongeye koherezwa! \n Kurikirana dosiye yawe ukoresheje aya makuru: \n Nomero ya dosiye: ${applicationNumber}",
  //               emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
  //               notificationTitle: "Dosiye yongeye koherezwa"
  //             }
  //           }
  //         }
  //       ]
  //     },
  //     endStateTwo: null,
  //     breakingAction: '',
  //     nonBreakingAction: ''
  //   };

  //   const newTransition1: createNewTransitions = {
  //     id: 0,
  //     startState: "PAYMENT_PENDING",
  //     event: "PAY",
  //     state: "PAYMENT_PENDING",
  //     endStateOne: {
  //       stateName: "Paid",
  //       stateCode: "PAID",
  //       nextEvent: "PUSH",
  //       breakingAction: null,
  //       nonBreakingActionList: [
  //         {
  //           actionType: "NOTIFICATION",
  //           args: {
  //             frenchNotificationTemplate: {
  //               smsTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation  ${billId}  a été renvoyée avec succès! \n Vous pouvez suivre votre demande avec les détails suivants: \n Numéro de demande:: ${applicationNumber}",
  //               emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
  //               notificationTitle: "Demande renvoyée"
  //             },
  //             englishNotificationTemplate: {
  //               smsTemplate: "Dear ${APPLICANT_LAST_NAME},Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully resubmitted! \n You can track your application with the following details: \n Application number: ${applicationNumber}",
  //               emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
  //               notificationTitle: "Application resubmitted"
  //             },
  //             kinyarwandaNotificationTemplate: {
  //               smsTemplate: "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw’u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yongeye koherezwa! \n Kurikirana dosiye yawe ukoresheje aya makuru: \n Nomero ya dosiye: ${applicationNumber}",
  //               emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
  //               notificationTitle: "Dosiye yongeye koherezwa"
  //             }
  //           }
  //         }
  //       ]
  //     },
  //     endStateTwo: null,
  //     breakingAction: '',
  //     nonBreakingAction: ''
  //   };

  //   const isLocalPresent = localStorage.getItem("iremboWorkflow");
  //   let newArray: createNewTransitions[] = [];

  //   if (isLocalPresent != null) {
  //     const oldArray = JSON.parse(isLocalPresent) as createNewTransitions[];
  //     newTransition.id = oldArray.length + 1;
  //     newTransition1.id = oldArray.length + 2;
  //     newArray = [...oldArray, newTransition, newTransition1];
  //     newTransition.id = newArray.length;
  //   } else {
  //     newTransition.id = 1;
  //     newTransition1.id = 2;
  //     newArray = [newTransition, newTransition1];
  //   }

  //   this.newTransitionsList = newArray;
  //   localStorage.setItem("iremboWorkflow", JSON.stringify(newArray));

  //   // Clear the form
  //   this.creationForm.reset();
  // }

  createNew() {
    // console.log(this.creationForm.value, "+==========================")

    const transitionTemplate : any = {
      id: 0,
      startState: this.creationForm.value.startState,
      event: this.creationForm.value.event,
      state: "PAYMENT_PENDING",
      endStateOne: {
        stateName: "Payment Pending",
        stateCode: this.creationForm.value.stateCode,
        nextEvent: null,
        breakingAction: {
          actionType: this.creationForm.value.breakingAction,
          args: null
        },
        nonBreakingActionList: [
          {
            actionType: this.creationForm.value.actionType,
            args: {}
          }
        ]
      },
      endStateTwo: null,
      breakingAction: '',
      nonBreakingAction: ''
    }
  
    const newTransition: createNewTransitions = {
      
      id: 0,
      startState: "NEW",
      event: "CREATE",
      state: "PAYMENT_PENDING",
      endStateOne: {
        stateName: "Payment Pending",
        stateCode: "PAYMENT_PENDING",
        nextEvent: null,
        breakingAction: {
          actionType: "BILL_ID_GENERATION",
          args: null
        },
        nonBreakingActionList: [
          {
            actionType: "NOTIFICATION",
            args: {
              frenchNotificationTemplate: {
                smsTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation  ${billId}  a été renvoyée avec succès! \n Vous pouvez suivre votre demande avec les détails suivants: \n Numéro de demande:: ${applicationNumber}",
                emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                notificationTitle: "Demande renvoyée"
              },
              englishNotificationTemplate: {
                smsTemplate: "Dear ${APPLICANT_LAST_NAME},Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully resubmitted! \n You can track your application with the following details: \n Application number: ${applicationNumber}",
                emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                notificationTitle: "Application resubmitted"
              },
              kinyarwandaNotificationTemplate: {
                smsTemplate: "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw’u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yongeye koherezwa! \n Kurikirana dosiye yawe ukoresheje aya makuru: \n Nomero ya dosiye: ${applicationNumber}",
                emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                notificationTitle: "Dosiye yongeye koherezwa"
              }
            }
          }
        ]
      },
      endStateTwo: null,
      breakingAction: '',
      nonBreakingAction: ''
    };

    const newTransition1: createNewTransitions = {
      id: 0,
      startState: "PAYMENT_PENDING",
      event: "PAY",
      state: "PAID",
      endStateOne: {
        stateName: "Paid",
        stateCode: "PAID",
        nextEvent: "PUSH",
        breakingAction: null,
        nonBreakingActionList: [
          {
            actionType: "NOTIFICATION",
            args: {
              frenchNotificationTemplate: {
                smsTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation  ${billId}  a été renvoyée avec succès! \n Vous pouvez suivre votre demande avec les détails suivants: \n Numéro de demande:: ${applicationNumber}",
                emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                notificationTitle: "Demande renvoyée"
              },
              englishNotificationTemplate: {
                smsTemplate: "Dear ${APPLICANT_LAST_NAME},Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully resubmitted! \n You can track your application with the following details: \n Application number: ${applicationNumber}",
                emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                notificationTitle: "Application resubmitted"
              },
              kinyarwandaNotificationTemplate: {
                smsTemplate: "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw’u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yongeye koherezwa! \n Kurikirana dosiye yawe ukoresheje aya makuru: \n Nomero ya dosiye: ${applicationNumber}",
                emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                notificationTitle: "Dosiye yongeye koherezwa"
              }
            }
          }
        ]
      },
      endStateTwo: null,
      breakingAction: '',
      nonBreakingAction: ''
    };

    const newTransition3: createNewTransitions = {
      id: 0,
      startState: "PENDING_APPROVAL",
      event: "FINAL_APPROVE",
      state: "Approved",
      endStateOne: {
        stateName: "Approved",
        stateCode: "CLOSED_WITH_APPROVAL",
        nextEvent: null,
        breakingAction: null,
        nonBreakingActionList: [
          {
            actionType: "NOTIFICATION",
            args: {
              frenchNotificationTemplate: {
                smsTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation  ${billId}  a été renvoyée avec succès! \n Vous pouvez suivre votre demande avec les détails suivants: \n Numéro de demande:: ${applicationNumber}",
                emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                notificationTitle: "Demande renvoyée"
              },
              englishNotificationTemplate: {
                smsTemplate: "Dear ${APPLICANT_LAST_NAME},Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully resubmitted! \n You can track your application with the following details: \n Application number: ${applicationNumber}",
                emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                notificationTitle: "Application resubmitted"
              },
              kinyarwandaNotificationTemplate: {
                smsTemplate: "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw’u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yongeye koherezwa! \n Kurikirana dosiye yawe ukoresheje aya makuru: \n Nomero ya dosiye: ${applicationNumber}",
                emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                notificationTitle: "Dosiye yongeye koherezwa"
              }
            }
          }
        ]
      },
      endStateTwo: null,
      breakingAction: '',
      nonBreakingAction: ''
    };

    const newTransition2: createNewTransitions = {
      id: 0,
      startState: "PAID",
      event: "PUSH",
      state: "PAID",
      endStateOne: {
        stateName: "Pending approval",
        stateCode: "PENDING_APPROVAL",
        nextEvent: null,
        breakingAction: {
          actionType: "INTEGRATION",
          args: null
        },
        nonBreakingActionList: null
      },
      endStateTwo: null,
      breakingAction: '',
      nonBreakingAction: ''
    };

    let newArray: createNewTransitions[] = [];
    const isLocalPresent = localStorage.getItem("iremboWorkflow");

    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent) as createNewTransitions[];
      const newId = oldArray.length + 1;
      transitionTemplate.id = newId;
      newArray = [...oldArray, transitionTemplate
        ];
    } else {
      transitionTemplate.id = 1;
      newArray = [
        transitionTemplate
        ];
    }

    this.newTransitionsList = newArray;
    localStorage.setItem("iremboWorkflow", JSON.stringify(newArray));

    // Clear the form
    this.creationForm.reset();
    // Reload the page
    window.location.reload();
  }

 
  onUpdate(item: any, i: number) {
    this.creationForm.controls['item'].setValue(item.event);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  @Input() config: transitionConfig | undefined = {
    description: '',
    names: '',
    name: '',
    event: '',
    startState: '',
    endStateOne: undefined,
    endStateTwo: undefined,
    position: { x: 0, y: 0 }
  };

  @Output() displayData: EventEmitter<transitionConfig> = new EventEmitter<transitionConfig>();
  selectedCreateEvent: any;
  startStateSelected: boolean = false;
  eventSelected: boolean = false;
  endStateSelected: boolean = false;
  breakingActionSelected: boolean = false;
  nonBreakingActionSelected: boolean = false;
  transition: any;
  showData: boolean = false;
  // creationForm: FormGroup = new FormGroup({});

  updateTransition(transition: any) {

  }

  getStateMachineComponentUniqueStartStates(): string[] {
    return StateMachineComponent.getUniqueStartStates();
  }


  getStateMachineComponentUniqueStateCodes(): string[] {
    return StateMachineComponent.getUniqueStateCodes();
  }
  static getUniqueStateCodes(): string[] {
    throw new Error('Method not implemented.');
  }

  public static getUniqueStartStates(): string[] {
    const uniqueStates = new Set<string>();
    WorflowSample.sample1.forEach((item) => uniqueStates.add(item.startState));
    WorflowSample.sample2.forEach((item) => uniqueStates.add(item.startState));
    return Array.from(uniqueStates);
  }

  getUniqueEvents(): string[] {
    const uniqueEvents = new Set<string>();
    WorflowSample.sample1.forEach((item) => uniqueEvents.add(item.event));
    WorflowSample.sample2.forEach((item) => uniqueEvents.add(item.event));
    return Array.from(uniqueEvents);
  }

  getUniqueStateCodes(): string[] {
    const uniqueStateCodes = new Set<string>();
    WorflowSample.sample1.forEach((item) => uniqueStateCodes.add(item.endStateOne.stateCode));
    WorflowSample.sample2.forEach((item) => uniqueStateCodes.add(item.endStateOne.stateCode));
    return Array.from(uniqueStateCodes);
  }

  getBreakingActions(): string[] {
    const uniqueBreakingActions = new Set<string>();
    WorflowSample.sample1.forEach((item) => {
      if (item.endStateOne?.breakingAction) {
        uniqueBreakingActions.add(item.endStateOne.breakingAction.actionType);
      }
    });
    WorflowSample.sample2.forEach((item) => {
      if (item.endStateOne?.breakingAction) {
        uniqueBreakingActions.add(item.endStateOne.breakingAction.actionType);
      }
    });
    return Array.from(uniqueBreakingActions);
  }

  getUniqueBreakingActions(): string[] {
    const uniqueBreakingActions = new Set<string>();
    WorflowSample.sample1.forEach((item) => {
      if (item.endStateOne.breakingAction !== null) {
        uniqueBreakingActions.add(item.endStateOne.breakingAction.actionType);
      }
    });
    WorflowSample.sample2.forEach((item) => {
      if (item.endStateOne.breakingAction !== null) {
        uniqueBreakingActions.add(item.endStateOne.breakingAction.actionType);
      }
    });
    return Array.from(uniqueBreakingActions);
  }

  getUniqueNonBreakingActions(): string[] {
    const uniqueActions = new Set<string>();

    WorflowSample.sample1.forEach((item) => {
      if (item.endStateOne && item.endStateOne.nonBreakingActionList) {
        item.endStateOne.nonBreakingActionList.forEach((action) => {
          if (action.actionType) {
            uniqueActions.add(action.actionType);
          }
        });
      }
    });

    localStorage.setItem("key", JSON.stringify(WorflowSample.sample2));
    WorflowSample.sample2.forEach((item) => {
      if (item.endStateOne && item.endStateOne.nonBreakingActionList) {
        item.endStateOne.nonBreakingActionList.forEach((action) => {
          if (action.actionType) {
            uniqueActions.add(action.actionType);
          }
        });
      }
    });

    return Array.from(uniqueActions);
  }

  selectedStartState: string = '';
  selectedEvent: string = '';
  selectedEndState: string = '';
  selectedBreakingAction: string = '';
  selectedNonBreakingAction: string = '';
  selectedTransitions: any[] = [];
  transitionToEdit: transitionConfig = { description: '', names: '', name: '', startState: '', event: '', endStateOne: undefined, breakingAction: undefined, endStateTwo: undefined, position: { x: 0, y: 0 } };

  onStartStateSelected(event: any): void {
    const value = event.target?.value;
    if (value) {
      this.selectedStartState = value;
      this.startStateSelected = event.target.value !== 'Choose...';
    }
  }

  onAddButtonClick(): void {
    const selectedTransition = {
      startState: this.selectedStartState,
      event: this.selectedEvent,
      endState: this.selectedEndState,
      breakingAction: this.selectedBreakingAction,
      nonBreakingAction: this.selectedNonBreakingAction
    };


    this.selectedTransitions.push(selectedTransition);
    this.clearSelectedValues();

    console.log('Selected Transitions:', this.selectedTransitions);
  }

  onEventSelected(event: any): void {
    console.log('onEventSelected')
    const value = event.target?.value;
    if (value) {
      this.selectedEvent = value;
      this.eventSelected = event.target.value !== 'Choose...';
    }
  }

  onBreakingAction(BreakingAction: any): void {
    const value = BreakingAction.target?.value;
    if (value) {
      this.selectedBreakingAction = value;
      this.breakingActionSelected = value !== 'Choose...';
    }
  }
  selectedOption: string = ''; // Variable to store the selected option from the dropdown

  onNonBreakingAction(selectedValue: string): void {

    this.selectedOption = selectedValue;
  }

  onendState(onendState: any): void {
    const value = onendState.target?.value;
    if (value) {
      this.selectedEndState = value;
      this.endStateSelected = value !== 'Choose...';
    }
  }

  private clearSelectedValues(): void {
    console.log('clearSelectedValues')
    this.selectedStartState = '';
    this.selectedEvent = '';
    this.selectedEndState = '';
    this.selectedBreakingAction = '';
    this.selectedNonBreakingAction = '';
  }

  updateSuccessMessage: string = '';

  onUpdateClick(transition: any, index: number) {
    this.cdr.detectChanges();
    this.onCloseModel();
    this.updateSuccessMessage = 'Update successful!';
  }

  getUniqueEndStates(): { stateName: string, stateCode: string, nextEvent: string | null }[] {
    const uniqueStates: { stateName: string, stateCode: string, nextEvent: string | null }[] = [];

    // Loop through sample1 and sample2 arrays to gather unique end states
    [...WorflowSample.sample1].forEach(item => {
      if (item.endStateOne) {
        uniqueStates.push({
          stateName: item.endStateOne.stateName,
          stateCode: item.endStateOne.stateCode,
          nextEvent: item.endStateOne.nextEvent
        });
      }
    });

    return uniqueStates;
  }
  tableData: string[] = [];
  addToTable(): void {
    // Add the selected option to the table input only if an option is selected
    if (this.selectedOption) {
      // Push the selected option to the selectedTransitions array
      this.selectedTransitions.push({ ActionName: this.selectedOption });
      // Clear the selected option
      this.selectedOption = '';
    }
  }

  showForm = true;

  transitionsData = WorflowSample.sample1;

  stateMachineForm = this.formBuilder.group({
    transitions: JSON.stringify(WorflowSample.sample1),
  });

  workflowData: any;
  WorflowSample: any;
  JSON: any;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.workflowData = WorflowSample.sample2;
  }
  formData: any = {};

  handleClick() {
    this.showData = true;
  }

  newTransForm !: FormGroup;

  logTransitions() {
    console.log(this.workflow, "========================== TRANS");
    // this.workflow.states.forEach(item => {
    //   console.log(item, "================ TRANS");
    // });
  }

  ngOnInit(): void {

    this.addForm = this.formBuilder.group({
      items: ['', Validators.required]
    });

    this.newTransForm = this.fb.group({
      item: ['', Validators.required],

    })

    this.creationForm = this.fb.group({
      item: ['', Validators.required]
    })
    const localData = localStorage.getItem("iremboWorkflow");
    if (localData != null) {
      this.newTransitionsList = JSON.parse(localData)
    }
    const event = localStorage.getItem("event");
    if (event != null) {
      this.newTransitionsObj.event = event;
    }


    this.initialiseCreationFormGroup();

  }

  sidebarActive = false;

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  @ViewChildren(StateComponent)
  stateComponents!: QueryList<StateComponent>;

  @ViewChildren(TransitionNewComponent)
  transitionComponents!: QueryList<TransitionNewComponent>;

  @Input()
  iremboWorkflow: IremboTransition[] = [];

  // keep the list of link that will be draw in the diagram
  _drawedLink: any[] = [];

  // local representation of the workflow
  workflow: Workflow = {
    states: new Map(),
    transitions: []
  };

  ngAfterViewInit(): void {

    // build workflow from iremboWorkflow
    this.buildWorkflow();

    // draw the Diagram
    setTimeout(() => this.drawWorkflowDiagram());
  }

  onDragMove(move: CdkDragMove<string>) {
    this._drawedLink.forEach(element => {
      element.position();
    });

    console.log("onDragMove workflow", this.workflow);
  }

  onSubmit() {
    console.log('transitions', this.stateMachineForm.value);

  }

  createTra() {
    const isLocalPresent = localStorage.getItem("server");
    if (isLocalPresent != null) {
      // Add the new transition to the existing transitions array
      this.workflow.transitions.push(this.transition);
      localStorage.setItem("server", JSON.stringify(this.workflow));
    } else {
      // If local storage is empty, create a new array with the new transition
      const newWorkflow = {
        states: this.workflow.states,
        transitions: [this.transition] // Add the new transition to the new workflow
      };
      localStorage.setItem("server", JSON.stringify(newWorkflow));
    }
  }

  buildWorkflow() {

    const patX = 120;
    const patY = 120;

    let currentX = 270;
    let currentY = -600;

    let i = 1;

    this.iremboWorkflow.forEach(element => {

      i = i + 1;

      // get or set the position of the transition
      if (element.position) {
        currentX = element.position.x;
        currentY = element.position.y;
      } else {
        element.position = {
          x: currentX,
          y: currentY
        }
      }

      // Add Start State :  If the start state not yet added, please add it 
      if (!this.workflow.states.has(element.startState.toString())) {
        let state: stateConfig = {
          name: element.startState.toString(),
          tasks: element.startState.toString(),
          names: element.startState.toString(),
          position: {
            x: element.position.x,
            y: element.position.y - patY
          }
        }

        this.workflow.states.set(element.startState.toString(), state);
      }

      // Add End State One : If the EndStateOne not yet added, please add it 
      if (element.endStateOne && !this.workflow.states.has(element.endStateOne?.stateCode.toString())) {
        let stateposition = element.endStateOne.position;
        if (!stateposition) {
          stateposition = {
            x: element.position.x + 2 * patX,
            y: element.position.y - patY
          }
        }

        let state: stateConfig = {
          name: element.endStateOne.stateCode.toString(),
          tasks: element.endStateOne.stateCode.toString(),
          names: element.endStateOne.stateCode.toString(),
          position: stateposition
        }

        this.workflow.states.set(element.endStateOne.stateCode.toString(), state);
      }

      // Add End State Two : If the EndStateTwo not yet added, please add it 
      if (element.endStateTwo && !this.workflow.states.has(element.endStateTwo?.stateCode.toString())) {

        let stateposition = element.endStateTwo.position;
        if (!stateposition) {
          stateposition = {
            x: element.position.x + 2 * patX,
            y: element.position.y + patY
          }
        }

        let state: stateConfig = {
          name: element.endStateTwo.stateCode.toString(),
          tasks: element.endStateTwo.stateCode.toString(),
          names: element.endStateTwo.stateCode.toString(),
          position: stateposition

        }

        this.workflow.states.set(element.endStateTwo.stateCode.toString(), state);
      }

      // Add The transition
      if (element.endStateOne) {
        let transition: transitionConfig = {
          name: element.event.toString(),
          names: element.event.toString(),
          event: element.event.toString(),
          description: element.event.toString(),
          startState: element.startState.toString(),
          endStateOne: element.endStateOne,
          endStateTwo: element.endStateTwo,
          position: element.position
        }
        this.workflow.transitions.push(transition);
        // createNewTransitions(){

        // }
      }

      currentX = element.position.x + 2 * patX;
      currentY = element.position.y;
    });
  }

  getStateComponentbyName(name: string): StateComponent | undefined {
    let compo = this.stateComponents.find(element => element.config.name === name);
    return compo;
  }

  drawWorkflowDiagram() {

    console.log("drawWorkflowDiagram workflow, before", this.workflow);
    console.log("Transitions", this.transitionComponents);
    console.log("states", this.stateComponents);

    let defaultPath = 'fluid'; // straight , arc, fluid, magnet, grid
    let defaultColor = 'black';
    let defaultStartPlugSize = 3;
    let defaultStartPlug = 'disc'; // square, arrow1, arrow2, arrow3, hand, crosshair, behind

    this.transitionComponents.forEach(element => {

      // Draw link from start state
      this._drawedLink.push(new LeaderLine(
        this.getStateComponentbyName(element.config.startState)?.el.nativeElement,
        element.el.nativeElement,
        {
          path: defaultPath,
          startSocket: 'auto',
          endSocket: 'auto',
          startPlug: defaultStartPlug,
          startPlugSize: defaultStartPlugSize,
          endPlug: 'arrow1',
          color: defaultColor,
          dash: { animation: true },
          size: 2
        }
      ));

      // Draw link to EndState One
      if (element.config.endStateOne) {
        this._drawedLink.push(new LeaderLine(
          element.endStateOne.nativeElement,
          this.getStateComponentbyName(element.config.endStateOne.stateCode)?.el.nativeElement,
          {
            path: defaultPath,
            startSocket: 'auto',
            endSocket: 'auto',
            startPlug: defaultStartPlug,
            startPlugSize: defaultStartPlugSize,
            endPlug: 'arrow1',
            color: defaultColor,
            dash: { animation: true },
            size: 2
          }
        ));
      }

      // Draw link to EndState Two
      if (element.config.endStateTwo) {
        this._drawedLink.push(new LeaderLine(
          element.endStateTwo.nativeElement,
          this.getStateComponentbyName(element.config.endStateTwo.stateCode)?.el.nativeElement,
          {
            path: defaultPath,
            startSocket: 'auto',
            endSocket: 'auto',
            startPlug: defaultStartPlug,
            startPlugSize: defaultStartPlugSize,
            endPlug: 'arrow1',
            color: defaultColor,
            dash: { animation: true },
            size: 2
          }
        ));
      }

    });

    console.log("drawedLink", this._drawedLink);

  }

  handleTransitionSelect(selected: transitionConfig) {
    this.transitionToEdit = selected
  }

  initialiseCreationFormGroup() {
    this.creationForm.addControl('startState', new FormControl('', Validators.required));
    this.creationForm.addControl('event', new FormControl('', Validators.required))
    this.creationForm.addControl('stateCode', new FormControl('', Validators.required))
    this.creationForm.addControl('breakingAction', new FormControl('', Validators.required))
    this.creationForm.addControl('actionType', new FormControl('', Validators.required))
  }

  onCloseModel() {
    const formElement = document.getElementById('transitionModel');
    if (formElement) {
      formElement.style.display = 'none'; // or formElement.style.visibility = 'hidden';
    }
  }

  createNewTransition() {
    const isLocalPresent = localStorage.getItem("iremboWorkflow");
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      // oldArray.push(this.newTransitionsObj);
      localStorage.setItem('iremboWorkflow', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      // newArr.push(this.newTransitionsObj);
      // localStorage.setItem('iremboWorkflow', JSON.stringify(newArr));
    }

  }
}
export class createNewTransitions {
  id: number;
  startState: string;
  event: string;
  state: string;
  breakingAction: string;
  nonBreakingAction: string;
  endStateOne: any;
  endStateTwo: any;

  constructor() { this.id = 0; this.startState = ''; this.endStateTwo = ''; this.event = ''; this.state = ''; this.breakingAction = ''; this.nonBreakingAction = '' }
}

 // changeWorkflow() {
  //   this.workflow = {
  //     states : [
  //       {
  //         name : "START",
  //         position : {
  //           x : 100,
  //           y : 100
  //         }
  //       },
  //       {
  //         name : "TODO",
  //         position : {
  //           x : 100,
  //           y : 200
  //         }
  //       },
  //       {
  //         name : "IN_PROGRESS",
  //         position : {
  //           x : 100,
  //           y : 300
  //         }
  //       },
  //       {
  //         name : "DONE",
  //         position : {
  //           x : 100,
  //           y : 400
  //         }
  //       }
  //     ],
  //     transitions : [
  //       {
  //         name : "CREATE",
  //         startState : "START",
  //         endState : "TODO",
  //         position : {
  //           x : 500,
  //           y : 100
  //         }
  //       },
  //       {
  //         name : "In Development",
  //         startState : "TODO",
  //         endState : "IN_PROGRESS",
  //         position : {
  //           x : 500,
  //           y : 200
  //         }
  //       },
  //       {
  //         name : "Finish",
  //         startState : "IN_PROGRESS",
  //         endState : "DONE",
  //         position : {
  //           x : 500,
  //           y : 400
  //         }
  //       }
  //       // ,
  //       // {
  //       //   name : "TOUssaint",
  //       //   startState : "START",
  //       //   endState : "DONE",
  //       //   position : {
  //       //     x : 500,
  //       //     y : 400
  //       //   }
  //       // }
  //     ]
  //   }
  // }

  // reorderDiagram() {
  //   let initX = 100;
  //   let initY = 400;

  //   let pasX = 130;
  //   let pasY = 130;



  //   let currentX = 50;
  //   let currentY = 50;

  //   let currentNode = new Map();

  //   this.workflow.transitions.forEach(element => {

  //     if(!currentNode.has(element.startState)){
  //       let node = this.workflow.states.find(elt => elt.name === element.startState);
  //       if(node) {
  //         node!.position.x = currentX;
  //         node!.position.y = currentY;
  //         currentX = currentX;
  //         currentY = currentY + pasY;
  //         currentNode.set(element.startState,node)
  //       }
  //     } else {
  //       let node = this.workflow.states.find(elt => elt.name === element.startState);
  //       if(node) {
  //         currentX = node?.position.x;
  //         currentY = node?.position.y + pasY;
  //       }
  //     }

  //     element.position.x = currentX;
  //     element.position.y = currentY;

  //     if(!currentNode.has(element.endState)){
  //       let node = this.workflow.states.find(elt => elt.name === element.endState);
  //       if(node) {
  //         node!.position.x = currentX + 2*pasX;
  //         node!.position.y = currentY;
  //         currentX = currentX + pasX;
  //         currentNode.set(element.endState,node)
  //       }
  //     }
  //   });

  //   console.log("reorderDiagram, after", this.workflow);
  // }
