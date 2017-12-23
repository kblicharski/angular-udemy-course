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
