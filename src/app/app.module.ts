import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';

import { AppComponent } from './app.component';
import { InputFieldComponent } from './input.component';
import { RepeatFieldComponent } from './repeat.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'input',
          component: InputFieldComponent,
        },
        {
          name: 'repeat',
          component: RepeatFieldComponent,
        },
      ],
      extras: {
        checkExpressionOn: 'modelChange',
      },
    }),
    FormsModule,
  ],
  declarations: [AppComponent, InputFieldComponent, RepeatFieldComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
