import { EventEmitter, Injectable } from '@angular/core';

import { Account } from './account';
import { LoggerService } from './logger.service';

@Injectable()
export class AccountService {

  private _accounts: Account[] = [
    {name: 'Master Account', status: 'active'},
    {name: 'Test Account', status: 'inactive'},
    {name: 'Hidden Account', status: 'unknown'}
  ];

  get accounts(): Account[] {
    return this._accounts.slice();
  }

  statusUpdated: EventEmitter<string> = new EventEmitter<string>();

  accountsChanged: EventEmitter<Account[]> = new EventEmitter<Account[]>();

  constructor(private loggerService: LoggerService) {}

  addAccount(name: string, status: string): void {
    this._accounts.push({name: name, status: status});
    this.loggerService.logChange('New server with status: ' + status);
    this.accountsChanged.emit(this._accounts);
  }

  updateStatus(id: number, newStatus: string): void {
    this._accounts[id].status = newStatus;
    this.loggerService.logChange('Server status updated: ' + newStatus);
    this.accountsChanged.emit(this._accounts);
  }

}
