import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        // we need to `bind(this)` because in forbiddenNames we use `this`
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    this.signUpForm.valueChanges
      .subscribe(value => console.log(value));
    this.signUpForm.statusChanges
      .subscribe(status => console.log(status));
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    // this must be casted or else you get an error
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  // a regular validator
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    // this is important -- if validation is successful you must pass nothing or null
    return null;
  }

  // example of an asynchronous validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
     return new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({'emailIsForbidden': true});
          } else {
            resolve(null);
          }
        }, 1500);
    });
  }
}
