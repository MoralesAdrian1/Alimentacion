import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alimentosModel, categoriaModel, consumoModel } from 'src/app/models/models';
import { ConsumoService } from 'src/app/services/consumo.service';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent implements OnInit{
  consumo: consumoModel[] = [];
  categoria:categoriaModel[]=[];//
  alimento:alimentosModel[]=[];
  allAlimento:alimentosModel[]=[];
  filteredAlimento:alimentosModel[]=[];
  historialForm: FormGroup;
  mostrarFormulario: boolean = false;
  filterpost: string = '';
  filterCategoria: string = '';
  filterComida: string = '';
  filterAlimento: string = '';
  filterUser:string='';
  filterHora:string='';

  constructor(private HistorialService: ConsumoService, private fb: FormBuilder) {
    this.historialForm = this.fb.group({
      _id: [''],
      username: ["", Validators.required],
      fechaComida: ["", Validators.required],
      horaComida: ["", ],
      comida: ["", ],
      alimentos: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.cargarHistorial();
    this.cargarAlimento();
    this.cargarCategorias();
  }
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
  get uniqueUsernames(): string[] {
    // Utilizamos un Set para almacenar usuarios únicos
    const uniqueSet = new Set<string>();
    this.consumo.forEach(item => uniqueSet.add(item.username));
    // Convertimos el Set a un array
    return Array.from(uniqueSet);
}
  cargarHistorial() {
    this.HistorialService.getConsumo().subscribe(
      data => {
        this.consumo = data;
      },
      error => {
        console.error('Error al cargar Historial:', error);
      }
    );
  }
  
agregarHistorial() {
    if (this.historialForm.valid) {
      const nuevoHistorial: consumoModel = this.historialForm.value;
      this.HistorialService.addConsumo(nuevoHistorial).subscribe(
        () => {
          this.cargarHistorial();
          this.historialForm.reset();
        },
        error => {
          console.error('Error al agregar historial', error);
        }
      );
    }
  }

  actualizarHistorial() {
    if (this.historialForm.valid) {
        const HistorialActualizado: consumoModel = this.historialForm.value;

        // Actualizar el valor del formulario con las vacunas y consultas filtradas
        this.historialForm.patchValue({
            vacunas: this.historialForm.value.vacunas.filter((vacunas: { nombreVacuna: string; }) => vacunas.nombreVacuna !== ''),
            consultas: this.historialForm.value.consultas.filter((consultas: { tipoConsulta: string; }) => consultas.tipoConsulta !== '')
        });

        this.HistorialService.updateConsumo(HistorialActualizado).subscribe(
            () => {
                this.cargarHistorial();
                this.historialForm.reset();
            },
            error => {
                console.error('Error al actualizar datos:', error);
            }
        );
    }
}


  eliminarHistorial(id: string | undefined) {
    if (id) {
      this.HistorialService.deleteConsumo(id).subscribe(
        data => {
          console.log('historial eliminado:', data);
          this.cargarHistorial();
        },
        error => {
          console.error('Error al eliminar historial:', error);
        }
      );
    }
  }

  editarHistorial(historial: consumoModel) {
    // Cargar historial en el formulario
    this.historialForm.patchValue(historial);

    // Cargar alimentos existentes en el formulario
    historial.alimentos.forEach(alimento => {
        const alimentoGroup = this.fb.group({
            categoriaAlimento: [alimento.categoriaAlimento, Validators.required],
            nombreAlimento: [alimento.nombreAlimento, Validators.required],
            porcion: [alimento.porcion, Validators.required],
            calorias: [alimento.calorias, Validators.required],
        });
        this.alimentos.push(alimentoGroup);
    });

}

//---------------------------------------------------------
  //alimentos
  agregarAlimento() {
    const alimentoGroup = this.fb.group({
      categoriaAlimento: ['', Validators.required],
      nombreAlimento: ['', Validators.required],
      porcion: [0, Validators.required],
      calorias: [0, Validators.required],
    });
    this.alimentos.push(alimentoGroup);
  }
  
  
    get alimentos() {
      return this.historialForm.get('alimentos') as FormArray;
    }
  //cargar vacunas
  cargarAlimentos(){
    this.HistorialService.getAlimentos().subscribe(
      data =>{
        this.alimento = data;
      },
      error => {
        console.log("Error",error);
      }
    )
  }

//------------------------------------------------------------------------
    //filtrar datos de alimento
    cargarCategorias() {
      this.HistorialService.getCategorias().subscribe(
        data => {
          this.categoria = data;
        },
        error => {
          console.error('Error al cargar categoria:', error);
        }
      );
    }


    filtrarCategoriaPorAlimento(categoriaAlimento: string) {
      this.filteredAlimento = this.allAlimento.filter(alimento => alimento.categoriaAlimento === categoriaAlimento);
    }
    cargarAlimento() {
  
      this.HistorialService.getAlimentos().subscribe(
        data => {
          this.allAlimento = data;
        },
        error => {
          console.error('Error al cargar Raza:', error);
        }
      );
    }
    onCategoriaSelected(event: any) {
      const categoriaAlimentoSeleccionado = event.target.value;
      if (categoriaAlimentoSeleccionado !== null) {
        this.filtrarCategoriaPorAlimento(categoriaAlimentoSeleccionado);
      }
    }
    //confirmaciones
    confirmarEliminarHistorial(id: string | undefined) {
      const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este historial?');
      if (confirmacion) {
          this.eliminarHistorial(id);
      }
  }

}
