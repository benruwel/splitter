import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
})
export class FormFieldComponent implements OnInit {
  @Input() fieldType!: string;
  @Input() fieldId!: string;
  @Input() controlName!: string;
  @Input() form!: FormGroup;
  @Input() isFieldInvalid: boolean | undefined;

  constructor() {}

  ngOnInit(): void {}
}
