import { Pipe, PipeTransform } from '@angular/core';
import { RestaurantMenu } from '../models/restaurant/restaurantMenu';

@Pipe({
  name: 'menuPipe'
})
export class MenuPipePipe implements PipeTransform {

  transform(value: RestaurantMenu[], filtered:string): RestaurantMenu[] {
    return filtered ? value.filter(x=>x.menuTitle.toLowerCase().indexOf(filtered.toLocaleLowerCase())!==-1): value 
  }

}
