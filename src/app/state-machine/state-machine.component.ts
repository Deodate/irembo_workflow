import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StateComponent } from './state/state.component';
import { TransitionNewComponent } from './transition/transition.component';
import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { ApiService } from '../api.service';
import { IremboTransition, Workflow, irembo, stateConfig, transitionConfig, Developer, Action } from './models';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { WorflowSample } from '../sample-workflowy';
import { MyTextareaComponent } from '../components/my-textarea/my-textarea.component';
import { ChangeDetectorRef } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

declare var LeaderLine: any;

@Component({
  selector: 'app-state-machine',
  templateUrl: './state-machine.component.html',
  styleUrls: ['./state-machine.component.css']
})

export class StateMachineComponent implements OnInit, AfterViewInit {

  @ViewChild(MyTextareaComponent) myTextareaComponent!: MyTextareaComponent;
  devForm!: FormGroup;

  i: number = 0;
  updateForm!: FormGroup;
  addForm !: FormGroup;
  uniqueStateCodes: string[] = [];
  selectedNonBreakingActions: string[] = [];
  nonBreakingActionList: any;
  panelOpenState = false;
  @Input() tabsArray: string[] = [];
  @Output() onTabChange = new EventEmitter<number>();
  activatedTab: number = 0;
  selectedActionType: string = '';
  wordCount!: number;
  characterCount = 0;
  maxCharacters = 500;
  changeDetectorRef: any;
  dev: any;
  storedData: Developer[] = [];
  isEditing: boolean = false; 
  editIndex: number | null = null; 
  filteredData: any[] = [];
  searchText: string = '';
  isFormVisible: boolean = false


  search() {
    this.filteredData = this.storedData.filter(dev =>
      dev.startState.toLowerCase().includes(this.searchText.toLowerCase())
    );
    console.log('Filtered Data:', this.filteredData); // Log the filtered data
  }




  drop($event: CdkDragDrop<Workflow, any, any>) {
    throw new Error('Method not implemented.');
  }

  loadInitialData() {
    const data = JSON.parse(localStorage.getItem('iremboWorkflow') || '[]');
    this.storedData = data;
    this.filteredData = this.storedData;
  }

  showSecondNonBreakingAction: boolean = false;
  showThirdNonBreakingAction: boolean = false;
  showOneNonBreakingAction: boolean = false;

  toggleActions() {
    if (!this.showOneNonBreakingAction) {
      this.showOneNonBreakingAction = true;
    } else if (!this.showSecondNonBreakingAction) {
      this.showSecondNonBreakingAction = true;
    } else if (!this.showThirdNonBreakingAction) {
      this.showThirdNonBreakingAction = true;
    }
  }


  hideNonBreakingAction(action: string) {
    if (action === 'first') {
      this.showOneNonBreakingAction = false;
    } else if (action === 'second') {
      this.showSecondNonBreakingAction = false;
    } else if (action === 'third') {
      this.showThirdNonBreakingAction = false;
    }
  }

  tabs: string[] = ['RW', 'ENG', 'FR'];

  get nonBreakingActions(): FormArray {
    return this.creationForm.get('nonBreakingActions') as FormArray;
  }

  addNonBreakingActions(): void {
    const nonBreakingActionGroup = this.fb.group({
      notificationTitle: [''],
      smsTemplate: [''],
      emailTemplate: ['']
    });
    this.nonBreakingActions.push(nonBreakingActionGroup);
  }


  onSelectChange(value: string): void {
    // Perform any additional logic when the selection changes if necessary
    const nonBreakingActionGroup = this.fb.group({
      title: [''],
      smsTemplate: [''],
      emailTemplate: ['']
    });
    this.nonBreakingActions.push(nonBreakingActionGroup);
  }

