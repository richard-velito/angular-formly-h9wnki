import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form: FormGroup;
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'inputOutside1',
      type: 'input',
      templateOptions: {
        label: 'Input outside 1 ( if length > 3 = hide repeat )',
      },
    },
    {
      key: 'inputOutside2',
      type: 'input',
      templateOptions: {
        label: 'Input outside 2 ( if length > 3 = required input inside 2 )',
      },
    },
    {
      key: 'repeatParent',
      type: 'repeat',
      fieldArray: {
        fieldGroup: [
          {
            key: 'inputInside1',
            type: 'input',
            templateOptions: {
              label: 'Input inside 1',
            },
            expressionProperties: {
              //'templateOptions.demo':
              //  "console.log ('[DEBUG] inputInside1', field)",
            },
          },
          {
            key: 'inputInside2',
            type: 'input',
            templateOptions: {
              label: 'Input inside 2',
            },
            expressionProperties: {
              'templateOptions.demo':
                "console.log ('[DEBUG] inputInside2', JSON.stringify(field?.templateOptions?.required))",
              'templateOptions.required':
                '(formState?.model?.inputOutside2?.length > 3)',
            },
          },
        ],
      },
      templateOptions: {
        initialModel: {},
      },
      hideExpression:
        '(formState?.model?.inputOutside1?.length > 3) && (!formState.sectionHasRequiredFields(field, formState))',
    },
  ];
  options = {
    formState: {
      model: this.model,
      fields: this.fields,
      sectionHasRequiredFields: sectionHasRequiredFields,
    },
  };

  constructor(fb: FormBuilder) {
    this.form = fb.group({});
  }
}

export function sectionHasRequiredFields(
  field: FormlyFieldConfig,
  formState: any
): boolean {
  console.log(
    '[DEBUG] sectionHasRequiredFields',
    field
    // JSON.stringify(formState)
  );

  return existsRequired(field, 0);
}

export function existsRequired(
  field: FormlyFieldConfig,
  level: number
): boolean {
  console.log(
    '[DEBUG] existsRequired',
    field.key,
    field.id,
    // (field as any)._expressionProperties,
    JSON.stringify(field?.templateOptions)
  );

  if (level > 10 || !field) return false;

  let response = false;

  if ((field.templateOptions || {}).required) {
    return true;
  }

  if (field.fieldGroup && field.fieldGroup.length > 0) {
    for (const item of field.fieldGroup) {
      response = existsRequired(item, level + 1);
      if (response) {
        break;
      }
    }
  } else if (
    field.fieldArray &&
    field.fieldArray.fieldGroup &&
    Array.isArray(field.fieldArray.fieldGroup)
  ) {
    for (const item of field.fieldArray.fieldGroup) {
      response = existsRequired(item, level + 1);
      if (response) {
        break;
      }
    }
  }

  return response;
}
