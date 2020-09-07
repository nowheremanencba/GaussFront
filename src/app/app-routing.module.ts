import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { ProductosListComponent } from './productos-list/productos-list.component';
import { ProductosAddEditComponent } from './productos-add-edit/productos-add-edit.component';

const routes: Routes = [
  { path: '' , component: ProductosListComponent, pathMatch: 'full'},
  { path:'add', component: ProductosAddEditComponent},
  { path:'productos/edit/:id', component: ProductosAddEditComponent},
  { path: '**', redirectTo: '/'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
