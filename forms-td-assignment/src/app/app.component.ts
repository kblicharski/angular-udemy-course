import { Component } from '@angular/core';

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

  onSubmit() {
    this.submitted = true;
    console.log(this.user);
  }
}
