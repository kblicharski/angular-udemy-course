import { Injectable } from '@angular/core';

import { Account } from './account';

@Injectable()
export class AccountService {

  accounts: Account[] = [
    {name: 'Master Account', status: 'active'},
    {name: 'Testaccount', status: 'inactive'},
    {name: 'Hidden Account', status: 'unknown'}
  ];

  addAccount(name: string, status: string): void {
    this.accounts.push({name: name, status: status});
  }

  updateStatus(id: number, newStatus: string): void {
    this.accounts[id].status = newStatus;
  }

}
