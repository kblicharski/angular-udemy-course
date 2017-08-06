import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenNames = ['Test', 'test'];
  projectStatuses = ['stable', 'critical', 'finished'];
  defaultProjectStatus = 'stable';

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.nameValidator.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(this.defaultProjectStatus)
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenNames.includes(control.value)) {
      return {'forbiddenName': true};
    }
    return null;
  }
}
