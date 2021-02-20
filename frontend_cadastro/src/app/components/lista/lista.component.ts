import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {ApiService} from '../../services/api.service';
import {Carro} from '../../core/models/carroModel';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(private api: ApiService, private router: Router) { }
  dataSource: Carro[] ;
  displayedColumns: string[] = ['placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'actionsColumn'];
  ngOnInit(): void {
    this.api.retrieve().subscribe(data => {this.dataSource = data.carros; });
  }

  editarCarro(rowid: number): void{

    this.router.navigate(['editar'], { state: { carro: this.dataSource[rowid]} });
  }

  deleteTicket(rowid: number): void{

    if (rowid > -1) {
      const carro = new Carro().deserialize(this.dataSource.splice(rowid, 1).pop());
      this.api.delete(carro.carro_id).subscribe(data => {
        Swal.fire(
          'Apagado!',
          'Carro Apagado com sucesso.',
          'success'
        );
        this.table.renderRows();
      });

    }

  }




}

