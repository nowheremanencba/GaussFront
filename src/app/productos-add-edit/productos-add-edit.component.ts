import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Producto } from 'src/models/Producto.model';
import { ProductoService } from '../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from '../services/marca.service';
import { Marca } from '../../models/Marca.model';
import { PrecioCostoValidator } from '../validators/preciocosto.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-add-edit',
  templateUrl: './productos-add-edit.component.html',
  styleUrls: ['./productos-add-edit.component.css']
})
export class ProductosAddEditComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  actionType: string;
  productoId: number;
  errorMessage: any;
  existingProducto: Producto;
  marcas: Marca;
  constructor(private productoService: ProductoService,
              private marcaService: MarcaService,
              private formBuilder: FormBuilder,
              private avRoute: ActivatedRoute,
              private router: Router) {
  
  const idParam = 'id';
  this.actionType = 'Agregar';

  if (this.avRoute.snapshot.params[idParam]) {
    this.productoId = this.avRoute.snapshot.params[idParam];
   }
 /*##################### agregar/editar Form #####################*/
  this.form = this.formBuilder.group(
    {
      Id: 0,
      Nombre: ['', [Validators.required]],
      Costo: ['', [Validators.required]], 
      Precio: ['', [Validators.required, this.comparePrecioCosto]],
      marcaSelected: ['', [Validators.required]]
    }
  )
}

ngOnInit() {
  /*##################### cargar las marcas #####################*/
  this.marcaService.getMarcas()
  .subscribe( (x: any) => {
     this.marcas = x;
  });
  /*##################### cargar producto para editar #####################*/
  if (this.productoId > 0) {
    this.actionType = 'Editar';
    this.productoService.getProducto(this.productoId)
      .subscribe(data => (
        this.existingProducto = data,
        this.form.setValue({
          Id: data.id ,
          Nombre: data.nombre,
          Costo: data.costo,
          Precio: data.precio,
          marcaSelected: data.marcaID
        })
      ));
  }
}

 // acceseder a form fields
 get f() { return this.form.controls; }

// Grabar producto
save() {

  this.submitted = true; 
  if (!this.form.valid) {
    return;
  } 
  const producto: Producto = {
    id : this.form.controls.Id.value,
    nombre: this.form.controls.Nombre.value,
    costo: this.form.controls.Costo.value,
    precio: this.form.controls.Precio.value,
    marcaID: this.form.controls.marcaSelected.value
  };

/*##################### Agregar #####################*/
  if (this.actionType === 'Agregar') {

    this.productoService.saveProduct(producto)
      .subscribe((data) => {
        Swal.fire(
          'Agregado!',
          'El producto ha sido agregado correctamente',
          'success'
        ).then( function() {
          location.href = '/';
      });
      });
  }

/*##################### Editar #####################*/
  if (this.actionType === 'Editar') { 
    this.productoService.updateProducto(this.existingProducto.id, producto)
      .subscribe((data) => {
        Swal.fire(
          'Editado!',
          'El producto ha sido editado correctamente',
          'success'
        )
      });
  }
}

// Volver atras
  cancel() {
    this.router.navigate(['/']);
  }

// validarPrecioCosto 
comparePrecioCosto(control: FormControl) {
  if (!control || !control.parent) {
    return null;
  }
  if (control.value < control.parent.get('Costo').value) {
    return {'precioCosto': true}
  }
  return null;
}
}
