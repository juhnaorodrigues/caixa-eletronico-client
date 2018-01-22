export class OpcaoSaqueModel {

  constructor(
    public quantidade100:number,
    public quantidade50:number,
    public quantidade20:number,
    public quantidade10:number,
    public opcaoValida:boolean
  ) {}

  public toString = (): string => {
    let text: string = '';

    if ( this.quantidade100 > 0) {
      text+= '(' + this.quantidade100 + ') 100R$ + ';
    }

    if ( this.quantidade50 > 0) {
      text+= '(' + this.quantidade50 + ') 50R$ + ';

    }

    if ( this.quantidade20 > 0) {
      text+= '(' + this.quantidade20 + ') 20R$ + ';

    }

    if ( this.quantidade10 > 0) {
      text+= '(' + this.quantidade10 + ') 10R$ + ';

    }

    return text.substr(0, text.length-3);
  }

}
