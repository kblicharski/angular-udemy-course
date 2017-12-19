# Directives
Directives are instructions in the DOM. Components are one type of directive - they are a directive with a template. Directives can be selected in the same ways as components, but they usually use the attribute style as opposed to the element style.
Directives are often prefixed with a *. The * means they are structural directives - they change the structure of the DOM. The other kind of directives are called attribute directives - they don’t add or remove elements, they just alter the element they were placed on. 

We can make custom directives, but some built-in directives are particularly useful. 

## Built-In Directives
*ngIf - Allows us to have conditional HTML code. If the code is not visible on the website, it isn’t just hidden - it’s not there at all. When the condition is true, Angular adds it to the website, and when the condition is false, Angular removes it.
This example will only display the text if the property serverCreated is true. 
<p *ngIf="serverCreated"> Server was created, server name is {{ serverName }}</p>

ngStyle - Allows us to style HTML elements. This is useful because it updates dynamically - in this example, if a server goes offline, its color will change as long as the code is working.
This example will color the background green if the server is online and red if the server is offline. We use property binding to correctly color the style, and ngStyle takes a JS object as its input.

<!-- .html -->
<p [ngStyle]="{backgroundColor: getColor()}">Server is {{ getServerStatus() }}</p>

// .ts
getColor() {return this.serverStatus === 'online' ? 'green' : 'red';}

ngClass - Allows us to dynamically add or remove CSS classes depending on a condition.
This example will apply the appropriate CSS classes.
<p [ngStyle]="getTextColor()"
   [ngClass]="{online: serverStatus === 'online', offline: serverStatus === 'offline'}">
  {{ 'Server ' }} with ID {{ serverID }} is {{ getServerStatus() }}</p>

.online {
  color: white;
}
.offline {
  font-size: 200%;
  color: white;
}



*ngFor - Allows us to add HTML code by iterating over a container, making it easy to display lists.
This example displays whatever code the selector app-server has in its template for every server in the servers array in servers.component.ts. This could be to display a list of servers concisely in one line of HTML code.
<app-server *ngFor="let server of servers"></app-server>

If you have an array like [1, 2, 3, ... ] and you want to display them, you can use the let variable that is declared, along with string interpolation, to output it directly.
<div *ngFor="let item of array_of_items">{{ item }}</div>

You can combine *ngFor with ngClass and ngStyle as well. If you want to style the 5th and greater items with a blue background and white text, you can do it using this syntax:
<div
  *ngFor="let item of array_of_items"
  [ngStyle]="{backgroundColor: item >= 5 ? 'blue' : 'transparent'}"
  [ngClass]="{whiteText: item >= 5}"
>{{ item }}</div>

What if you want to do this, but your array is not conveniently storing the number of each item? *ngFor has a built in index variable:
<div *ngFor="let item of array_of_items; let i = index"
   [ngStyle]="{backgroundColor: index >= 4 ? 'blue' : 'transparent'}"
   [ngClass]="{whiteText: index >= 4}"
>{{ item }}</div>
