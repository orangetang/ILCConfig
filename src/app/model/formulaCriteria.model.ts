export class FormulaCriteriaModel {

  private _argument: string[] = [];
  private _operation: string;
  private _minimum: number;
  private _maximun: number;
  private _formulaCalculate: any;
  // private formula: {
  //   argument: string[],
  //   operation: string,
  //   minimum: number,
  //   maximum: number
  // }[] = [];

  get argument(): string[] {
    return this._argument;
  }

  returnElement(i) {
    return this._argument[i];
  }
  set argument(value: string[]) {
    this._argument = value;
  }

  addArugiment() {
    console.log('inside add argument formula  model');
    this._argument.push('');
    console.log(this._argument.length);
  }

  print() {
    console.log(this._argument);
    console.log(this._maximun);
    console.log(this._minimum);
    console.log(this._operation);
  }

  get operation(): string {
    return this._operation;
  }

  set operation(value: string) {
    this._operation = value;
  }

  get minimum(): number {
    return this._minimum;
  }

  set minimum(value: number) {
    this._minimum = value;
  }

  get maximun(): number {
    return this._maximun;
  }

  set maximun(value: number) {
    this._maximun = value;
  }

  get formulaCalculate(): any {
    const obj = {
      operation: this._operation,
      operation_type: 'formula',
      operation_args: this._argument,
      minimum: this._minimum,
      maximum: this._maximun
    };
    this._formulaCalculate = obj;
    return this._formulaCalculate;
  }

  set formulaCalculate(value: any) {
    this._formulaCalculate = value;
  }
}

