import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataService: DataService) { }

  saveData() {
    this.dataService.storeRecipes()
      .subscribe(
        (response: Response) => console.log(response)
      )
  }

  fetchData() {
    this.dataService.getRecipes()
      .subscribe(
        (response: Response) => console.log(response.json())
      )
  }
}
