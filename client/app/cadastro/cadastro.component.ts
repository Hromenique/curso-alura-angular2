import { Component, Input } from '@angular/core'
import { FotoComponent } from '../foto/foto.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from '../foto/foto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent {

    foto: FotoComponent = new FotoComponent();
    service: FotoService;
    meuForm: FormGroup;
    route: ActivatedRoute;
    mensagem: string = '';
    router: Router;

    constructor(service: FotoService, fb: FormBuilder, route: ActivatedRoute, router: Router) {
        this.service = service;

        this.meuForm = fb.group({
            titulo: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            url: ['', Validators.required],
            descricao: ['']
        });

        this.router = router;
        this.route = route;
        this.route.params.subscribe(param => {
            let id = param['id'];
            if (id) {
                this.service
                .buscaPorId(id)
                .subscribe(
                foto => this.foto = foto,
                error => console.log(error)
                );
            }
        });
    }

    cadastrar(event) {
        event.preventDefault();
        console.log(this.foto);

        this.service.cadastra(this.foto)
            .subscribe(res => {
                this.mensagem = res.mensagem;
                this.foto = new FotoComponent();
                if(!res.inclusao) this.router.navigate(['']);
            }, erro => {
                console.log(erro);
                this.mensagem = 'Não foi possível salvar a foto';
            });
    }

}