  openPanel(panel: MatExpansionPanel): void {
    if (panel) {
      panel.open();
    }
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

  getnonBreakingActionFields(): FormGroup {
    return new FormGroup({
      actionType: new FormControl(''),
      nonBreakingAction: new FormGroup({
        nonBreakingActionArray: new FormArray<FormGroup>([this.createNonBreakingActionFormGroup()])
      })
    });
  }

  createNonBreakingActionFormGroup(): FormGroup {
    return new FormGroup({
      actionType: new FormControl('')
    });
  }

  nonBreakingActionFormGroup(devIndex: number): FormGroup {
    return this.nonBreakingActionArray().at(devIndex).get('nonbreakingAction') as FormGroup;
  }

  nonBreakingActionArray(): FormArray<FormGroup> {
    return this.creationForm.get('onbreakingActionList') as FormArray<FormGroup>;
  }

  cities: any[] = [
    { id: 1, name: 'Toyota' },
    { id: 1, name: 'Tax (Disabled)', disabled: true },
  ];

  setTab(index: number) {
    this.activatedTab = index;
    this.onTabChange.emit(this.activatedTab);
  }


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
    const value = event.target as HTMLSelectElement;
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

  addNonBreakingAction() {
    const nonBreakingAction = this.fb.group({
      actionType: [this.creationForm.value.actionType, Validators.required],
      args: this.fb.group({
        notificationTitle: [''],
        smsTemplate: [''],
        emailTemplate: ['']
      })
    });
    this.nonBreakingActionList.push(nonBreakingAction);
    this.creationForm.get('actionType')?.reset();
  }

  removeNonBreakingAction(index: number) {
    this.nonBreakingActionList.removeAt(index);
  }

  onUpdated(transition: createNewTransitions) {
    // Handle the updated transition here
  }



  createNew() {
    // console.log(this.creationForm.value, "+==========================")

    const getValue = (group: string, control: string) => {
      return this.creationForm.get(group)?.get(control)?.value ?? '';
    };

    const notificationTemplates = {
      frenchNotificationTemplate: {
        smsTemplate: "Cher ${APPLICANT_LAST_NAME}, Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation ${billId} a été soumise avec succès! Frais à payer: 10,000 FRW, Payez avant: ${paymentExpiryDate} For support, call 9099",
        emailTemplate: "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation ${billId} a été soumise avec succès! Frais à payer: 10,000 FRW, Payez avant: ${paymentExpiryDate} For support, call 9099",
        notificationTitle: "Demande soumise"
      },
      englishNotificationTemplate: {
        smsTemplate: "Dear ${APPLICANT_LAST_NAME}, Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully submitted! Fees to be paid: 10,000 RWF, Pay Before: ${paymentExpiryDate}. For support, call 9099",
        emailTemplate: "Dear ${APPLICANT_LAST_NAME}, Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully submitted! Fees to be paid: 10,000 RWF, Pay Before: ${paymentExpiryDate}. For support, call 9099",
        notificationTitle: "Application submitted"
      },
      kinyarwandaNotificationTemplate: {
        smsTemplate: "Kuri ${APPLICANT_LAST_NAME}, Dosiye yawe isaba: Ubwenegihugu bw'u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yoherejwe neza! Amafaranga yishyurwa: 10,000 FRW Ishyura mbere ya: ${paymentExpiryDate}. Mukeneye ubundi bufasha, mwahamagara 9099",
        emailTemplate: "Kuri ${APPLICANT_LAST_NAME}, Dosiye yawe isaba: Ubwenegihugu bw'u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yoherejwe neza! Amafaranga yishyurwa: 10,000 FRW Ishyura mbere ya: ${paymentExpiryDate}. Mukeneye ubundi bufasha, mwahamagara 9099",
        notificationTitle: "Dosiye yoherejwe"
      }
    };

    const transitionTemplate: createNewTransitions = {
      id: 0,
      startState: this.creationForm.value.startState,
      event: this.creationForm.value.event,
      state: "PAYMENT_PENDING",
      endStateOne: {
        stateName: "Payment_Pending",
        stateCode: this.creationForm.value.stateCode,
        breakingAction: {
          actionType: this.creationForm.value.breakingAction,
          args: null
        },
        nonBreakingActionList: this.creationForm.value.actionType
          ? [{
            actionType: this.creationForm.value.actionType,
            args: notificationTemplates
          }]
          : []
      },
      endStateTwo: null,
      breakingAction: '',
      nonBreakingAction: '',
      notificationTitle: undefined
    };

    let newArray: createNewTransitions[] = [];
    const isLocalPresent = localStorage.getItem("iremboWorkflow");

    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent) as createNewTransitions[];
      const newId = oldArray.length + 1;
      transitionTemplate.id = newId;
      newArray = [...oldArray, transitionTemplate];
    } else {
      transitionTemplate.id = 1;
      newArray = [transitionTemplate];
    }

