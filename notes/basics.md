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
  template: `<h3>Component Text</h3>`
})
```

Generally, you should avoid in-lining complicated templates or styles.
A good rule of thumb is that if they require more than 3 or 4 lines to write,
they should be in their own file.

Note: After registering the class as a Component, we use the ES6 `export`
keyword to export the class in order to import and use it in other files.

# Directives
Directives are instructions in the DOM. 
Components are one type of directive - they are a directive with a template. 
Directives can be selected in the same ways as components, but they usually use the
attribute style as opposed to the element style.

Directives are often prefixed with a `*`.
The `*` means they are structural directives - they change the structure of the DOM.
The other kind of directives are called attribute directives - they don’t add or
remove elements, they just alter the element they were placed on.

We can make custom directives, but some built-in directives are particularly useful. 

## Built-In Directives
`*ngIf` - Specifies conditional HTML code. 

If the code is not visible on the website, it isn’t just hidden - it’s not there at all.
When the condition is true, Angular adds it to the website,
and when the condition is false, Angular removes it.
This example will only display the text if the property `serverCreated` is true.
```
<p *ngIf="serverCreated"> Server was created, server name is {{ serverName }}</p>
```

`ngStyle` - Dynamically styles HTML elements.

This example will color the background green if the server is online and red if the
server is offline. We use property binding to correctly color the style, and `ngStyle`
takes a JS object as its input.
```
<!-- .html -->
<p [ngStyle]="{backgroundColor: getColor()}">Server is {{ getServerStatus() }}.</p>
```

```
// .ts
getColor() {return this.serverStatus === 'online' ? 'green' : 'red';}
```

`ngClass` - Dynamically adds or removes CSS classes, depending on a condition.

This example will apply the appropriate CSS classes.
```
<p [ngStyle]="getTextColor()"
   [ngClass]="{online: serverStatus === 'online', offline: serverStatus === 'offline'}">
  {{ 'Server ' }} with ID {{ serverID }} is {{ getServerStatus() }}</p>
```

```
.online {
  color: white;
}
.offline {
  font-size: 200%;
  color: white;
}
```

`*ngFor` - Adds HTML code by iterating over a container.

This is mostly used when displaying lists.
This example displays whatever code the selector `app-server` has in its template
for every server in the `servers` array in `servers.component.ts`.
This allows us to display a list of servers concisely in one line of HTML code.

```
<app-server *ngFor="let server of servers"></app-server>
```

If you have an array like ```[1, 2, 3, ... ]``` and you want to display them,
you can use the let variable that is declared, along with string interpolation,
to output it directly.

```
<div *ngFor="let item of array_of_items">{{ item }}</div>
```

You can combine `*ngFor` with `ngClass` and `ngStyle` as well.
If you want to style the 5th and greater items with a blue background and white text,
you can do it using this syntax:

```
<div
  *ngFor="let item of array_of_items"
  [ngStyle]="{backgroundColor: item >= 5 ? 'blue' : 'transparent'}"
  [ngClass]="{whiteText: item >= 5}"
>{{ item }}</div>
```

What if you want to do this, but your array is not conveniently storing the
number of each item? `*ngFor` has a built in index variable:

```
<div *ngFor="let item of array_of_items; let i = index"
   [ngStyle]="{backgroundColor: index >= 4 ? 'blue' : 'transparent'}"
   [ngClass]="{whiteText: index >= 4}"
>{{ item }}</div>
```

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
      <div class="panel-heading">{{ element.name }}</div>
      <div class="panel-body">
        <p>
          <strong *ngIf="element.type === 'server'" style="color: red;">{{ element.content }}</strong>
          <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
        </p>
      </div>
    </app-server-element>
  </div>
</div>
```
```
<!--child.component.html-->
<div class="panel panel-default">
  <ng-content></ng-content>
</div>
```

Note that this is not the default behavior of Angular. By default, if you place ANY
content between the opening and closing diamond brackets of a custom element, it is
thrown away. If you want to use the content "inside" your custom element, you must
provide a hook by including the `ng-content` tag inside the custom child element.

# The Component Lifecycle
When you create a new component using the CLI, it automatically generates an `ngOnInit()` method.
What is this method responsible for?

```
import { Component, OnInit } from ‘@angular/core’;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }
  
  ngOnInit() { }

}
```

