import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { BannerComponent } from './component/banner/banner.component';
import { SobremiComponent } from './component/articles/sobremi/sobremi.component';
import { ExperienciaComponent } from './component/articles/experiencia/experiencia.component';
import { EstudiosComponent } from './component/articles/estudios/estudios.component';
import { MainComponent } from './component/main/main.component';
import { SobremicontentComponent } from './component/articles/sobremicontent/sobremicontent.component';
import { ExperienciacontentComponent } from './component/articles/experienciacontent/experienciacontent.component';
import { EstudioscontentComponent } from './component/articles/estudioscontent/estudioscontent.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    SobremiComponent,
    ExperienciaComponent,
    EstudiosComponent,
    MainComponent,
    SobremicontentComponent,
    ExperienciacontentComponent,
    EstudioscontentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
