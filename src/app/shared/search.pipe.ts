import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], term: string): any[] {

    if (!products) return [];
    if (!term || term.trim() === '') {
      return products;
    }

    return products.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
