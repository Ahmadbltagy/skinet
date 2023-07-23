import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

const materialComponents = [MatPaginatorModule];

@NgModule({
  declarations: [],
  imports: [materialComponents],
  exports: [materialComponents],
})
export class SharedModule {}
