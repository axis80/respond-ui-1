import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CodeService } from '../../../../shared/services/code.service';
import { AppService } from '../../../../shared/services/app.service';

@Component({
    selector: 'respond-add-code',
    templateUrl: 'add-code.component.html',
    providers: [CodeService, AppService]
})

export class AddCodeComponent {

  // model to store
  model: any;
  uploadUrl: string;

  _visible: boolean = false;

  @Input()
  set visible(visible: boolean){

    // set visible
    this._visible = visible;

    // reset model
    this.model = {
      type: 'template',
      name: ''
    };

  }

  get visible() { return this._visible; }

  @Output() onCancel = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();
  @Output() onError = new EventEmitter<any>();

  constructor (private _codeService: CodeService, private _appService: AppService) {}

  /**
   * Init
   */
  ngOnInit() {
    this.uploadUrl = '/api/code/upload/template';
  }

  /**
   * Hides the add code modal
   */
  hide() {
    this._visible = false;
    this.onCancel.emit(null);
  }

  /**
   * Submits the form
   */
  submit() {

    this._codeService.add(this.model.type, this.model.name)
                     .subscribe(
                      (data: any) => { this.success(); },
                       error =>  { this.onError.emit(<any>error); }
                      );

  }

  /**
   * Handles a successful add
   */
  success() {
    
    this._visible = false;
    this.onAdd.emit(null);

  }

  /**
   * Handles a successful upload
   */
  uploaded() {

    this._visible = false;
    this.onAdd.emit(null);

  }

  /**
   * Update the url with the type
   */
  updateUrl(value: string) {
    this.uploadUrl = '/api/code/upload/' + value;
  }

}