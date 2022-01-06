import { Component, Directive, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forEach } from '../../../../node_modules/@angular/router/src/utils/collection';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { User } from '../../core/models/users.model';
import { UserService } from '../../core/services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('notificationBottom', [
      state('an-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('an-animate',
        style({
          overflow: 'hidden',
          height: AUTO_STYLE,
        })
      ),
      transition('an-off <=> an-animate', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        width: '300px',
        // transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        width: '0',
        // transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('mobileHeaderNavRight', [
      state('nav-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('nav-on',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('nav-off <=> nav-on', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  public userA : User;
  public navType: string;
  public themeLayout: string;
  public verticalPlacement: string;
  public verticalLayout: string;
  public pcodedDeviceType: string;
  public verticalNavType: string;
  public verticalEffect: string;
  public vnavigationView: string;
  public freamType: string;
  public sidebarImg: string;
  public sidebarImgType: string;
  public layoutType: string;

  public headerTheme: string;
  public pcodedHeaderPosition: string;

  public liveNotification: string;
  public liveNotificationClass: string;

  public profileNotification: string;
  public profileNotificationClass: string;

  public chatSlideInOut: string;
  public innerChatSlideInOut: string;

  public searchWidth: number;
  public searchWidthString: string;

  public navRight: string;
  public windowWidth: number;
  public chatTopPosition: string;

  public toggleOn: boolean;
  public navBarTheme: string;
  public activeItemTheme: string;
  public pcodedSidebarPosition: string;

  public menuTitleTheme: string;
  public dropDownIcon: string;
  public subItemIcon: string;

  public configOpenRightBar: string;
  public displayBoxLayout: string;
  public isVerticalLayoutChecked: boolean;
  public isSidebarChecked: boolean;
  public isHeaderChecked: boolean;
  public headerFixedMargin: string;
  public sidebarFixedHeight: string;
  public itemBorderStyle: string;
  public subItemBorder: boolean;
  public itemBorder: boolean;

  public config: any;

  public user: any;
  public alertas: any[];
  public changePasswordMessage: string;
  public Alertas = 0;
  public Fecha = new Date();
  public punto_activo: any;
  public Puntos_Propios: any[];
  public Nombre_Punto: any;
  public Permisos: any[] = [];
  public contador = 0;
  

  @ViewChild('PuntoSeleccionado') PuntoSeleccionado: any;
  @ViewChild('modalPuntos') modalPuntos: any;
  @ViewChild('confirmSwal') confirmSwal: any;
  @ViewChild('ModalCambiarContrasena') ModalCambiarContrasena: any;
  constructor(public menuItems: MenuItems,   private _user: UserService,private router: Router, private http: HttpClient) {
    this.userA = this._user.user;
    console.log(this.userA);
    
    this.navType = 'st1';
    this.themeLayout = 'horizontal'; // vertical
    this.verticalPlacement = 'left';
    this.verticalLayout = 'wide';
    this.pcodedDeviceType = 'desktop';
    this.verticalNavType = 'expanded';
    this.verticalEffect = 'shrink';
    this.vnavigationView = 'view1';
    this.freamType = 'theme1';
    this.sidebarImg = 'false';
    this.sidebarImgType = 'img1';
    this.layoutType = 'light';

    this.headerTheme = 'themelight5';
    this.pcodedHeaderPosition = 'fixed';

    this.liveNotification = 'an-off';
    this.profileNotification = 'an-off';

    this.chatSlideInOut = 'out';
    this.innerChatSlideInOut = 'out';

    this.searchWidth = 0;

    this.navRight = 'nav-on';

    this.windowWidth = window.innerWidth;
    this.setHeaderAttributes(this.windowWidth);

    this.toggleOn = true;
    this.navBarTheme = 'themelight1';
    this.activeItemTheme = 'theme2';
    this.pcodedSidebarPosition = 'fixed';
    this.menuTitleTheme = 'theme6';
    this.dropDownIcon = 'style1';
    this.subItemIcon = 'style1';

    this.displayBoxLayout = 'd-none';
    this.isVerticalLayoutChecked = false;
    this.isSidebarChecked = true;
    this.isHeaderChecked = true;
    this.headerFixedMargin = '56px';
    this.sidebarFixedHeight = 'calc(100vh - 56px)';
    this.itemBorderStyle = 'none';
    this.subItemBorder = true;
    this.itemBorder = true;

    this.setMenuAttributes(this.windowWidth);
    this.setHeaderAttributes(this.windowWidth);
/* TODO  auth user */
    this.user = {Identificacion_Funcionario:'1'};
    this.http.get(environment.ruta + 'php/tablero/detalle_perfil.php', {
      params: { id: this.user.Identificacion_Funcionario }
    }).subscribe((data: any) => {
      this.Permisos = data;
     });


  }

  ngOnInit() {
    this.Nombre_Punto = localStorage.getItem("Nombre_Punto");
    this.setBackgroundPattern('pattern1');
  
  }

  salir() {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
  Comparacion(value){
   // console.log(value);
    if(value.type!=='sub'){
     // console.log(value.state);
     var posicion= this.Permisos.findIndex(x=> x.Modulo===value.state);
      if(posicion>-1){
        if(this.Permisos[posicion].Ver==='1'){
          //console.log("lo encontre"+posicion);
          return true;
        }
      } 
    }  
  }
  Submenu(value){
    if(value.type !== 'sub'){
      var posicion= this.Permisos.findIndex(x=> x.Modulo===value.state)
      if(posicion>-1){
        if(this.Permisos[posicion].Ver==='1'){
          //console.log("lo encontre"+posicion);
          return true;
        }
      }
    }
  }
  GuardaPunto() {
    localStorage.setItem("Punto", this.PuntoSeleccionado.nativeElement.value);
    this.punto_activo = this.PuntoSeleccionado.nativeElement.value;
    this.Nombre_Punto = this.PuntoSeleccionado.nativeElement.selectedOptions[0].innerHTML;
    localStorage.setItem("Nombre_Punto", this.Nombre_Punto);
   // console.log(this.PuntoSeleccionado);

    this.modalPuntos.hide();
  }

  onResize(event) {
    this.windowWidth = event.target.innerWidth;
    this.setHeaderAttributes(this.windowWidth);

    let reSizeFlag = true;
    if (this.pcodedDeviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.pcodedDeviceType === 'phone' && this.windowWidth < 768) {
      reSizeFlag = false;
    }
    /* for check device */
    if (reSizeFlag) {
      this.setMenuAttributes(this.windowWidth);
    }
  }

  setHeaderAttributes(windowWidth) {
    if (windowWidth < 992) {
      this.navRight = 'nav-off';
    } else {
      this.navRight = 'nav-on';
    }
  }

  setMenuAttributes(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.pcodedDeviceType = 'tablet';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else if (windowWidth < 768) {
      this.pcodedDeviceType = 'phone';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.pcodedDeviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
    }
  }

  toggleHeaderNavRight() {
    this.navRight = this.navRight === 'nav-on' ? 'nav-off' : 'nav-on';
    this.chatTopPosition = this.chatTopPosition === 'nav-on' ? '112px' : '';
    if (this.navRight === 'nav-off' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.navRight === 'nav-off' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  toggleLiveNotification() {
    this.liveNotification = this.liveNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.liveNotificationClass = this.liveNotification === 'an-animate' ? 'active' : '';

    if (this.liveNotification === 'an-animate' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.liveNotification === 'an-animate' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  toggleProfileNotification() {
    this.profileNotification = this.profileNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.profileNotificationClass = this.profileNotification === 'an-animate' ? 'active' : '';

    if (this.profileNotification === 'an-animate' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.profileNotification === 'an-animate' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  notificationOutsideClick(ele: string) {
    if (ele === 'live' && this.liveNotification === 'an-animate') {
      this.toggleLiveNotification();
    } else if (ele === 'profile' && this.profileNotification === 'an-animate') {
      this.toggleProfileNotification();
    }
  }

  toggleChat() {
    this.chatSlideInOut = this.chatSlideInOut === 'out' ? 'in' : 'out';
    if (this.innerChatSlideInOut === 'in') {
      this.innerChatSlideInOut = 'out';
    }
  }

  toggleInnerChat() {
    this.innerChatSlideInOut = this.innerChatSlideInOut === 'out' ? 'in' : 'out';
  }

  searchOn() {
    document.querySelector('#main-search').classList.add('open');
    const searchInterval = setInterval(() => {
      if (this.searchWidth >= 200) {
        clearInterval(searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth + 15;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

  searchOff() {
    const searchInterval = setInterval(() => {
      if (this.searchWidth <= 0) {
        document.querySelector('#main-search').classList.remove('open');
        clearInterval(searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth - 15;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

  toggleOpened() {
    if (this.windowWidth < 992) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
      if (this.navRight === 'nav-on') {
        this.toggleHeaderNavRight();
      }
    }
    this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    document.querySelector('#main_navbar').classList.toggle('show-menu');
  }

  onClickedOutsideSidebar(e: Event) {
    if ((this.windowWidth < 992 && this.toggleOn && this.verticalNavType !== 'offcanvas') || this.verticalEffect === 'overlay') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
      document.querySelector('#main_navbar').classList.remove('show-menu');
    }
  }

  toggleRightbar() {
    this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
  }

  setNavBarTheme(theme: string) {
    if (theme === 'themelight1') {
      this.navBarTheme = 'themelight1';
      this.menuTitleTheme = 'theme1';
      this.sidebarImg = 'false';
    } else {
      this.menuTitleTheme = 'theme6';
      this.navBarTheme = 'theme1';
      this.sidebarImg = 'false';
    }
  }

  setLayoutType(type: string) {
    this.layoutType = type;
    if (type === 'dark') {
      this.headerTheme = 'theme1';
      this.sidebarImg = 'false';
      this.navBarTheme = 'theme1';
      this.menuTitleTheme = 'theme6';
      document.querySelector('body').classList.add('dark');
    } else if (type === 'light') {
      this.sidebarImg = 'false';
      this.headerTheme = 'theme5';
      this.navBarTheme = 'themelight1';
      this.menuTitleTheme = 'theme1';
      document.querySelector('body').classList.remove('dark');
    } else if (type === 'img') {
      this.sidebarImg = 'true';
      this.headerTheme = 'theme1';
      this.navBarTheme = 'theme1';
      this.menuTitleTheme = 'theme6';
      document.querySelector('body').classList.remove('dark');
    }
  }

  setVerticalLayout() {
    this.isVerticalLayoutChecked = !this.isVerticalLayoutChecked;
    if (this.isVerticalLayoutChecked) {
      this.verticalLayout = 'box';
      this.displayBoxLayout = '';
    } else {
      this.verticalLayout = 'wide';
      this.displayBoxLayout = 'd-none';
    }
  }

  setBackgroundPattern(pattern: string) {
    document.querySelector('body').setAttribute('themebg-pattern', pattern);
  }

  setSidebarPosition() {
    this.isSidebarChecked = !this.isSidebarChecked;
    this.pcodedSidebarPosition = this.isSidebarChecked === true ? 'fixed' : 'absolute';
    this.sidebarFixedHeight = this.isHeaderChecked === true ? 'calc(100vh + 56px)' : 'calc(100vh - 56px)';
  }

  setHeaderPosition() {
    this.isHeaderChecked = !this.isHeaderChecked;
    this.pcodedHeaderPosition = this.isHeaderChecked === true ? 'fixed' : 'relative';
    this.headerFixedMargin = this.isHeaderChecked === true ? '56px' : '';
  }

  hideNavBar() {
    for (let i = 0; i < document.querySelector('#main_navbar').children[0].children[0].children.length; ++i) {
      document.querySelector('#main_navbar').children[0].children[0].children[i].children[0].classList.remove('pcoded-trigger');
    }
    //console.log(document.querySelector('#main_navbar').children[0].children[0].children);    
  }

  CambiarContrasena(formulario: NgForm) {
    console.log(formulario.value);
    let datos = new FormData();
    datos.append("clave", formulario.value.clave);
    datos.append("user", this.user.Identificacion_Funcionario);
    this.http.post(environment.ruta + 'php/funcionarios/cambia_clave.php', datos).subscribe((data: any) => {
      this.changePasswordMessage = data.Mensaje;
      console.log(this.changePasswordMessage);
      formulario.reset();
      this.ModalCambiarContrasena.hide();
      this.confirmSwal.show();
      this.salir();
    });
  }
}

@Directive({
  selector: '[appTrigger]'
})
export class LinkTriggerDirective {
  constructor(private elements: ElementRef) { }

  @HostListener('click', ['$event'])
  onToggle($event: any) {
    $event.preventDefault();
    let eleClass = '';
    let parentEle = (this.elements).nativeElement;
    while (eleClass !== 'menu-main-item') {
      if (parentEle.classList.contains('menu-main-item')) {
        eleClass = 'menu-main-item';
      } else {
        parentEle = parentEle.parentNode;
      }
    }
    parentEle.querySelector('.pcoded-hasmenu').classList.remove('pcoded-trigger');
    parentEle.querySelector('.main-click-trigger').click();
    document.querySelector('#main_navbar').classList.remove('show-menu');
  }
}
