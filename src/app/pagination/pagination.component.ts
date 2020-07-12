import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page: number;
  @Input() count: number;
  @Input() perPage: number;
  @Input() pagesToShow: number;
  @Input() loading: boolean;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }

  onNext(): void {
    this.goNext.emit()
  }

  onPage(pageNumber: number): void {
    this.goPage.emit(pageNumber);
  }

  totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }

  isLastPage(): boolean {
    return this.perPage * this.page >= this.count;
  }

  getMin(): number {
    return ((this.perPage * this.page) - this.perPage) + 1;  
  }

  getMax(): number {
    let max = this.perPage * this.page;
    if (max > this.count) {
      max = this.count;
    }
    return max;
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.count / this.perPage); // Say 10 pages
    const thisPage = this.page || 1; // Say page 1
    const pagesToShow = this.pagesToShow || 9; // Say max 10 pages to show
    const pages: number[] = []; // Setup new empty array
    pages.push(thisPage); // Push page 1 into array

    console.log("Starting loop with: total pages: ", totalPages, "thisPage: ", thisPage, "pagesToShow: ", pagesToShow);
    // Loop from zero to length of pages to show
    for (let i = 0; i < pagesToShow - 1; i++) {
      console.log("pages[]: ", pages);

      if (pages.length < pagesToShow) {
        // Check minimum value of pages array is greater than 1
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
          console.log("Pushing ", Math.min.apply(null, pages) - 1, "onto array");
        }
      }

      if (pages.length < pagesToShow) {
        // Check maxmimum value of pages array is less than total pages
        if (Math.max.apply(null, pages) < totalPages) {
          pages.push(Math.max.apply(null, pages) + 1);
          console.log("Pushing ", Math.max.apply(null, pages) + 1, "onto array")
        }
      }
    }

    pages.sort((a, b) => a - b);
    return pages;
  }
}
