import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'ng2-archwizard/dist';
import { ChartModule } from 'angular2-chartjs';
import { SelectModule } from 'ng-select';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TagInputModule } from 'ngx-chips';
import { AutoCompleteModule } from 'ng4-auto-complete';
import { NgbModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { LightboxModule } from 'angular2-lightbox'

import { routes } from './app-routing.module';

import {ToastyModule} from 'ng2-toasty';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuItems } from './shared/menu-items/menu-items';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { TableroComponent } from './tablero/tablero.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { FuncionarioService } from './shared/funcionario/funcionario.service';
import { QzTrayService } from './shared/qz-tray.service';
import { RoundupPipe } from './roundup.pipe';
import { AlistamientocrearComponent } from './alistamientocrear/alistamientocrear.component';
import { UiSwitchModule } from 'ng2-ui-switch';

import { FullCalendarModule } from 'ng-fullcalendar';
import { NgxInitModule } from "ngx-init";
import {FileUploadModule} from 'ng2-file-upload';

import {SelectOptionService} from './shared/elements/select-option.service';
import { ErrorComponent } from './error/error.component';

import { Select2Module } from 'ng2-select2';
import { FuncionesgeneralesService } from './shared/funcionesgenerales/funcionesgenerales.service';

import { DataFilterPipe } from './shared/elements/data-filter.pipe';
import { UserService } from './core/services/user.service';
import { AuthInterceptor } from './auth.interceptor';



@NgModule({

  imports: [
    LightboxModule,
    MyDateRangePickerModule,
    FileUploadModule,
    BrowserModule,
    UiSwitchModule,
    TagInputModule,
    FormsModule,
    NgbModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: false }),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    ArchwizardModule,
    SelectModule,
    TagInputModule,
    YoutubePlayerModule,
    AutoCompleteModule,
    NgxDatatableModule,
    NgxInitModule,
    HttpClientModule,

    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger'
    }),
    FullCalendarModule,
    ToastyModule.forRoot(),
    Select2Module
  ],
  declarations: [

    DataFilterPipe,
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
    TableroComponent,
    LoginComponent,
   
    RoundupPipe,
   
    AlistamientocrearComponent,   
    ErrorComponent, 
  ],
  providers: [
   
    SelectOptionService,
    MenuItems,
    FuncionarioService,
    QzTrayService,
    AuthGuard,
    NgbDropdown, 
    FuncionesgeneralesService,
    UserService,
   /*  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } */
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
