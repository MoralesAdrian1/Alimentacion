import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlimentosComponent } from './components/alimentos/alimentos.component';
import { ConsumoComponent } from './components/consumo/consumo.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ConsumoService } from './services/consumo.service';
import { AlimentosService } from './services/alimentos.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AlimentosComponent,
    ConsumoComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConsumoService,
    AlimentosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
