# Data Binding
Data binding represents the interface between the TypeScript code
(the business logic of your application) in your component and the
HTML code in your template (what the user sees).

There are four ways of using data binding in Angular:

1. Outputting data to the template. (TS -> HTML)
    - String Interpolation: `{{ data }}`
 
	- Property Binding: `[property]=”data”`

2. Reacting to user events.  (HTML -> TS)
    - Event Binding: `(event)=”expression”`

3. A combination of both.
	- Two-Way Binding: `[(ngModel)]=”data”`
	
# String Interpolation - {{ }} 
This is directly using properties that are defined in your component class.
As long as they can be resolved to a string, they can be placed inside the
curly braces and outputted in the template.

Consider this example:

```
// server.component.ts
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {
  serverID = 10;
  serverStatus = 'offline';

  getServerStatus() {
    return this.serverStatus;
  }
}
```

```
<!-- server.component.html -->
<p>Server with ID {{ serverId }} is currently {{ serverStatus }}.</p>
```

However, you are not just limited to properties. You can put anything
inside the curly braces as long as it resolves to a string. For a trivial
example, this will work as expected.
```
<p>{{ 'this will output this sentence' }}</p>
```

This means you can call methods inside the curly braces as well. 
```
<p>The server is currently {{ getServerStatus() }}.</p>
```

# Property Binding - [ ]
This is a way of binding the value of a field via an HTML element property. 

```
// servers.component.ts
@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowNewServer = false;

  constructor() {
    setTimeout(() => this.allowNewServer = true, 2000)
  }
}
```

```
<!-- server.component.html -->
<button class="btn btn-primary" [disabled]="!allowNewServer">Add Server</button>
```

`allowNewServer` will evaluate to a boolean value, which will then set the
value of `disabled`. After two seconds, `allowNewServer` will flip because
of the component’s constructor. This is how you can dynamically update the
DOM. HTML attributes might require other types, such as numbers or strings.
In addition to binding to HTML element properties, you can also bind
to directive properties, and the properties of your own custom components.

## String Interpolation vs Property Binding
Sometimes the two are entirely interchangeable. 

```
<!-- server.component.html -->
<p>{{ allowNewServer }}</p>
<p [innerText]="allowNewServer"></p>
```

These will both print “false”. However, the first one is
more intuitive and preferred.

Generally speaking:
- Do you want to print some text? Use string interpolation.
- Do you want to change some property? Use property binding.

Never mix the two, though. This will not work: 
```
<p [innerText]="{{ allowNewServer }}"></p> 
```

# Event Binding - ( )
What if we want to react to events?
Using our button example, let’s add this property and corresponding method
to `servers.component.ts`. 

```
serverCreationStatus = ‘No server created.’;
onCreateServer() {
  this.serverCreationStatus = 'Server was created.';
}
```

And let’s add another HTML element property to the button element:
```
<button class="btn btn-primary" (click)="onCreateServer()">Add Server</button>
```

Before clicking the button, this prints “No servers were created.”
After clicking the button, `onCreateServer()` is called, which changes
the message to “Server was created.” Generally speaking, for these sorts
of methods, you should prefix them with “on” to make it clear that they
are meant to be used with some sort of event.

There’s one important feature about event binding.
Let’s add the following code:

```
<!-- server.component.html -->
<input type="text" class="form-control" (input)="onUpdateServerName($event)">
```

```
// server.component.ts
serverName = '';

onUpdateServerName(event: Event) {
	this.serverName = (<HTMLInputEvent>event.target).value;
}
```

`$event` is a reserved keyword that sends metadata about
the event we are binding to. For a click event, this might be the
coordinates that were clicked, for example. In this case, input
has a property called `value` which is the text that is typed inside
the input form. 

`<HTMLInputElement>` is a typecast to tell TypeScript that we know the
type of `event.target`. This code will dynamically update the value of
the `serverName` variable with each keystroke the user inputs.

# Two-Way Binding - [( )]
We can do this more concisely by using the ngModel directive from the FormsModule.

<!-- servers.component.html -->
<input type="text" class="form-control" [(ngModel)]="serverName">

This will automatically save the input text to serverName. There is a downside, though. What if in server.component.ts we set an initial value of serverName to “Test Server”? Because it is two-way binding, this will change the input box as well. So, if you were to go to the website, you would see the input form prepopulated with the words “Test Server”. Additionally, imagine you had the previous input form as well as this one. If you were to type something in the previous one, it would also show up in this one.
Two-way binding is a nice way of reacting to events in both directions, but is not always desirable.
