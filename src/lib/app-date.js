export class AppDate extends Date {

  constructor(date){
    if(!date) { super() }
    else super(date);
  }

  toMYSQLDatetime() {
    return this.toISOString().substring(0, 19).replace('T', '')
  }
}