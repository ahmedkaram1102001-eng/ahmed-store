import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-4">
      <input
        class="form-control"
        type="search"
        placeholder="Search products..."
        (input)="onInput($event)"
      />
    </div>
  `,
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search.emit(target.value);
  }
}
