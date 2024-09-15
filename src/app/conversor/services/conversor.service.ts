import {Injectable} from '@angular/core';
import {Conversao, ConversaoResponse} from "../models";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  private readonly BASE_URL = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL";

  constructor(private http: HttpClient) {
  }

  converter(conversao: Conversao): Observable<ConversaoResponse> {
    return this.http
      .get<ConversaoResponse>(this.BASE_URL)
      .pipe(
        catchError(error => throwError(error))
      );
  }

  cotacaoPara(conversaoResponse: ConversaoResponse, conversao: Conversao): number {
    if (!conversaoResponse || !conversao.moedaPara) {
      return 0;
    }

    const rate = conversaoResponse[conversao.moedaDe + conversao.moedaPara]?.bid;
    return rate !== undefined ? parseFloat(rate) : 0;
  }

  cotacaoDe(conversaoResponse: ConversaoResponse, conversao: Conversao): string {
    if (!conversaoResponse || !conversao.moedaPara) {
      return '0';
    }

    const rate = conversaoResponse[conversao.moedaDe + conversao.moedaPara]?.bid;
    return rate !== undefined ? (1 / parseFloat(rate)).toFixed(4) : '0';
  }

  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (conversaoResponse === undefined) {
      return '';
    }
    return new Date().toISOString(); // Como a data não está disponível na resposta, você pode definir a data atual
  }
}