`OnInit` is a lifecycle hook. All lifecycle hooks have their own interface that you should implement
if you decide to use them for a particular component.

Whenever a new component is instantiated, Angular goes through a number of phases, giving us a chance
to execute code at particular times during the instantiation.

1. `ngOnChanges` - Executed multiple times; upon creation, and whenever bound input properties, i.e.
properties with the `@Input()` decorator, change and receive new values.
2. `ngOnInit` - Executed when the component is initialized. This doesn't mean we can see the component
in the view, but we can access properties and initialize them once this method finishes -- the "object" was created. Note that
`ngOnInit` runs after the constructor is finished, and after the first execution of `ngOnChanges`. 
Consider why it might be necessary to have an additional "initialization" method on a component.
For more information, [click here.](https://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit)
3. `ngDoCheck` - Executes whenever change detection runs, i.e. a lot! "Change detection" is the system by
which Angular determines if something changed inside the component (based on certain triggers, such as
an observable being resolved or a button being clicked), so that it should update the
template accordingly. This happens whether or not anything changed -- for example, you could click a 
button that does nothing, and `ngDoCheck` would still fire. It has to fire, because what if something changed?
It has no way of knowing, and as such ends up being spammed a lot. This sounds horribly inefficient, but
it's actually fairly well optimized.
4. `ngAfterContentInit` - This lifecycle hook relates to the content projection we just discussed. This
is fired whenever the content we defined in our parent component is passed into the child component and
replaces the `<ng-content></ng-content>` tags and becomes viewable.
5. `ngAfterContentChecked` - This is called whenever change detection checks our projected content.
6. `ngAfterViewInit` - Called after the component's view (and all of its child views!) have been initialized
and rendered to the screen. Now all of the template content is filled and viewable.
7. `ngAfterViewChecked` - Similarly to `ngAfterContentChecked`, this hook is called every time the view
and all of the child views have been checked by change detection.
8. `ngOnDestroy` - Called whenever a component is deleted, for example if you used `*ngIf` and the condition
is suddenly set to false after being true. This is a good place to do clean-up, like clearing subscriptions
to prevent memory leaks.

These are **a lot** of hooks, and it is easy to feel overwhelmed. In practice, we mostly just use
`ngOnInit` for calling component methods on initialization and `ngOnDestroy` for clearing subscriptions.
In more rare cases, we use the other "onInit" methods, but the remaining hooks are
reserved for more advanced use-cases.

Some important footnotes to remember:
- `ngDoCheck` is a great place to "tell" Angular about something it couldn't recognize by itself during change detection.
Changing something manually is a rare use-case, but is worth remembering if it is necessary.
You should avoid running expensive code here though, because as mentioned above `ngDoCheck` gets called **a lot**.
- `ngOnChanges` is the only method that takes a parameter, a `SimpleChanges` object (also from @angular/core).
This object contains useful metadata about the changes that were made, like the current value, previous value,
whether this is the first change, etc.
- `ngAfterViewInit` marks the point where you can access content on your template, for example using a
`@ViewChild()` element reference. Before this point, all attempts to access content will return as empty.

# Another Decorator - @ContentChild()
The final important decorator (for components at least!) is `@ContentChild()`. This has the same functionality
as `@ViewChild()`, but allows us to get the content of an `<ng-content>` tag instead. Also, similarly to
`ngAfterViewInit`, this content is only accessible after `ngAfterContentInit` has been called.

Its usage is very similar:
```
<!--parent.component.html-->
<div class="row">
  <div class="col-xs-12">
    <app-server-element *ngFor="let element of serverElements">
      <div class="panel-heading">{{ element.name }}</div>
      <div class="panel-body">
        <p #contentParagraph>
          <strong *ngIf="element.type === 'server'" style="color: red;">{{ element.content }}</strong>
          <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
        </p>
      </div>
    </app-server-element>
  </div>
</div>
```
```
<!--child.component.html-->
<div class="panel panel-default">
  <ng-content></ng-content>
</div>
```
```
import { Component, ElementRef, ContentChild } from '@angular/core';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @ContentChild('contentParagraph') paragraph: ElementRef;
}
```

The purpose is the same: getting access to elements of a particular template. However, now we must
define the local reference in the parent's template, where the content projection is defined, instead
of in the child component's template.
