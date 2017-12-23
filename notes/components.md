# What Are Components?
Components are a way of structuring frontend code in a modular way.
They are the fundamental building blocks of an app; small, compact, and reusable.
For a standard web page, components could be the header, the items on the header,
the sidebar, and so on.

# Defining Components
A basic Component looks like this:
```
import { Component } from ‘@angular/core’;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
```

The `@Component` decorator includes metadata that tells Angular
that your class is a Component. The only required property is the template,
but it is very common to include the selector and style properties as well.

## Selectors
The selector is what is used when rendering your Component in HTML templates.
All selectors must be unique. They can be declared and used in three ways:

1. As an element selector (most appropriate and typical for Components):
```
TypeScript Definition: selector: ‘selector-name’;
HTML Usage: <selector-name></selector-name>
```

2. As an attribute selector:
```
TypeScript Definition: selector: ‘[selector-name]’
HTML Usage: <div selector-name></div>
```

3. As a class selector:
```
TypeScript Definition: selector: ‘.selector-name’
HTML Usage: <div class=”selector-name”></div>
```

## Templates and Styles 
The `templateUrl` property references the HTML template corresponding to your
Component. This is how your Component will be rendered on the page.
Templates can be written inline by using the `template` property instead.

The `styleUrls` property references the CSS styles corresponding to your 
Component. It is a list because you can include multiple style sheets.
Similarly, styles can be written inline by using the `styles` property instead.

### In-Lining
If writing templates or styles inline, you should use ES6 backticks for
multi-line strings:
```
@Component({
  selector: 'app-root',
  template: `
    <h3>Component Text</h3>
  `
})
```

Generally, you should avoid in-lining complicated templates or styles.
A good rule of thumb is that if they require more than 3 or 4 lines to write,
they should be in their own file.

Note: After registering the class as a Component, we use the ES6 `export`
keyword to export the class in order to import and use it in other files.

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
This is directly displaying properties that are defined in your component class.
As long as they can be resolved to a string, they can be placed inside the
curly braces and used in the template.

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
This is a way of binding the value of a field via an HTML element property. For
some HTML elements, such as the ```<button />```, certain properties are built-in,
e.g. the ```disabled``` property. 

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

This is cool, but what if we want to bind to custom properties of our own components?

## Custom Property Binding
By default, properties within a component cannot be bound from outside, even if they
are public. This is a good thing -- it prevents us from accidentally binding to
properties we did not intend. In order to mark a property as being bindable, we
must explicitly tell Angular. This is done by marking our custom property with the
```@Input()``` decorator. We can then bind to it from external components, and use
the bound property within our template. The following example binds the string
"Greetings!" to the hello component, which is then used in the main app component
to display the bound string.

```
// hello.component.ts
import { Input } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class ServersComponent {
  @Input() hello: string;
}
```

```
<!-- hello.component.html -->
<p>{{ hello }}</p>
```

```
<!-- app.component.html -->
<app-hello [hello]="Greetings!"></app-hello>
```

Note: If you would like to use an external alias (i.e. use a different name when
binding on the outside than is used on the inside), you can pass a string into the
```@Input()``` parentheses to be used as the new bindable name.

```
// hello.component.ts
import { Input } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class ServersComponent {
  @Input('greeting') hello: string;
}
```

```
<!-- hello.component.html -->
<p>{{ hello }}</p>
```

```
<!-- app.component.html -->
<app-hello [greeting]="Greetings!"></app-hello>
```

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
- Do you want to display some text? Use string interpolation.
- Do you want to change some property? Use property binding.

Never mix the two, though. This will not work: 
```
<p [innerText]="{{ allowNewServer }}"></p> 
```

# Event Binding - ( )
What if we want to react to events, or pass information from inside
a component outside to other parent components?

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
coordinates that were clicked, for example. In this case, the input element
has a property called `value` which is the text that is typed inside
the input form. 

`<HTMLInputElement>` is a typecast to tell TypeScript that we know the
type of `event.target`. This code will dynamically update the value of
the `serverName` variable with each keystroke the user inputs.

