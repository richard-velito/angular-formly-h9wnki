import { Component, Input } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'my-input-field',
  template: `
    <div>
      {{to?.label}}
      {{to?.required}}
      <input
        fd-form-control
        [formControl]="formControl"
        [type]="text">
    </div>
  `,
})
export class InputFieldComponent extends FieldType {}
