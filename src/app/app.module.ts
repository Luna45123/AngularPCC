import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OneworkComponent } from './onework/onework.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForifComponent } from './forif/forif.component';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal'
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NZ_I18N, th_TH ,NzI18nService} from 'ng-zorro-antd/i18n';
import { SharedModule } from './shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import th from '@angular/common/locales/th';
import { registerLocaleData } from '@angular/common';
import { thBeLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { Lab2Component } from './lab2/lab2.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { OiiaoiiaComponent } from './oiiaoiia/oiiaoiia.component';

registerLocaleData(th);
defineLocale('th', thBeLocale);

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'lab1', component:TableComponent },
  {path: 'home', component: WelcomeComponent },
  {path: 'lab2', component:Lab2Component },
  {path: 'oiiaoiia', component:OiiaoiiaComponent },


  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    OneworkComponent,
    ForifComponent,
    TableComponent,
    Lab2Component,
    NotFoundComponent,
    WelcomeComponent,
    OiiaoiiaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ModalModule,
    NzTableModule,
    HttpClientModule,
    NzPaginationModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    RouterModule.forRoot(routes)

  ],
  providers: [{provide: NZ_I18N, useValue: th_TH}],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
  constructor(
    private i18n: NzI18nService,
    private bsLocaleService: BsLocaleService) {
    this.i18n.setLocale(th_TH);
    this.bsLocaleService.use('th-be');
  }
}