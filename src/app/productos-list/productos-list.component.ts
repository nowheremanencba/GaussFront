import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/models/Producto.model';
import { ProductoService } from '../services/producto.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {

  productos: Producto[];
  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.productoService.getProductos().subscribe((resp: any) => { 
      this.productos = resp;
      console.log(  resp);
    });
  }

  delete(productoId) { 
    Swal.fire({
      title: '¿Esta seguro de eliminar este Producto?',
      text: 'No va a ser posible de revertir esta accion',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText:'Confirmar',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.productoService.deleteProductos(productoId).subscribe((data) => {
          this.loadProductos();
          Swal.fire(
            'Eliminado!',
            'Tu producto ha sido eliminado',
            'success'
          )
        }); 
      }
    });
  }

}
