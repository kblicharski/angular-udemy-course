import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

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
      'projectName': new FormControl(null, Validators.required, this.nameValidator.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(this.defaultProjectStatus)
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  // nameValidator(control: FormControl): {[s: string]: boolean} {
  //   if (this.forbiddenNames.includes(control.value)) {
  //     return {'forbiddenName': true};
  //   }
  //   return null;
  // }

  nameValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.forbiddenNames.includes(control.value)) {
          resolve({'forbiddenName': true});
        } else {
          resolve(null);
        }
      }, 1500)
    });
  }
}
