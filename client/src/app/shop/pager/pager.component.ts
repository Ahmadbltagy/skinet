import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
})
export class PagerComponent {
  @Input() pageSize;
  @Input() totalCount;
  @Output() pageChanged = new EventEmitter<number>();

  onPageChange(pageIndex) {
    this.pageChanged.emit(pageIndex);
  }
}
