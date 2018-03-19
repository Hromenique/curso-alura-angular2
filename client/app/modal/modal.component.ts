import { Component,  Input, Output, EventEmitter  } from "@angular/core";
import { ElementRef } from "@angular/core/src/linker/element_ref";

@Component({
    moduleId: module.id,
    selector: 'modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent{
    @Input() private titulo: string = 'Tem certeza?';
    @Input() private frase: string;
    @Output() confirma = new EventEmitter();

    constructor(private _element: ElementRef){
        this._element = _element;

        $(this._element.nativeElement).dialog({
            title: this.titulo,
            autoOpen: false,
            resizable: false,
            modal: true,
            buttons: {
                Cancelar: () =>{
                    $(this._element.nativeElement).dialog("close");
                },
                Confirmar: () => {
                    $(this._element.nativeElement).dialog("close");
                    this.confirma.emit();
                }
            }
        })
    }

    show(){
        $(this._element.nativeElement).dialog('open');
    }
}