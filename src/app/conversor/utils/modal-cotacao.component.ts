import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConversorService} from "../services";
import {Conversao, ConversaoResponse} from "../models";

@Component({
  selector: 'modal-cotacao',
  templateUrl: './modal-cotacao.component.html',
  styleUrls: ['./modal-cotacao.component.css']
})
export class ModalCotacaoComponent implements OnInit {

  @Input() id: string | undefined;
  @Input() conversaoResponse!: ConversaoResponse;
  @Input() conversao: Conversao = new Conversao();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private conversorService: ConversorService) {
  }

  ngOnInit(): void {
  }

  novaConsulta() {
    this.onConfirm.emit()
  }

  get valorConvertido(): string {
    if (!this.conversaoResponse || !this.conversao.moedaPara) {
      return '0';
    }

    const rate = this.conversaoResponse[this.conversao.moedaDe + this.conversao.moedaPara]?.bid;
    if (!rate) {
      return '0';
    }

    return (this.conversao.valor * parseFloat(rate)).toFixed(2);
  }

  get cotacaoPara(): number {
    return this.conversorService.cotacaoPara(
      this.conversaoResponse, this.conversao
    )
  }

  get cotacaoDe(): string {
    return this.conversorService.cotacaoDe(
      this.conversaoResponse, this.conversao
    )
  }

  get dataCotacao(): string {
    return this.conversorService.dataCotacao(
      this.conversaoResponse
    )
  }
}
