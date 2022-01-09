import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  results$!: Observable<SplitterResults | null>;

  splitterForm: FormGroup = this.fb.group({
    bill: [0, [Validators.required, Validators.min(1)]],
    people: [0, [Validators.required, Validators.min(1)]],
    tipPct: [null, [Validators.min(1), Validators.max(100)]],
    customTipPct: [null],
  });

  tipPercentages: TipPercentagesView[] = [
    {
      displayString: '5%',
      selected: false,
      percent: 5,
    },
    {
      displayString: '10%',
      selected: false,
      percent: 10,
    },
    {
      displayString: '15%',
      selected: false,
      percent: 15,
    },
    {
      displayString: '25%',
      selected: false,
      percent: 25,
    },
    {
      displayString: '50%',
      selected: false,
      percent: 50,
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.splitterForm
      .get('tipPct')
      ?.valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value > 0) {
          this.tipPercentages.forEach((item) => (item.selected = false));
          this.splitterForm.get('customTipPct')?.setValue(null);
        }
      });
    this.calculateSplit();
  }

  onTipPctSelected(index: number): void {
    this.tipPercentages.forEach((item) => (item.selected = false));
    this.tipPercentages[index].selected = true;
    this.splitterForm
      .get('customTipPct')
      ?.setValue(this.tipPercentages[index].percent);
    this.splitterForm.get('tipPct')?.setValue(null);
  }

  onReset(): void {
    this.tipPercentages.forEach((item) => (item.selected = false));
    this.splitterForm.setValue({
      bill: 0,
      people: 0,
      tipPct: null,
      customTipPct: null,
    });
  }

  isFieldInvalid(fieldName: string): boolean | undefined {
    const control = this.splitterForm.get(fieldName);
    return control?.touched && control?.invalid;
  }

  private calculateSplit(): void {
    this.results$ = this.splitterForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      map((res) => {
        const tipExists =
          (res && res.customTipPct && res.customTipPct > 0) ||
          (res && res.tipPct);
        if (res && res.bill > 0 && res.people > 0 && tipExists) {
          let tipPct: number = 0;
          const customTipExists = res.customTipPct && res.customTipPct > 0;
          if (customTipExists) {
            tipPct = res.customTipPct;
          } else {
            tipPct = res.tipPct;
          }
          const tipAmountPP = (res.bill * tipPct) / 100 / res.people;
          const totalPP = tipAmountPP + res.bill / res.people;
          return {
            totalPP,
            tipAmountPP,
          };
        } else {
          return null;
        }
      })
    );
  }
}

interface TipPercentagesView {
  selected: boolean;
  displayString: string;
  percent?: number;
}

interface SplitterResults {
  tipAmountPP: number;
  totalPP: number;
}
