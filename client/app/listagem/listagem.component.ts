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
    mensagem: String = '';

    constructor(service: FotoService) {
        this.service = service;
        service.lista()
            .subscribe(
            fotos => this.fotos = fotos,
            erro => console.log(erro)
            );
    }

    remove(foto: FotoComponent): void {
        this.service
        .remove(foto)
        .subscribe(
            () => {
                //mudar a referência para this.fotos para desencadear a detecção de mudança na view               
                let novasFotos = this.fotos.slice(0);
                let indice = novasFotos.indexOf(foto);
                novasFotos.splice(indice, 1);
                this.fotos = novasFotos;
                this.mensagem = 'Foto removida com sucesso';
            },
            erro => {
                console.log(erro);
                this.mensagem = 'Não foi possível remover a foto';
            }
        );

    }
}