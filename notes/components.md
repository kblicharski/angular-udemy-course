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