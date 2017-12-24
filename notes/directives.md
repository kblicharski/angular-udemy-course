# Directives?
Some recap: we have **attribute** directives and **structural** directives.

## Attribute Directives
These are named this way because they "sit on" elements, just like attributes do.
After being defined, you simply add them like so:
```
<element-name attributeDirective />
```
They modify the *behavior* of the element they sit on, by changing their properties.

### Review of ngClass and ngStyle
Here is the syntax for using these two common attribute directives:

#### ngClass
Array of classes:
`<div [ngClass]="['style1', 'style2']"></div>`

String of classes:
`<div [ngClass]="'style1 style2'"></div>`

Object of conditional classes:
`<div [ngClass]="{'style1': true, 'style2': true}"></div>`

The conditional variant is the most common, and most useful variant, allowing
us to dynamically select classes in our .css file based on boolean flags.

#### ngStyle
In-lining styles:
`[ngStyle]="{'color': 'white', 'font-size': '17px'}"`

`ngStyle` is useful because instead of applying styles one by one:
```
<div [ngStyle]="currentStyles">
   The phone number you entered does not match the expected format 
</div>
```

We can do them many at a time (in our component code):
```
this.currentStyles = {     
       'font-style':  this.canSave  ? 'italic' : 'normal',  
       'color':       this.hasError ? 'red'    : 'black',     
       'font-size':   this.hasError ? '24px'   : '12px'   
};
```

## Structural Directives
These actually change the structure and content of the DOM. All structural
directives are denoted by the ```*``` symbol preceding their names. 

It is worth noting that you CANNOT have two structural directives on the same
HTML element. For example, if you wanted to display some ```*ngFor``` list by
using a boolean value and a ```*ngIf``` directive, you would have to wrap the
list in a div and place the `*ngIf` on the div.

# Defining Custom Directives
This is the main point of directives -- they can package complex behaviors into
just adding a directive name to an element. For example, consider a directive that
highlights the color of an element yellow when you mouse over it. Once defined,
this directive can be applied to any component we want -- a button, list item, etc.

The basic structure of a directive is as follows:

```
import { Directive } from '@angular/core';

@Directive({
  selector: '[appDirectiveName]'
})
export class DirectiveName {

  constructor() { }

}
```

Essentially, recall that directives are just components without templates. They
are components with only behavior and not a view.

Consider an even more basic directive that just sets the background color of
a component to green. It could be implemented as follows:
```
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }

}
```

And the usage in our template:
```
<p appBasicHighlight>This text will be green.</p>
```

We inject a reference to the element that the directive sits on -- the `ElementRef` --
and then directly modify its value. However, recall that this is not a good practice.
We do not want to manually change DOM elements. It is crude, and in some advanced
use-cases where we do not have a DOM, like when we are not running in the browser
(using service workers), it will fail.

Instead, we should inject the `Renderer2` object.

```
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'blue'
    );
  }

}
```

The `Renderer2` object provides some utility methods; in this case, `setStyle`
takes several arguments: the element we are modifying, the style we are modifying,
and the value we are setting to the style.

The usage in our template:
```
<p appBetterHighlight>This text will be blue.</p>
```

In most cases, the first approach will work fine. However, it is better practice
to get access to the DOM through the `Renderer2`, using it as a wrapper to prevent
us from running into complex errors later on. It also includes many more
useful functions than just `setStyle`.

# Listening to Host Events with HostListener
The previous two examples were not dynamic, defeating the purpose of creating a
highlight directive. In order to make them responsive, we need to react to a 
mouse event occurring on the element that the directive is applied to.

`@HostListener()` is another decorator, but this time it sits on a method.
It takes a string argument which is the native DOM event supported by the element
that we apply the directive to. In this case, we are targeting `'mouseenter'` and
`'mouseleave'`.

```
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEvenBetterHighlight]'
})
export class EvenBetterHighlightDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  mouseEnter(eventData: Event) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'blue'
    );
  }

  @HostListener('mouseleave')
  mouseLeave(eventData: Event) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'transparent'
    );
  }

}
```

This will work as expected -- when we hover over a component, it will be highlighted blue.

# Listening to Host Properties with HostBinding
The above approach is fine, but we can cut out a lot of the code and make it more
intuitive by using the `@HostBinding()` property:

```
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBestHighlight]'
})
export class BestHighlightDirective {
  @HostBinding('style.backgroundColor') highlightColor = 'transparent';

  @HostListener('mouseenter')
  mouseEnter(eventData: Event) {
    this.highlightColor = 'blue';
  }

  @HostListener('mouseleave')
  mouseLeave(eventData: Event) {
    this.highlightColor = 'transparent';
  }

}
```

