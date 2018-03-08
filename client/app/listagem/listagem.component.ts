import { Component } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FotoService } from '../foto/foto.service';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent {

    fotos: FotoComponent[] = [];
    service: FotoService;

    constructor(service: FotoService) {
        this.service = service;
        service.lista()
            .subscribe(
            fotos => this.fotos = fotos,
            erro => console.log(erro)
            );
    }

    remove(foto: FotoComponent): void {
        this.service.remove(foto).subscribe(
            fotos => {
                let indiceDaFoto = this.fotos.indexOf(foto);
                this.fotos.slice(indiceDaFoto, 1);
                console.log('Foto removida com sucesso');
            },
            erro => console.log(erro)
        );

    }
}