import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormService } from '../../../../shared/services/form.service';
import { AppService } from '../../../../shared/services/app.service';

@Component({
    selector: 'respond-add-form',
    templateUrl: 'add-form.component.html',
    providers: [FormService, AppService]
})

export class AddFormComponent {

  routes;

  // model to store
  model: {
    name: '',
    cssClass: '',
    validate: false,
    success: '',
    error: '',
    recaptchaError: '',
    notify: ''
  };

  _visible: boolean = false;

  @Input()
  set visible(visible: boolean){

    // set visible
    this._visible = visible;

    // reset model
    this.model = {
      name: '',
      cssClass: '',
      validate: false,
      success: '',
      error: '',
      recaptchaError: '',
      notify: ''
    };

  }

  get visible() { return this._visible; }

  @Output() onCancel = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();
  @Output() onError = new EventEmitter<any>();

  constructor (private _formService: FormService, private _appService: AppService) {}

  /**
   * Init
   */
  ngOnInit() {

  }

  /**
   * Hides the add modal
   */
  hide() {
    this._visible = false;
    this.onCancel.emit(null);
  }

  /**
   * Submits the form
   */
  submit() {

    this._formService.add(this.model.name, this.model.cssClass, this.model.validate, this.model.success, this.model.error, this.model.recaptchaError, this.model.notify)
                     .subscribe(
                      (data: any) => { this.success(); },
                       error =>  { this.onError.emit(<any>error); }
                      );

  }

  /**
   * Handles a successful add
   */
  success() {

    this._appService.showToast('success', '');

    this._visible = false;
    this.onAdd.emit(null);

  }


}