import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'respond-edit-block',
    templateUrl: 'edit-block.component.html',
    providers: []
})

export class EditBlockComponent {

  selectVisible: boolean = false;

  // set model
  model: any = {
      id: '',
      cssClass: '',
      backgroundImage: '',
      backgroundColor: '',
      backgroundSize: '',
      backgroundPosition: '',
      backgroundRepeat: ''
    };

  // model to store
  _title: string = 'Block';
  _selector: string = null;
  _properties: any = {
                        id: '',
                        cssClass: '',
                        html: ''
                      };
  _attributes: any = {};

  _visible: boolean = false;

  @Input()
  set visible(visible: boolean){

    // set visible
    this._visible = visible;

  }

  get visible() { return this._visible; }

  @Input()
  set title(title: string){

    // reset model
    this._title = title;

  }

  get title() { return this._title; }

  @Input()
  set selector(selector: string){

    // reset model
    this._selector = selector;

  }

  get selector() { return this._selector; }

  @Input()
  set properties(properties: any){

    // reset model
    this._properties = properties;

    // set model
    this.model.id = properties.id;
    this.model.cssClass = properties.cssClass;
    this.model.backgroundImage = properties.backgroundImage;
    this.model.backgroundColor = properties.backgroundColor;
    this.model.backgroundSize = properties.backgroundSize;
    this.model.backgroundPosition = properties.backgroundPosition;
    this.model.backgroundRepeat = properties.backgroundRepeat;

  }

  get properties() { return this._properties; }

  @Output() onCancel = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onError = new EventEmitter<any>();

  constructor () {}

  /**
   * Init
   */
  ngOnInit() {

  }

  /* 
   * shows the select file modal
   */
  showSelect() {
    this.selectVisible = true;
  }

  /**
   * reset
   */
  reset() {
    this.selectVisible = false;
  }

  /**
   * select
   */
  select(event) {

    // set src to selected file
    this.model.backgroundImage = 'files/' + event.name;

    // reset
    this.reset();
  }

  /**
   * Hides the add component modal
   */
  hide() {
    this._visible = false;
    this.onCancel.emit(null);
  }

  /**
   * Submits the form
   */
  submit() {
    this._visible = false;
    this.onUpdate.emit({properties: this.model, attributes: this._attributes});
  }

  /**
   * failure
   */
  failure(event) {
    // reset
    this.reset();
  }

}