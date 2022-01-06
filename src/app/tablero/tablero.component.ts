import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '../../assets/charts/amchart/amcharts.js';
import '../../assets/charts/amchart/gauge.js';
import '../../assets/charts/amchart/pie.js';
import '../../assets/charts/amchart/serial.js';
import '../../assets/charts/amchart/light.js';
import '../../assets/charts/amchart/ammap.js';
import '../../assets/charts/amchart/worldLow.js';
import '../../assets/charts/amchart/continentsLow.js';
import { IMyDrpOptions } from 'mydaterangepicker';
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
declare const AmCharts: any;
import { NgForm } from '@angular/forms';
import {
  DatatableComponent
} from '@swimlane/ngx-datatable';
import swal,{ SweetAlertOptions } from 'sweetalert2';
import { SwalComponent } from '@toverux/ngx-sweetalert2'; 

import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { environment } from '../../environments/environment.js';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss',
'./iconos.scss']
})

export class TableroComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('PlantillaBotones') PlantillaBotones: TemplateRef<any>;
  @ViewChild('PlantillaTipo') PlantillaTipo: TemplateRef<any>;
  @ViewChild('confirmacionSwal') confirmacionSwal: any;
  @ViewChild('modalGuiaRemision') modalGuiaRemision: any;
  @ViewChild('confirmacionSalir') confirmacionSalir: any;
  @ViewChild('FormGuiaRemision') FormGuiaRemision: NgForm;
  public alertOption:SweetAlertOptions = {};
  @ViewChild('confirmacionGuardar') private confirmacionGuardar: SwalComponent;

  FaseI: any[] = [];
  FaseII: any[] = [];
  public user: any;
  public Id_Remision: any;
  Alistamientos: any = [];
  public maxSize = 5;
  public TotalItems: number;
  public page = 1;
  myDateRangePickerOptions: IMyDrpOptions = {
    width: '180px',
    height: '21px',
    selectBeginDateTxt: 'Inicio',
    selectEndDateTxt: 'Fin',
    selectionTxtFontSize: '10px',
    dateFormat: 'yyyy-mm-dd',
  };

  public filtro_cod:string = '';
  public filtro_tipo:string = '';
  public filtro_origen:string = '';
  public filtro_destino:string = '';
  public filtro_est:string = '';
  public filtro_fecha:any = '';
  public filtro_fases:any = '';

  public filtro_Origen1:string = '';
  public filtro_Destino1:string = '';
  public filtro_Codigo1:string = '';

  public filtro_Origen2:string = '';
  public filtro_Destino2:string = '';
  public filtro_Codigo2:string = '';

  public ValidaFase1 = false;
  public ValidaFase2 = false;
  alive: any;
  interval_fase1: any;
  
  constructor(private http: HttpClient, private location: Location, private route: ActivatedRoute, private router: Router,) {
    this.alertOption = {
      title: "¿Está Seguro?",
      text: "Se dispone a guardar los datos de envio de la Remision",
      showCancelButton: true,
      cancelButtonText: "No, Dejame Comprobar!",
      confirmButtonText: 'Si, Guardar',
      showLoaderOnConfirm: true,
      focusCancel: true,
      type: 'info',
      preConfirm: () => {
        return new Promise((resolve) => {
          this.GuardarGuiaRemision(this.FormGuiaRemision);
        })
      },
      allowOutsideClick: () => !swal.isLoading()
    }
    this.ListarAlistamientos();
  }

  ngOnInit() {
    this.user = {Identificacion_Funcionario:'1'};
    this.http.get(environment.ruta + 'php/alistamiento_nuevo/detalle_fase1.php',{params:{funcionario:this.user.Identificacion_Funcionario}}).subscribe((data: any) => {
      this.FaseI = data;
      this.ValidaFase1 = true;
    });
    let params = this.route.snapshot.queryParams;
    if (Object.keys(params).length > 0) { 
        this.filtro_Origen1 = params.origen1 ? params.origen1 : '';
        this.filtro_Destino1 = params.destino1 ? params.destino1 : '';
        this.filtro_Codigo1 = params.codigo1 ? params.codigo1 : '';

        this.filtro_Origen2 = params.origen2 ? params.origen2 : '';
        this.filtro_Destino2 = params.destino2 ? params.destino2 : '';
        this.filtro_Codigo2 = params.codigo2 ? params.codigo2 : '';  
    }

   this.interval_fase1 = setInterval(() => {
      let queryString = '';
      
      if(this.filtro_Origen1!=''||this.filtro_Destino1!=''||this.filtro_Codigo1!=''){
        queryString = '&origen1=' + this.filtro_Origen1+"&destino1="+this.filtro_Destino1+"&codigo1="+this.filtro_Codigo1;
      }
      this.http.get(environment.ruta+'php/alistamiento_nuevo/detalle_fase1.php?funcionario='+this.user.Identificacion_Funcionario+queryString).subscribe((data:any)=>{
        this.FaseI = data;
      });
    },60000);
  }

  ngOnDestroy() {
    
    clearInterval(this.interval_fase1);
  }
    
  showAlert(evt:any){
        this.confirmacionGuardar.show(); 
  }
  save(){
  }
  ListarAlistamientos() {

    let params = this.route.snapshot.queryParams;

    let queryString = '';
    
    if (Object.keys(params).length > 0) { // Si existe parametros o filtros
      // actualizando la variables con los valores de los paremetros.
      this.page = params.pag ? params.pag : 1;
      this.filtro_fecha = params.fecha ? params.fecha : '';
      this.filtro_cod = params.cod ? params.cod : '';
      this.filtro_origen = params.origen ? params.origen : '';
      this.filtro_destino = params.destino ? params.destino : '';
      this.filtro_est = params.est ? params.est : '';
      this.filtro_tipo = params.tipo ? params.tipo : '';
      this.filtro_fases = params.fases ? params.fases : '';

      queryString = '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    }
    
    this.http.get(environment.ruta + 'php/alistamiento/detalle_alistamiento.php'+queryString).subscribe((data: any) => {
      this.Alistamientos = data.remisiones;
      this.TotalItems = data.numReg;
    });
  }
  
  paginacion() {

    let params:any = {
      pag: this.page
    }

    if (this.filtro_fecha != "" && this.filtro_fecha != null) {
      params.fecha = this.filtro_fecha.formatted;
    }
    if (this.filtro_cod != "") {
      params.cod = this.filtro_cod;
    }
    if (this.filtro_tipo != "") {
      params.tipo = this.filtro_tipo;
    }
    if (this.filtro_origen != "") {
      params.origen = this.filtro_origen;
    }
    if (this.filtro_destino != "") {
      params.destino = this.filtro_destino;
    }
    if (this.filtro_est != "") {
      params.est = this.filtro_est;
    }

    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    this.location.replaceState('/tablero', queryString);

    this.http.get(environment.ruta + 'php/alistamiento/detalle_alistamiento.php?'+queryString).subscribe((data: any) => {
      this.Alistamientos = data.remisiones;
      this.TotalItems = data.numReg;
    });
  }

  dateRangeChanged(event) {

    if (event.formatted != "") {
      this.filtro_fecha = event;
    } else {
      this.filtro_fecha = '';
    }

    this.filtros();
  }

  filtros() {

    let params:any = {};

    if (this.filtro_fecha != "" || this.filtro_cod != "" || this.filtro_tipo != "" || this.filtro_origen != "" || this.filtro_destino != "" || this.filtro_est != "" || this.filtro_fases != "") {
      this.page = 1;
      params.pag = this.page;

      if (this.filtro_fecha != "" && this.filtro_fecha != null) {
        params.fecha = this.filtro_fecha.formatted;
      }
      if (this.filtro_cod != "") {
        params.cod = this.filtro_cod;
      }
      if (this.filtro_tipo != "") {
        params.tipo = this.filtro_tipo;
      }
      if (this.filtro_origen != "") {
        params.origen = this.filtro_origen;
      }
      if (this.filtro_destino != "") {
        params.destino = this.filtro_destino;
      }
      if (this.filtro_fases != "" && this.filtro_fases == 1) {
        params.fases = 1;
        this.filtro_est = "Pendiente";
      } else if (this.filtro_fases != "" && this.filtro_fases == 2) {
        params.fases = 2;
        this.filtro_est = "";
      }
      if (this.filtro_est != "") {
        params.est = this.filtro_est;
      }

      let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

      this.location.replaceState('/tablero', queryString);

      this.http.get(environment.ruta + 'php/alistamiento/detalle_alistamiento.php?'+queryString).subscribe((data: any) => {
        this.Alistamientos = data.remisiones;
        this.TotalItems = data.numReg;
      });
    } else {
      this.location.replaceState('/tablero', '');

      this.filtro_fecha = '';
      this.filtro_cod = '';
      this.filtro_tipo = '';
      this.filtro_origen = '';
      this.filtro_destino = '';
      this.filtro_est = '';
      this.filtro_fases = '';

      this.http.get(environment.ruta + 'php/alistamiento/detalle_alistamiento.php').subscribe((data: any) => {
        this.Alistamientos = data.remisiones;
        this.TotalItems = data.numReg;
      });
    }
  }


  filtrosFase1() {

    let params:any = {};

    if (this.filtro_Codigo1 != "" || this.filtro_Origen1 != "" || this.filtro_Destino1 != "") {
      
      if (this.filtro_Codigo1 != "") {
        params.codigo1 = this.filtro_Codigo1;
      }
      if (this.filtro_Origen1 != "") {
        params.origen1= this.filtro_Origen1;
      }
      if (this.filtro_Destino1 != "") {
        params.destino1 = this.filtro_Destino1;
      }

      let queryString = 'origen1='+this.filtro_Origen1+'&destino1='+this.filtro_Destino1+'&codigo1='+this.filtro_Codigo1;

      this.location.replaceState('/tablero', queryString);

      this.http.get(environment.ruta+'php/alistamiento_nuevo/detalle_fase1.php?funcionario='+this.user.Identificacion_Funcionario+'&'+queryString).subscribe((data:any)=>{
        this.FaseI = data;
      })
    } else {
      this.location.replaceState('/tablero', '');

      this.filtro_Codigo1 = '';
      this.filtro_Origen1 = '';
      this.filtro_Destino1 = '';

      this.http.get(environment.ruta+'php/alistamiento_nuevo/detalle_fase1.php?funcionario='+this.user.Identificacion_Funcionario).subscribe((data:any)=>{
        this.FaseI = data;
      });
    }
  }
  filtrosFase2() {

    let params:any = {};

    if (this.filtro_Codigo2 != "" || this.filtro_Origen2 != "" || this.filtro_Destino2 != "") {

      if (this.filtro_Codigo2 != "") {
        params.codigo2 = this.filtro_Codigo2;
      }
      if (this.filtro_Origen2 != "") {
        params.origen2= this.filtro_Origen2;
      }
      if (this.filtro_Destino2 != "") {
        params.destno2 = this.filtro_Destino2;
      }

      let queryString = '&origen2='+this.filtro_Origen2+'&destino2='+this.filtro_Destino2+'&codigo2='+this.filtro_Codigo2;

      this.location.replaceState('/tablero', queryString);

      this.http.get(environment.ruta+'php/alistamiento_nuevo/detalle_fase2.php?funcionario='+this.user.Identificacion_Funcionario+queryString).subscribe((data:any)=>{
        this.FaseII = data;
      })
    } else {
      this.location.replaceState('/tablero', '');

      this.filtro_Codigo2 = '';
      this.filtro_Origen2 = '';
      this.filtro_Destino2 = '';

      this.http.get(environment.ruta+'php/alistamiento_nuevo/detalle_fase2.php?funcionario='+this.user.Identificacion_Funcionario).subscribe((data:any)=>{
        this.FaseII = data;
      });
    }
  }
  Bandera_Fase1(id,tipo){
    let mod = tipo == 'Devolucion' ? 'Devolucion_Compra' : 'Remision';
    this.http.get(environment.ruta + 'php/alistamiento/guardar_hora_inicio.php', { params: { id: id,mod, funcionario:this.user.Identificacion_Funcionario, tipo:"Fase1" } }).subscribe((data: any) => {
      this.router.navigate(['/alistamientocrear',id,tipo]);
    });

    
  }
  Bandera_Fase2(id,tipo){
    let mod = tipo == 'Devolucion' ? 'Devolucion_Compra' : 'Remision'
    this.http.get(environment.ruta + 'php/alistamiento/guardar_hora_inicio.php', { params: { id , mod, funcionario:this.user.Identificacion_Funcionario, tipo:"Fase2" } }).subscribe((data: any) => {
      this.router.navigate(['/alistamientocrearnuevo',id,tipo]);
    });

    
  }

  GuardarGuiaRemision(formulario: NgForm) {
    let info = JSON.stringify(formulario.value);
    let datos = new FormData();
    datos.append("datos", info);
    datos.append("funcionario", this.user.Identificacion_Funcionario);
    this.http.post(environment.ruta + 'php/alistamiento/guardar_guia_remision.php', datos).subscribe((data: any) => {
      formulario.reset();
     

      this.modalGuiaRemision.hide();
      this.confirmacionSwal.title = "Operación Exitosa";
      this.confirmacionSwal.text = "Se han Guardado los datos de la guia de la remisión exitosamente";
      this.confirmacionSwal.type = "success";
      this.confirmacionSwal.show();
      this.ListarAlistamientos();
    });
  }
  CapturarId(id) {
    this.Id_Remision = id;
    
    this.modalGuiaRemision.show();
  }
}