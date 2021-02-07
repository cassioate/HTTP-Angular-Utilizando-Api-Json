import { Component, OnInit } from '@angular/core';
import { CidadeService } from './cidade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cidades = [];

  constructor(private service: CidadeService) { };

  ngOnInit() {
    this.consultar()
  }

  consultar() {
    this.service.consultar()
      .then(dados => {
        this.cidades = dados;
      })
  }

  adicionar(nome: string) {
    this.service.adicionar({ nome: nome })
      .then(cidade => {
        alert(`Cidade "${cidade.nome}" adicionada com código ${cidade.id}!`);
        this.consultar();
      });
  }

  excluir(id: number) {
    this.service.excluir(id).then(() => {
      alert('Cidade excluída com sucesso!');
      this.consultar();
    });
  }

  atualizar(cidade: any) {
    this.service.atualizar(cidade)
      .then(c => {
        alert(`Cidade "${c.nome}" modificada!`);
        this.consultar();
      }).catch(
      erro => {
        alert(erro);
      })
    };
  }


