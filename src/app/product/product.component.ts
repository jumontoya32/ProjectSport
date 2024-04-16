import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductModel } from './product.model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  formValue!: FormGroup;
  productModelObj: ProductModel = new ProductModel();
  productData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.getProducts();
    this.formValue = this.formBuilder.group({
      nameProduct: [''],
      description: [''],
      typeProduct: [''],
    });
    this.getAllProducts();
  }

  clickAddProduct() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postProductDetails() {
    this.productModelObj.nameProduct = this.formValue.value.nameProduct;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.typeProduct = this.formValue.value.typeProduct;

    this.api.postProduct(this.productModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Producto agregado correctamente');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllProducts();
      },
      (err) => {
        alert('Algo salio mal');
      }
    );
  }
  getAllProducts() {
    this.api.getProduct().subscribe((res) => {
      this.productData = res;
    });
  }
  // Función para capitalizar una cadena
  capitalize(text: string): string {
    if (!text) {
      return '';
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  deleteProduct(row: any) {
    this.api.deleteProduct(row.id).subscribe((res) => {
      alert('Producto Eliminado');
      this.getAllProducts();
    });
  }
  editProduct(row: any) {
    this.showAdd= false;
    this.showUpdate= true;
    this.productModelObj.id = row.id;
    this.formValue.controls['nameProduct'].setValue(row.nameProduct);
    this.formValue.controls['description'].setValue(row.description);
    this.formValue.controls['typeProduct'].setValue(row.typeProduct);
  }

  updateProduct() {
    this.productModelObj.nameProduct = this.formValue.value.nameProduct;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.typeProduct = this.formValue.value.typeProduct;

    this.api
      .updateProduct(this.productModelObj, this.productModelObj.id)
      .subscribe((res) => {
        alert('Producto actualizado');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllProducts();
      });
  }
}
