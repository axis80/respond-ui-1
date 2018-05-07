import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { AppService } from '../../../../shared/services/app.service';

@Component({
    selector: 'respond-add-user',
    templateUrl: 'add-user.component.html',
    providers: [UserService, AppService]
})

export class AddUserComponent {

  routes;
  languages;

  // model to store
  model: {
    email: '',
    role: 'admin',
    firstName: 'New',
    lastName: 'User',
    password: '',
    retype: '',
    language: 'en'
  };

  _visible: boolean = false;

  @Input()
  set visible(visible: boolean){

    // set visible
    this._visible = visible;

    // reset model
    this.model = {
      email: '',
      role: 'admin',
      firstName: 'New',
      lastName: 'User',
      password: '',
      retype: '',
      language: 'en'
    };

  }

  get visible() { return this._visible; }

  @Output() onCancel = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();
  @Output() onError = new EventEmitter<any>();

  constructor (private _userService: UserService, private _appService: AppService) {}

  /**
   * Inits component
   */
  ngOnInit() {
    this.languages = [];

    this.list();
  }

  /**
   * Lists available languages
   */
  list() {
    this._appService.listLanguages()
                     .subscribe(
                      (data: any) => { this.languages = data;},
                       error =>  { this.onError.emit(<any>error); }
                      );
  }

  /**
   * Hides the modal
   */
  hide() {
    this._visible = false;
    this.onCancel.emit(null);
  }

  /**
   * Submits the form
   */
  submit() {

    if(this.model.password != this.model.retype) {
      console.log('[respond.error] password mismatch');
      
      this._appService.showToast('failure', 'The password does not match the retype field');

      return;
    }

    // add user
    this._userService.add(this.model.email, this.model.role, this.model.firstName, this.model.lastName, this.model.password, this.model.language)
                     .subscribe(
                      () => { this.success(); },
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

}