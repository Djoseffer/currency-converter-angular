import {Component, OnInit, ViewChild} from '@angular/core';
import {ConversorService, MoedaService} from "../services";
import {Conversao, ConversaoResponse, Moeda} from "../models";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

  moedas: Moeda[] = [];
  conversao: Conversao = new Conversao('USD', 'BRL');
  possuiErro: boolean = false;
  conversaoResponse: ConversaoResponse = {} as ConversaoResponse;
  @ViewChild("conversaoForm", { static: true }) conversaoForm!: NgForm;


  constructor(
    private moedaService: MoedaService,
    private conversorService: ConversorService
  ) { }

  ngOnInit(): void {
    this.moedas = this.moedaService.listarTodas();
    this.init();
  }
  init(): void {
    this.conversao = new Conversao('USD', 'BRL')
    this.possuiErro = false;
  }

  converter(): void {
    if (this.conversaoForm.form.valid) {
      this.conversorService
        .converter(this.conversao)
        .subscribe(
          response => {
            this.conversaoResponse = response;
            console.log(this.conversaoResponse);
          },
          error => this.possuiErro = true
        );
    }
  }
}
