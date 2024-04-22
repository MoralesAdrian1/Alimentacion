import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlimentosComponent } from './components/alimentos/alimentos.component';
import { ConsumoComponent } from './components/consumo/consumo.component';

const routes: Routes = [
  {path: '',component:ConsumoComponent},
  {path:'alimentos',component:AlimentosComponent},
  {path: 'consumo',component:ConsumoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
