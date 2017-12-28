# Services and Dependency Injection
Services are a super important part of Angular. They can be used as a better
way of managing and passing around complex state information about your application.

Recall that we can use the `@Input()` and `@Output()` decorators to pass information
between components. If we have heavily nested components, this can lead to extremely
long chains of inputs and outputs that consist mostly of duplicated code;
detecting that an event was fired and passing the information up by firing another event.

Services don't discretely fall into a category of the MVC architecture. While our
component templates are our views, our TypeScript component code our controllers,
and our data classes and interfaces our models, services serve a different purpose.

So far, we have described how services can act as "servers" for our data. They can
also be ways of abstracting out common controller actions so that they can be reused.
One trivial example is, what if you have a method on your components that logs error data?
This method has a very similar implementation everywhere it is used. We can make its
behavior more consistent and more reliable by abstracting it into a service, and then
using dependency injection to use this behavior wherever we want it.

Therefore, services fulfill a few important roles:
1. Allow us to be more DRY -- reduce code duplication.
2. Allow for more reliable and consistent behavior -- methods can only be broken
in ONE canonical location, not in a location hidden among (potentially) dozens.
3. Allow for canonical, immutable data stores -- we can store data in a service,
and when we want to use it in a component, return a copy. This allows us to never
accidentally mutate data when we didn't mean to, and makes sure that we aren't
creating local stores of data throughout our component logic that could become
"out of sync".

Overall, services function as a central, authoritative source for application
data and application behavior.

# Creating Services - An Example LoggerService
From what you have learned thus far about components and directives, you might
think that Angular has some sort of `@Service()` decorator that we define on a class.
This isn't the case; as with models, services are just normal TypeScript classes. 

Here is an example implementation of a service used to log data to the console:
```
import { Injectable } from '@angular/core';
  
@Injectable()
export class LoggerService {
  
  constructor() { }
  
  logChange(change: string): void {
    console.log(change);
  }
  
}
```
Note: `@Injectable()` is used (and explained later), but the service will work
just as well without the decorator.

So now that you have defined a service, how do you use it? You might expect that
we follow the same pattern we're used to -- import the service, create an instance
of the service, and then call the methods on the instance.

This might look something like the following:

```
import { Component, EventEmitter, Output } from '@angular/core';
  
import { LoggerService } from '../logging.service';
  
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();
  
  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });
    const service = new LoggerService();
    service.logChange('A server status changed, new status: ' + accountStatus);
    // console.log('A server status changed, new status: ' + accountStatus);
  }
  
}
```

This would work as expected -- every time the method `onCreateAccount` is called,
the `logChange` method will also be called and log the message to the console.

However, this is incorrect. Angular provides a much better way of doing this --
as mentioned, this is called *dependency injection*, and allows us to eliminate
the overhead of constantly having to create new object instances. 

So how do we actually use dependency injection?

In the `app.module.ts` file, there is an array called `providers`. This array
actually exists on all of our components as well, as an optional property on the
metadata that we pass to the `@Component()` decorator. First we have to "provide"
our service by recording it in one of these locations, and then we can "inject"
it by passing it to our component's constructor.

