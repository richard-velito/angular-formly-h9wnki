import { Component, Input } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'my-repeat',
  template: `
      <br />
      <ng-container *ngFor="let fieldItem of field.fieldGroup; let i = index;">
        <div *ngIf="!fieldItem.hide">
          <formly-field [field]="fieldItem"></formly-field>
        </div>
      </ng-container>
      <button (click)="add()">+</button>
  `,
})
export class RepeatFieldComponent extends FieldArrayType {
  // Override
  add(i?: number, initialModel?: any): void {
    super.add(i, this.to.initialModel);
  }
}