We are directly binding to the element's `style.backgroundColor` and can then
change this value as we wish within the code.

# Binding to Directive Properties
What if we want to dynamically choose what color highlight we want when we
apply the directive on an element? The user should be able to modify the color
upon use, instead of having to change the directive code directly. This makes our
directives much more reusable and extensible.

How do we do this? Well, we already know. Remember that directives are just components
without templates. There's no reason we can't use the `@Input()` decorator we already learned.

```
import {
  Directive, HostBinding, HostListener, Input,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appReusableHighlight]'
})
export class ReusableHighlightDirective implements OnInit {
  @Input() defaultColor = 'transparent';
  @Input() highlightColor = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter')
  mouseEnter(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave')
  mouseLeave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }

}
```

And then, when we use the directive:
```
<p 
  appReusableHighlight 
  [defaultColor]="'yellow'"
  [highlightColor]="'red'"
>Highlightable text.</p>
```

How does Angular know that we want to bind to the property `defaultColor` of
our directive, and not the property of the element our directive sits on?

The simple answer is, it just checks the element and all of its directives to
figure out what should be assigned where.

## Binding to Single Properties of a Directive
What about directives like `ngClass` and `ngStyle`? If you recall, when we used
these directives, we didn't bind to their properties in this way. Instead, all
we did was bind to the directive name itself -- e.g. `[ngClass]`.

How is this behavior accomplished?
This is where setting the alias on the `@Input()` decorator can be useful -- it
can simplify the syntax needed to use your directive. We can modify the above
directive in the following way:

```
import {
  Directive, HostBinding, HostListener, Input,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appReusableHighlight]'
})
export class ReusableHighlightDirective implements OnInit {
  @Input() defaultColor = 'transparent';
  @Input('appReusableHighlight) highlightColor = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter')
  mouseEnter(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave')
  mouseLeave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }

}
```
```
<p 
  [appReusableHighlight]="'red'"
  [defaultColor]="'yellow'"
>Highlightable text.</p>
```

This will accomplish the same thing.

Important Note: You might have noticed that, for the above bindings, we enclosed
an actual string value (in single quotes) inside the double quotes used for binding
the property.

If we're using a string value, there is a shorthand to remove this redundancy.
We can change the above usage as follows:
```
<p 
  [appReusableHighlight]="'red'"
  defaultColor="yellow"
>Highlightable text.</p>
```

This is an option, but you should avoid confusing regular HTML properties with
custom defined Angular properties when using this syntax. For this reason,
it might be better to be consistently explicit and include the square brackets.

# More on Structural Directives
You might have wondered, when we include a structural directive, why do we need
to include the `*`? The reason is that it serves a special, important purpose.

The `*` is syntactical sugar that allows Angular to extract our structural directive
shorthand into its "true" form. Behind the scenes, structural directives are a lot uglier.

Here's a basic example.
```
<div *ngIf="someExpression">
  <p>Example of conditional content.</p>
</div>
```

What does this "actually" look like?
```
<ng-template [ngIf]="someExpression">
  <div>
    <p>Example of conditional content.</p>
  </div>
</ng-template>
```

These two are functionally equivalent. Because using a structural directive is
so common and important, Angular ships with this special shorthand.

# Custom Structural Directives
Now that we understand what structural directives are really doing, we can
make our own. This is a much more complicated use-case, but for a simple example,
let's make the opposite of `*ngIf` -- something that renders only if its expression
evaluates to false.

This is the code:
```
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngIfNot]'
})
export class NgIfNotDirective {
  @Input('ngIfNot')
  set condition(expression: boolean) {
    if (!expression) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

}
```

What is happening here? We simply get a reference to the `ng-template` our
structural directive "actually" sits on, and then add it to the view whenever
the passed expression is false.

We are using a TypeScript setter to allow this functionality whenever the condition
changes. Note that `condition` is still a property of `NgIfNotDirective`; the method
is just TypeScript shorthand because it is such a common pattern.

Now in order to use the new directive, it's as simple as before, with opposite behavior:
```
<div *ngIfNot="someExpression">
  <p>Example of conditional content.</p>
</div>
```

# ngSwitch
If you have a single bound property, and want to display different content based
on the value of that property, e.g. error messages, then `ngSwitch` is a more elegant
solution than having multiple `*ngIf` statements.

```
<div [ngSwitch]="value">
  <p *ngSwitchCase="1">Case 1</p>
  <p *ngSwitchCase="2">Case 2</p>
  <p *ngSwitchCase="3">Case 3</p>
  <p *ngSwitchCase="4">Case 4</p>
  <p *ngSwitchDefault>The default switch case.</p>
</div>
```