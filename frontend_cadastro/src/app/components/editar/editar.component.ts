import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {Carro} from '../../core/models/carroModel';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar, private fb: FormBuilder, private api: ApiService, private router: Router){
    this.carro =  this.router.getCurrentNavigation().extras.state.carro;
    this.carroForm.patchValue(this.carro);

  }
  carro: Carro;

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
    this.api.updateCarro(this.carro.carro_id, carro)
      .subscribe( () => {
        this.router.navigate(['listar']);
      });
  }
}
