import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct, StateType } from '../../product.model';
import { select, Store } from '@ngrx/store';
import { ProductState } from '../../store/product.reducer';
import { getProductById, getProductsSelector } from '../../store/product.selector';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { deleteProductAction, updateProductAction, updateProductSuccessAction } from '../../store/product.action';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild("cd") public cd: ConfirmDialog;

  public form: FormGroup;
  public $unsubscribe = new Subject<void>();
  public products: IProduct[] = [];
  public selectedProduct: IProduct | undefined;
  public showProductDialog: boolean = false;
  public state: StateType = StateType.add;

  constructor(private store: Store<ProductState>, private fb: FormBuilder, private confirmationService: ConfirmationService) {
    this.form = this.fb.group({
      id: new FormControl(undefined, Validators.required),
      name: new FormControl(undefined, Validators.required),
      description: new FormControl(undefined),
      price: new FormControl(undefined),
    });

    this.store.pipe(select(getProductsSelector))
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe((products) => this.products = products as IProduct[])
  }

  ngOnInit(): void { }

  public onDelete(product: IProduct): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.store.dispatch(deleteProductAction({ payload: product }))
      },
      reject: () => {
        this.cd.reject();
      }
    });
  }

  public onUpdate(): void {
    if (this.form.valid) {
      this.store.dispatch(updateProductAction({ payload: this.form.value }));
      this.showProductDialog = false;
    } else
      alert('invalid')
  }

  public onEdit(product: IProduct): void {
    this.showProductDialog = !this.showProductDialog;
    this.state = StateType.edit;
    this.store.pipe(select(getProductById(product.id)),
      takeUntil(this.$unsubscribe))
      .subscribe(product => {
        console.log(product)
        this.form.patchValue(product);
      });
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