    this.newTransitionsList = newArray;
    localStorage.setItem("iremboWorkflow", JSON.stringify(newArray));

    // Clear the form
    this.creationForm.reset();
    // Reload the page immediately
    window.location.reload();

  }

  updateTransition() {
    if (this.creationForm.valid) {
      // Logic to update the transition and save it to local storage
      console.log(this.creationForm.value);

      // Ensure localStorage returns a string
      const storedTransitions = localStorage.getItem('iremboWorkflow');
      const transitions = storedTransitions ? JSON.parse(storedTransitions) : [];

      transitions.push(this.creationForm.value);
      localStorage.setItem('iremboWorkflow', JSON.stringify(transitions));

      // Close the modal
      // ($('#exampleModal') as any).modal('hide');
    }
  }

  onUpdate(item: any, i: number) {
    this.creationForm.controls['item'].setValue(item.event);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  @Input() config: transitionConfig | undefined = {
    id: 0,
    description: '',
    names: '',
    name: '',
    event: '',
    startState: '',
    emailTemplate: '',
    notificationTitle: '',
    smsTemplate: '',
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
  transitionToEdit: transitionConfig = {
    description: '', names: '', name: '', startState: '', event: '', endStateOne: undefined, breakingAction: undefined, endStateTwo: undefined, emailTemplate: '', notificationTitle: '', smsTemplate: '', position: { x: 0, y: 0 },
    id: 0
  };

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
  private idCounter: number;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder

  ) {
    this.workflowData = WorflowSample.sample2;

    this.devForm = this.fb.group({
      devList: this.fb.array([])
    });
    this.idCounter = 0;

  }

  formData: any = {};

  handleClick() {
    console.log('Show Data:', this.showData);
    this.showData = true;
  }

  newTransForm !: FormGroup;

  logTransitions() {
    console.log(this.workflow, "========================== TRANS");

  }

  // Add this method to edit developer data
  editDev(index: number) {
    this.isFormVisible = !this.isFormVisible;
    this.isEditing = true; // Add this line
    this.editIndex = index; // Add this line
    const dev = this.storedData[index];
    this.devForm.setControl('devList', this.fb.array([this.createDevGroup(dev)]));
    // Open mat-expansion-panel
    const panel = document.getElementById('expansionPanel' + index);
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openModal() {
  
  }


 
  ngOnInit(): void {
    this.loadInitialData();

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

    if (this.devListArray().length === 0) {
      this.addDev();
    }

    ENG: this.fb.group({
      notificationTitle: ['', Validators.required],
      smsTemplate: ['', Validators.required],
      emailTemplate: ['', Validators.required]
    }),

      this.updateForm = this.fb.group({
        startState: ['', Validators.required],
        event: ['', Validators.required],
        stateCode: ['', Validators.required],
        breakingAction: ['', Validators.required],
        actionType: ['', Validators.required],
        // Add other form controls as needed
      });

    this.initialiseCreationFormGroup();

  }

  fetchNonBreakingAction(i: number, j: number): any {
    const devGroup = this.devListArray().at(i);
    if (!devGroup) return null;

    const endStateOne = devGroup.get('endStateOne');
    if (!endStateOne) return null;

    const nonBreakingActionList = endStateOne.get('nonBreakingActionList') as FormArray;
    if (!nonBreakingActionList) return null;

    const nonBreakingAction = nonBreakingActionList.at(j);
    if (!nonBreakingAction) return null;

    const args = nonBreakingAction.get('args');
    if (!args) return null;

    const frenchNotificationTemplate = args.get('frenchNotificationTemplate');
    if (!frenchNotificationTemplate || !(frenchNotificationTemplate instanceof AbstractControl)) return null;

    const smsTemplateControl = frenchNotificationTemplate.get('smsTemplate');
    const emailTemplateControl = frenchNotificationTemplate.get('emailTemplate');
    const notificationTitleControl = frenchNotificationTemplate.get('notificationTitle');

    if (!smsTemplateControl || !emailTemplateControl || !notificationTitleControl) return null;

    return {
      smsTemplate: smsTemplateControl.value || '',
      emailTemplate: emailTemplateControl.value || '',
      notificationTitle: notificationTitleControl.value || ''
    };
  }



  countCharacters() {
    const smsTemplateValue = this.devForm.get('smsTemplate')?.value;
    console.log('SMS Template Value:', smsTemplateValue);
    this.characterCount = smsTemplateValue ? smsTemplateValue.length : 0;
    console.log('Character Count:', this.characterCount);
    this.changeDetectorRef.detectChanges();
  }

  devListArray(): FormArray {
    return this.devForm.get('devList') as FormArray;
  }

  addDev() {
    const devGroup = this.fb.group({
      id: this.getNextId(),
      startState: '',
      event: '',
      state: '',
      endStateOne: this.fb.group({
        stateName: '',
        stateCode: '',
        breakingAction: this.fb.group({
          actionType: ''
        }),
        nonBreakingActionList: this.fb.array([])
      })
    });
    this.devListArray().push(devGroup);
  }

  nonBreakingActionss(i: number): FormArray {
    return (this.devListArray().at(i).get('endStateOne') as FormGroup).get('nonBreakingActionList') as FormArray;
  }

  populateFormWithData(data: any) {
    this.devForm.patchValue({
      startState: data.startState,
      event: data.event,
      state: data.state,
      // Populate other form fields similarly
    });
  }

  deleteDev(index: number) {
    this.storedData.splice(index, 1); // Remove the developer
    localStorage.setItem('iremboWorkflow', JSON.stringify(this.storedData)); // Update local storage
    this.loadInitialData(); // Reload data

    setTimeout(() => {
      location.reload(); // Reload the page after 10 seconds
    }, 100); // 10000 milliseconds = 10 seconds
  }

  onTransitionSelected(transitionData: transitionConfig) {
    this.populateFormWithData(transitionData);
  }

  addNonBreakingActionss(i: number) {
    const actionGroup = this.fb.group({
      actionType: 'NOTIFICATION',
      args: this.fb.group({
        frenchNotificationTemplate: this.fb.group({
          smsTemplate: '',
          emailTemplate: '',
          notificationTitle: ''
        }),
        englishNotificationTemplate: this.fb.group({
          smsTemplate: '',
          emailTemplate: '',
          notificationTitle: ''
        }),
        kinyarwandaNotificationTemplate: this.fb.group({
          smsTemplate: '',
          emailTemplate: '',
          notificationTitle: ''
        })
      })
    });
    this.nonBreakingActionss(i).push(actionGroup);
  }

  removeNonBreakingActions(i: number, j: number) {
    this.nonBreakingActionss(i).removeAt(j);
  }

  addNonBreakingActionToFirst() {
    this.addNonBreakingActionss(0);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.saveFormData();
    this.devForm.reset();
    this.devForm.setControl('devList', this.fb.array([]));
    this.addDev();
    console.log('transitions', this.stateMachineForm.value);
  }

  saveFormData() {
    try {
      const formValue = this.devForm.value;
      const existingData: Developer[] = JSON.parse(localStorage.getItem('iremboWorkflow') || '[]');
      const newData: Developer[] = [...existingData, ...formValue.devList.map((dev: any) => {
        // Ensure breakingAction is included even if it's null or empty
        if (!dev.endStateOne.breakingAction || !dev.endStateOne.breakingAction.actionType.trim()) {
          dev.endStateOne.breakingAction = null;
        }
        return dev;
      })];
      localStorage.setItem('iremboWorkflow', JSON.stringify(newData));
      localStorage.setItem('idCounter', this.idCounter.toString());

      // Automatically reload the page after 10 seconds
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  }

  updateDev() {
    if (this.editIndex !== null) {
      const formValue = this.devForm.value;
      this.storedData[this.editIndex] = formValue.devList[0]; // Update the stored data
      localStorage.setItem('iremboWorkflow', JSON.stringify(this.storedData)); // Save updated data to local storage
      this.isEditing = false; // Reset editing state
      this.editIndex = null; // Reset edit index
      this.devForm.reset(); // Clear the form
      this.devForm.setControl('devList', this.fb.array([])); // Clear the form array
      this.addDev(); // Add a new blank entry
    }
  }


  getNextId(): number {
    this.idCounter += 1;
    return this.idCounter;
  }

  createDevGroup(dev: Developer): FormGroup {
    return this.fb.group({
      id: dev.id,
      startState: dev.startState,
      event: dev.event,
      state: dev.state || '', // Add this line to handle the state property
      endStateOne: this.fb.group({
        stateName: dev.endStateOne.stateName,
        stateCode: dev.endStateOne.stateCode,
        breakingAction: dev.endStateOne.breakingAction && dev.endStateOne.breakingAction.actionType.trim() !== '' ?
          this.fb.group({
            actionType: dev.endStateOne.breakingAction.actionType
          }) : null,
        nonBreakingActionList: new FormArray(dev.endStateOne.nonBreakingActionList.map((action: Action) => this.createNonBreakingActionGroup(action)))
      })
    });
  }

  createNonBreakingActionGroup(action: any): FormGroup {
    return this.fb.group({
      actionType: action.actionType,
      args: this.fb.group({
        frenchNotificationTemplate: this.fb.group({
          smsTemplate: action.args.frenchNotificationTemplate.smsTemplate,
          emailTemplate: action.args.frenchNotificationTemplate.emailTemplate,
          notificationTitle: action.args.frenchNotificationTemplate.notificationTitle
        }),
        englishNotificationTemplate: this.fb.group({
          smsTemplate: action.args.englishNotificationTemplate.smsTemplate,
          emailTemplate: action.args.englishNotificationTemplate.emailTemplate,
          notificationTitle: action.args.englishNotificationTemplate.notificationTitle
        }),
        kinyarwandaNotificationTemplate: this.fb.group({
          smsTemplate: action.args.kinyarwandaNotificationTemplate.smsTemplate,
          emailTemplate: action.args.kinyarwandaNotificationTemplate.emailTemplate,
          notificationTitle: action.args.kinyarwandaNotificationTemplate.notificationTitle
        })
      })
    });
  }


  // Method to count words
  countWords(text: string): number {
    if (!text) {
      return 0;
    }
    return text.trim().split(/\s+/).length;
  }

  // Method to update word count
  updateWordCount(text: string): void {
    this.wordCount = this.countWords(text);
  }


  RWtitle: string = '';
  ENGtitle: string = '';
  FRtitle: string = '';
  RWtitle1: string = '';
  ENGtitle1: string = '';
  FRtitle1: string = '';
  RWtitle2: string = '';
  ENGtitle2: string = '';
  FRtitle2: string = '';

  RWSms: string = '';

  RWEmail: string = '';

  setSms(event: any): void {
    switch (this.activatedTab) {
      case 0:
        this.RWSms = event.target.value;
        break;

    }
  }

  setEmail(event: any): void {
    switch (this.activatedTab) {
      case 0:
        this.RWEmail = event.target.value;
        break;

    }

  }

  setTitle(event: any): void {
    switch (this.activatedTab) {
      case 0:
        this.RWtitle = event.target.value;
        break;
      case 1:
        this.ENGtitle = event.target.value;
        break;
      case 2:
        this.FRtitle = event.target.value;
        break;

    }
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
    const patX = 280;
    const patY = 120;

    // Define arrays of positions for transitions and states
    const transitionPositions = [
      { x: 271, y: -600 },
      { x: 550, y: -600 },
      { x: 550, y: -421 },
      { x: 1040, y: -405 },
      { x: 800, y: -781 },
      { x: 800, y: -600 },
      // Add more positions as needed
    ];

    const statePositions = [
      { x: 273, y: -750 },
      { x: 5, y: -390 },
      { x: 520, y: -375 },
      { x: 760, y: -570 },
      { x: 750, y: -735 },
      // Add more positions as needed
    ];

    let i = 0;

    this.iremboWorkflow.forEach(element => {
      // Get the position for the current transition and state
      const transitionPosition = transitionPositions[i % transitionPositions.length];
      const statePosition = statePositions[i % statePositions.length];

      // Add Start State
      if (!this.workflow.states.has(element.startState.toString())) {
        let state: stateConfig = {
          name: element.startState.toString(),
          tasks: element.startState.toString(),
          names: element.startState.toString(),
          position: {
            x: statePosition.x,
            y: statePosition.y
          }
        };
        this.workflow.states.set(element.startState.toString(), state);
      }

      // Add End State One
      if (element.endStateOne && !this.workflow.states.has(element.endStateOne?.stateCode.toString())) {
        let state: stateConfig = {
          name: element.endStateOne.stateCode.toString(),
          tasks: element.endStateOne.stateCode.toString(),
          names: element.endStateOne.stateCode.toString(),
          position: {
            x: statePosition.x + patX,
            y: statePosition.y
          }
        };
        this.workflow.states.set(element.endStateOne.stateCode.toString(), state);
      }

      // Add End State Two
      if (element.endStateTwo && !this.workflow.states.has(element.endStateTwo?.stateCode.toString())) {
        let state: stateConfig = {
          name: element.endStateTwo.stateCode.toString(),
          tasks: element.endStateTwo.stateCode.toString(),
          names: element.endStateTwo.stateCode.toString(),
          position: {
            x: statePosition.x + patX,
            y: statePosition.y + patY
          }
        };
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
          position: transitionPosition,
          id: 0,
          emailTemplate: '',
          smsTemplate: '',
          notificationTitle: ''
        };
        this.workflow.transitions.push(transition);
      }

      // Increment the index for the next transition
      i++;
    });

    document.addEventListener("DOMContentLoaded", () => {
      const notifications = document.querySelector('.notifications') as HTMLElement;
      const successButton = document.getElementById('success');

      if (successButton) {
        successButton.onclick = function () {
          let type = 'success';
          let icon = 'fa-solid fa-circle-check';
          let text = 'Wow..! Transition Created!';
          createToasts(type, icon, text, notifications);
        }
      } else {
        console.error("Success button not found");
      }
    });

    document.addEventListener("DOMContentLoaded", () => {
      const notifications = document.querySelector('.notifications') as HTMLElement;
      const successButton = document.getElementById('success');

      if (successButton) {
        successButton.onclick = function () {
          let type = 'success';
          let icon = 'fa-solid fa-circle-check';
          let text = 'Wow..! Transition created!';
          createToasts(type, icon, text, notifications);
        }
      } else {
        console.error("Success button not found");
      }
    });

    function createToasts(type: string, icon: string, text: string, container: HTMLElement) {
      // Show notifications container
      container.style.display = 'block';

      let newToasts = document.createElement('div');
      newToasts.innerHTML = `
        <div class="toasts ${type}">
          <i class="${icon}"></i>
          <div class="content" style="width: 99px;">
            <span style="font-size: 10px; margin: 8px -31px; color: #000;">${text}</span>
          </div>
          <i class="fa-solid fa-xmark"></i>
        </div>
      `;

      const toast = newToasts.firstElementChild as HTMLElement;

      // Add click event to remove toast on close icon click
      toast.querySelector('.fa-xmark')?.addEventListener('click', () => {
        clearTimeout(toastTimeout);
        toast.remove();
        hideContainerIfEmpty(container);
      });

      container.appendChild(toast);

      // Set a timeout to remove the toast after 1 minute (60000 milliseconds)
      const toastTimeout = setTimeout(() => {
        toast.remove();
        hideContainerIfEmpty(container);
      }, 70000);
    }

    // Hide the notifications container if there are no toasts
    function hideContainerIfEmpty(container: HTMLElement) {
      if (container.children.length === 0) {
        container.style.display = 'none';
      }
    }
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
    this.transitionToEdit = selected;
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
  notificationTitle: any;

  constructor() { this.id = 0; this.startState = ''; this.notificationTitle = ''; this.endStateTwo = ''; this.event = ''; this.state = ''; this.breakingAction = ''; this.nonBreakingAction = '' }
}
export class StateMachineComponents {
  searchText: string = '';
  // other component code
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
