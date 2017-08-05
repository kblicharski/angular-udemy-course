import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  submitted = false;
  defaultSubscription = 'advanced';
  user = {
    email: '',
    subscription: this.defaultSubscription,
    password: ''
  };

  @ViewChild('form') form: NgForm;

  onSubmit() {
    this.submitted = true;
    this.user.email = this.form.value.email;
    this.user.subscription = this.form.value.subscription || this.defaultSubscription;
    this.user.password = this.form.value.password;
    console.log(this.user);
  }
}
