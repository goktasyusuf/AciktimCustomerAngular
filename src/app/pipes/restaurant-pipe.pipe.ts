import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order/order';

@Pipe({
  name: 'restaurantPipe'
})
export class RestaurantPipePipe implements PipeTransform {

  transform(value: Order[], text: string): Order[] {
    return text ? value.filter(x => x.restaurantName.toLowerCase().indexOf(text.toLowerCase()) !== -1) : value
  }

}