## Custom Event Binding
As with custom property binding, where we had to define a property and then
add the `@Input()` decorator, there is a similar pattern for custom event
binding.

Let's say we have an array of "Server" objects, and whenever the user clicks a
button, we want to tell our parent component that it should add a "Server" to its
array of servers.

We first need to create an object that is responsible for "emitting" the events.
This is done by creating an `EventEmitter` and adding the `@Output()` decorator.
```
@Output() serverCreated: EventEmitter<Server> = new EventEmitter<Server>();
```

The `EventEmitter` class is a generic object, expecting the type of the object it
emits to be passed into the diamond brackets.

After we have defined the `EventEmitter`, we can define a method that adds a server.
```
onAddServer() {
    this.serverCreated.emit({
        type: 'server',
        name: this.newServerName,
        content: this.newServerContent
    });
}
```

Then, when the user clicks a button, we can call this method.
```
<button (click)="onAddServer()">Add Server</button>
```

And in the parent component, as before, we can bind to this custom event.
```
<app-child (serverCreated)="onServerAdded($event)"></app-child>
```

... and manipulate the created server, passed in the `$event` argument.
```
onServerAdded($event: Server) {
    this.serverElements.push($event);
}
```

As with before, if we want to define an external alias for our `EventEmitter`,
we can pass in the name as a string into the parentheses of the `@Output()` decorator.

# Two-Way Binding - [( )]
Remember the first event binding example, where `serverName` was dynamically
updated with each user keystroke? This is such as common pattern that Angular
ships with a directive that does it for us - `ngModel`, part of the `FormsModule`.
This allows us to accomplish the same effect as before, but much more concisely:

```
<!-- servers.component.html -->
<input type="text" class="form-control" [(ngModel)]="serverName">
```

This will automatically save the input text to `serverName`.
There is a downside, though.
What if in `server.component.ts` we set an initial value of `serverName` to “Test Server”?
Because it is two-way binding, this will change the input box as well.
So, if you were to go to the website, you would see the input form prepopulated
with the words “Test Server”.
Additionally, imagine you had the previous input form as well as this one.
If you were to type something in the previous one, it would also show up in this one.

Two-way binding is a nice way of reacting to events in both directions,
but is not always desirable.

# View Encapsulation
By default, styles defined in an Angular component's .css file apply ONLY to that component.
This may seem obvious, but it is actually fairly surprising, as generally CSS does not
care what file it is defined in -- if you color a header red in one file, it normally applies
to the entire document. The behavior we see is actually enforced by Angular.

Angular does this by mangling the selector names when we apply styles to them. For example,
if we color an `h1` tag red, then the tag will not just be `h1` in the source. Instead, it
might be something like `<h1 _ngcontent-ejo-9>`. This ensures that all defined styles are unique.

It will give this unique HTML attribute to ALL of the elements of a particular component.
This is the way that Angular emulates the "shadow DOM", a technology not supported by all browsers.

Usually, this is a good thing, and what we intend. However, if you really want to change it,
you can change the `encapsulation` property on the `@Component()` decorator, e.g.

There are another few options (`Emulated` is the default): `Native` uses the shadow DOM and
`None` uses the regular CSS behavior of applying global styles.
```
import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
```

# Local References
Let's say you have an input field that is using two-way binding to get the value of
the field and update it in a property. If you only need to use the value at the point
it is registered, and not later, then there is clearly no point in saving its value
internally in a component. Instead of using two-way binding, we can instead use
local references to grab the HTML element directly. Note, that we are getting the
ENTIRE HTML element, and must access its properties as such, e.g. `serverInput.value`:

Old Method:
```
<input type="text" class="form-control" [(ngModel)]="newServerName">
<input type="text" class="form-control" [(ngModel)]="newServerContent">
<button class="btn btn-primary" (click)="onAddServer()">Add Server</button>
```
```
import { Component, EventEmitter, Output } from '@angular/core';
import { Server } from '../server';
@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
  newServerName = '';
  newServerContent = '';
  
  @Output() serverCreated: EventEmitter<Server> = new EventEmitter<Server>();

  onAddServer() {
    this.serverCreated.emit({
      type: 'server',
      name: this.newServerName,
      content: this.newServerContent
    });
  }
}
```

