import { NgModule } from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {CadastroComponent} from './components/cadastro/cadastro.component';
import {ListaComponent} from './components/lista/lista.component';
import {EditarComponent} from './components/editar/editar.component';

const routes: Routes = [
      { path: 'carro', component: HomeComponent},
      { path: 'cadastrar', component: CadastroComponent},
      { path: 'listar', component: ListaComponent},
      { path: 'editar', component: EditarComponent},
      { path: '',   redirectTo: '/carro', pathMatch: 'full' },
      // { path: '**', component: PagenotfoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
