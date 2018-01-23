import { RouterModule } from '@angular/router';
import { ListagemComponent } from './listagem/listagem.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { Routes } from '@angular/router/src/config';

const appRoutes: Routes = [
    { path: '', component: ListagemComponent },
    { path: 'cadastro', component: CadastroComponent }
];

export const routing = RouterModule.forRoot(appRoutes);