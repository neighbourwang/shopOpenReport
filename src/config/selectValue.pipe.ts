import { Pipe, PipeTransform } from '@angular/core';
import { ModuleConfigService } from './moduleConfigService'
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'selectValuePipe'})
export class SelectValuePipe implements PipeTransform {
  transform(id: string): Array<string> {
    let length=ModuleConfigService.length;
    let value=ModuleConfigService[length]['selectedValue'].filter(element => element.id==id)[0];
    return value.list;
  }
}