import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AbstractControl, FormBuilder} from '@angular/forms';
import { Validators } from '@angular/forms';
import {Carro} from '../../core/models/carroModel';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router){}
  carro =  Carro;

  carroForm = this.fb.group({
    placa: ['', [Validators.required, Validators.minLength(4)]],
    chassi: ['', Validators.required],
    renavam: ['', Validators.required],
    modelo: ['', Validators.required],
    marca: ['', Validators.required],
    ano:  ['', Validators.required],
  });
  get placa(): AbstractControl { return this.carroForm.get('placa'); }

  ngOnInit(): void {


  }

  private prepareSave(): Carro {
    return new Carro().deserialize(this.carroForm.value);
  }

  onSubmit(): void {
    const carro = this.prepareSave();
    this.api.createCarro(carro)
      .subscribe( data => {
        this.router.navigate(['listar']);
      });
  }
}
