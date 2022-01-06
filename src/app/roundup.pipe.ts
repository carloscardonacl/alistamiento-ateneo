import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundup'
})
export class RoundupPipe implements PipeTransform {

  transform(valor:number): any {
    for (let i = 0; i < 2; i++) {
      valor = Math.trunc(valor/10);
       }
       valor=valor+1;
       valor=valor*Math.pow(10,2);
    return valor;
  }
    
  
  
}
