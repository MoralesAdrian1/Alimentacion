import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alimentosModel, categoriaModel } from 'src/app/models/models';
import { AlimentosService } from 'src/app/services/alimentos.service';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit {
  categoria: categoriaModel[] = [];
  alimento: alimentosModel[] = [];
  alimentoForm: FormGroup;

  constructor(private AlimentosService: AlimentosService, private fb: FormBuilder) {
    this.alimentoForm = this.fb.group({
      _id: [''],
      categoriaAlimento: ["", Validators.required],
      nombreAlimento: ["", Validators.required],
      calorias: [0, Validators.required],
    });
  }

  ngOnInit() {
    this.cargarCategorias();
    this.cargarAlimentos();
  }

  cargarAlimentos() {
    this.AlimentosService.getAlimentos().subscribe(
      data => {
        this.alimento = data;
      },
      error => {
        console.error('Error al cargar datos Personales:', error);
      }
    );
  }

  agregarAlimento() {
    if (this.alimentoForm.valid) {
      this.AlimentosService.addAlimentos(this.alimentoForm.value).subscribe(
        () => {
          this.cargarAlimentos();
          this.alimentoForm.reset();
        },
        error => {
          console.error('Error al agregar Datos Personales:', error);
        }
      );
    }
  }

  actualizarAlimento() {
    if (this.alimentoForm.valid) {
      this.AlimentosService.updateAlimentos(this.alimentoForm.value).subscribe(
        () => {
          this.cargarAlimentos();
          this.alimentoForm.reset();
        },
        error => {
          console.error('Error al actualizar Datos Personales:', error);
        }
      );
    }
  }

  eliminarAlimento(id: string | undefined) {
    if (id) {
      this.AlimentosService.deleteAlimentos(id).subscribe(
        data => {
          console.log('Estado eliminado:', data);
          this.cargarAlimentos();
        },
        error => {
          console.error('Error al eliminar Estado:', error);
        }
      );
    }
  
  }

  editarAlimento(alimento: alimentosModel) {
    this.alimentoForm.patchValue(alimento);
  }
  cargarCategorias() {
    this.AlimentosService.getCategorias().subscribe(
      data => {
        this.categoria = data;
      },
      error => {
        console.error('Error al cargar Animales:', error);
      }
    );
  }
}
