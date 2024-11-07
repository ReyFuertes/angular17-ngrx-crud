import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductEffects } from './store/product.effect';
import { ProductReducer } from './store/product.reducer';

const routes: Routes = [
  {
    path: '',
    component: ProductPageComponent,
    children: [
      { path: '', component: ProductListComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ProductPageComponent,
    ProductListComponent
  ],
  imports: [
    HttpClientModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('product', ProductReducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
  exports: [],
  providers: [ConfirmationService],
})
export class ProductModule { }