New Method:
```
<input type="text" class="form-control" #serverNameInput> 
<input type="text" class="form-control" [(ngModel)]="newServerContent">
<button class="btn btn-primary" (click)="onAddServer(serverNameInput)">Add Server</button>
```
```
import { Component, EventEmitter, Output } from '@angular/core';
import { Server } from '../server';
@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
  newServerContent = '';
  
  @Output() serverCreated: EventEmitter<Server> = new EventEmitter<Server>();

  onAddServer(serverNameInput: HTMLInputElement) {
    this.serverCreated.emit({
      type: 'server',
      name: serverNameInput.value,
      content: this.newServerContent
    });
  }
}
```

# Using @ViewChild
When using local references, you are restricted to using them within the defined template.
Right now, we are passing the reference whenever we call a method upon a button click.
However, what if we wanted to get access before any method is called?

We can programmatically define HTML references in our TypeScript file by using the
`@ViewChild()` decorator provided by Angular. The only difference from the previous
decorators we have used, is that this one requires a string as an input. This string is
the name of the reference we defined in our template. This is a way of getting access to an
element reference directly; as such, the type provided by `@ViewChild()` is an `ElementRef`.

```
<input type="text" class="form-control" #serverNameInput> 
<input type="text" class="form-control" #serverContentInput>
<button class="btn btn-primary" (click)="onAddServer(serverNameInput)">Add Server</button>
```
```
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Server } from '../server';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
  @ViewChild('serverContentInput') contentInput: ElementRef;

  @Output() serverCreated: EventEmitter<Server> = new EventEmitter<Server>();

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      type: 'server',
      name: nameInput.value,
      content: this.contentInput.nativeElement.value
    });
  }
}
```

The `ElementRef` has a `nativeElement` property, which is just the HTML element we expected,
e.g. `HTMLInputElement` like in the local reference method.
In this way, we can directly access values in our template without having to pass them
around in methods.

## Avoid Mutating HTML References
Important Note: Do not directly modify elements by mutating their references.
e.g., in `onAddServer()` we could do something like the following:
```
this.nameInput.value = 'something else';
this.contentInput.nativeElement.value = 'more mutations';
```

This is really bad, though. You shouldn't directly access the DOM like this -- if you
want to output something in the DOM, you should use the tools provided to you by
Angular, like string interpolation and directives.

# Intro to Content Projection
[Angular University Article](https://blog.angular-university.io/angular-ng-content/)

In our server example, we have a parent component that stores a list of servers and
uses `*ngFor` to display them. We then have a child component that renders each
individual server:

```
<!--parent.component.html-->
<div class="row">
  <div class="col-xs-12">
    <app-server-element *ngFor="let element of serverElements" [element]="element"></app-server-element>
  </div>
</div>
```

```
<!--child.component.html-->
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <p>
      <strong *ngIf="element.type === 'server'" style="color: red;">{{ element.content }}</strong>
      <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
    </p>
  </div>
</div>
```

In order for this to work, we have to use property binding to pass the `element` information
down into the child component. This works fine in this case, but you can imagine
a case with a much more complex template that relies on multiple pieces of information.

Instead of binding to all of those properties in the parent component and rendering
them in the child component, we can instead "project" the content into the child
component from the parent using the `ng-content` element.

The same functionality above can be implemented in the following way, with property binding removed:

```
<!--parent.component.html-->
<div class="row">
  <div class="col-xs-12">
    <app-server-element *ngFor="let element of serverElements">
      <p>
        <strong *ngIf="element.type === 'server'" style="color: red;">{{ element.content }}</strong>
        <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
      </p> 
    </app-server-element>
  </div>
</div>
```
```
<!--child.component.html-->
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <ng-content></ng-content>
  </div>
</div>
```

Note that this is not the default behavior of Angular. By default, if you place ANY
content between the opening and closing diamond brackets of a custom element, it is
thrown away. If you want to use the content "inside" your custom element, you must
include a `ng-content` hook for it to be placed in.