For more information about providers, [click here](https://stackoverflow.com/questions/37867503/what-are-providers-in-angular2).

For example:

```
import { Component, EventEmitter, Output } from '@angular/core';
  
import { LoggerService } from '../logger.service';
  
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggerService]
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{ name: string, status: string }>();
  
  constructor(private loggerService: LoggerService) {}
  
  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });
    this.loggerService.logChange('A server status changed, new status: ' + accountStatus);
  }
  
}
```
Note: The type that we specify in the constructor is not optional -- it is required
for Angular to know what service to inject.

This is the way you are actually meant to use services. In fact, in Angular,
the only purpose of a component's constructor should be to inject the needed
dependencies. All of the initialization should take place in the `ngOnInit` method.

So why are there multiple `providers` array locations? The place we "provide" our
service determines where we are allowed to "inject" it from. If we provide it
on a component, it will be available for that component and all nested child components.

If we provide it in a module, it will be available for all of the components
declared within that module. So, if we wanted a global service, we should register
it in the `app.component.ts`'s `providers` array.

# Creating Services - An Example Data Service
Before, if we wanted to pass data around an application, we needed to chain
`@Input()` and `@Output()` calls between components.

Now, it's as simple as storing the data in a service.
For example, with our accounts app:

```
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
```
This service also contains two methods that allow us to manipulate the data.
Now, whenever we want to gain access to the accounts array, we can do so through
this well-defined API. Whereas before, we would have to emit events containing
account data, and passing them up to the `app.component` (which used to contain)
the accounts, now we just inject the `AccountService` and call the methods it
contains with the data:

Note: There is a super important caveat here (when working with data services),
which has to deal with how `providers` works, and how dependency injection works.
The place you provide a data service is REALLY important. If we just provide it
on each component we want to use it, then in actuality, we are making a bunch of
new instances of our `AccountService`, each with its own array of accounts!

For data services, especially services that manage application-wide information,
we usually mean to provide them in our `app.module`. This ensures that they are
available application-wide -- i.e. our service will always be a singleton.

However, note that the encapsulation behavior of providing services on particular
components could be useful in special circumstances when data or behavior is not
needed application-wide, but just for a component and its child components.

## Services in Services
We can even inject services into other services. Note, because a service does not
have a providers array, we must provide the injected service in `app.module`
This allows us to extend services very easily.

Note, this is the purpose behind the `@Injectable()` decorator -- it tells Angular
that the service the decorator sits on can have other services injected into it.
Angular needs some sort of metadata for dependency injection to work. Normally,
this is provided with the `@Component()` decorator -- services are just regular
classes, so need their own custom decorator.

Note: You put `@Injectable()` on the service you are injecting INTO, not on the
service that is being injected.

## Communication via Services
Just as services can store data and implement behavior, they can also allow for
emitting events.

Just as before, all we have to do is define the `EventEmitter` in our service,
and then when we want to use it, we can call it in a component on our injected service.
Then, for whatever other component we want to modify upon this event, we just
subscribe to the emitted event.

If `account.component` wants to talk to `new-account.component`, we can implement
it like so:

```
import { EventEmitter, Injectable } from '@angular/core';
  
import { Account } from './account';
import { LoggerService } from './logger.service';
  
@Injectable()
export class AccountService {
  
  accounts: Account[] = [
    {name: 'Master Account', status: 'active'},
    {name: 'Test Account', status: 'inactive'},
    {name: 'Hidden Account', status: 'unknown'}
  ];
  
  statusUpdated: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private loggerService: LoggerService) {}
  
  addAccount(name: string, status: string): void {
    this.accounts.push({name: name, status: status});
    this.loggerService.logChange('New server with status: ' + status);
  }
  
  updateStatus(id: number, newStatus: string): void {
    this.accounts[id].status = newStatus;
    this.loggerService.logChange('Server status updated: ' + newStatus);
  }
  
}
```

```
import { Component, Input } from '@angular/core';
  
import { Account } from '../account';
import { AccountService } from '../account.service';
  
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  
  @Input() account: Account;
  @Input() id: number;
  
  constructor(private accountService: AccountService) {}
  
  onSetTo(status: string): void {
    this.accountService.statusUpdated.emit(status);
    this.accountService.updateStatus(this.id, status);
  }
  
}
```


```
import { Component, OnInit } from '@angular/core';
  
import { AccountService } from '../account.service';
  
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  
  constructor(private accountService: AccountService) {}
  
  ngOnInit(): void {
    this.accountService.statusUpdated.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
  }
  
  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
  }
  
}
```

This pattern can save us a lot of time, since it removes the need for input/output chains.
