import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BasicHighlightDirective } from './basic-highlight.directive';
import { BestHighlightDirective } from './best-highlight.directive';
import { BetterHighlightDirective } from './better-highlight.directive';
import { EvenBetterHighlightDirective } from './even-better-highlight.directive';
import { DynamicHighlightDirective } from './dynamic-highlight.directive';
import { ReusableHighlightDirective } from './reusable-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    EvenBetterHighlightDirective,
    BestHighlightDirective,
    DynamicHighlightDirective,
    ReusableHighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
