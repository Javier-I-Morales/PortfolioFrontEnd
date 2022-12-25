import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { BannerComponent } from './component/banner/banner.component';
import { ExperienciaComponent } from './component/articles/experiencia/experiencia.component';
import { EstudiosComponent } from './component/articles/estudios/estudios.component';
import { MainComponent } from './component/main/main.component';
import { ExperienciacontentComponent } from './component/articles/experienciacontent/experienciacontent.component';
import { EstudioscontentComponent } from './component/articles/estudioscontent/estudioscontent.component';
import { HardsoftkillsComponent } from './component/articles/hardsoftkills/hardsoftkills.component';
import { HardsoftkillscontentComponent } from './component/articles/hardsoftkillscontent/hardsoftkillscontent.component';
import { ProyectosComponent } from './component/articles/proyectos/proyectos.component';
import { ProyectoscontentComponent } from './component/articles/proyectoscontent/proyectoscontent.component';
import { HttpClientModule } from '@angular/common/http';

import { IniciarSesionComponent } from './component/iniciar-sesion/iniciar-sesion.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PruebaComponent } from './component/prueba/prueba.component';
import { PortfolioComponent } from './component/portfolio/portfolio.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ExperienciaComponent,
    EstudiosComponent,
    MainComponent,
    ExperienciacontentComponent,
    EstudioscontentComponent,
    HardsoftkillsComponent,
    HardsoftkillscontentComponent,
    ProyectosComponent,
    ProyectoscontentComponent,
    IniciarSesionComponent,
    PruebaComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
