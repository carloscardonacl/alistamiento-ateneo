import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Tablero',
    main: [{
      state: 'tablero',
      short_label: 'T',
      name: 'Tablero',
      type: 'link',
      icon: 'ti-dashboard'
    },
    {
      state: 'cuentasmedicas',
      short_label: 'CM',
      name: 'Cuentas Médicas',
      type: 'sub',
      icon: 'ti-heart-broken',
      children: [
        {
          state: 'dispensaciones',
          name: 'Dispensaciones',
          type: 'link'
        },
        {
          state: 'auditorias',
          name: 'Auditorías',
          type: 'link'
        },
        {
          state: 'cmfacturacion',
          name: 'Facturación',
          type: 'link'
        },
      
      ]
    },
    {
      state: 'bodega',
      short_label: 'B',
      name: 'Bodega',
      type: 'sub',
      icon: 'ti-archive',
      children : [
        {
          state: 'remisiones',
          name: 'Remisiones',
          type: 'link'
        },
        {
          state: 'alistamientos',
          name: 'Alistamientos',
          type: 'link'
        },
        {
          state: 'noconformes',
          name: 'No Conformes',
          type: 'link'
        },
        {
          state: 'bodegainicial',
          name: 'Bodega Inicial',
          type: 'link'
        },
        {
          state: 'correspondencias',
          name: 'Correspondencias',
          type: 'link'
        },
        {
          state: 'actarecepcion',
          name: 'Acta Recepción',
          type: 'link'
        },
        {
          state: 'actarecepcionremisiones',
          name: 'Acta Recepción Remisones',
          type: 'link'
        },
        {
          state: 'inventario',
          name: 'Inventario',
          type: 'link'
        },
        {
          state: 'inventarioinicial',
          name: 'Inventario Inicial',
          type: 'link'
        },
        {
          state: 'ajusteinventariofisico',
          name: 'Inventario Físico',
          type: 'link'
        },
        {
          state: 'ajusteunoauno',
          name: 'Ajuste Individual',
          type: 'link'
        }
      ]
    },
    {
      state: 'compras',
      short_label: 'C',
      name: 'Compras',
      type: 'sub',
      icon: 'ti-money',
      children : [
        {
          state: 'comprasnacionales',
          name: 'Compras Nacionales',
          type: 'link'
        },
        {
          state: 'comprasinternacionales',
          name: 'Compras Internacionales',
          type: 'link'
        },
        {
          state: 'devolucionescompras',
          name: 'Devoluciones Compras',
          type: 'link'
        },
        {
          state: 'reportekardex',
          name: 'Reporte Kardex',
          type: 'link'
        },
        {
          state: 'reportesgenerales',
          name: 'Reportes Generales',
          type: 'link'
        },
        {
          state: 'rotativocompra',
          name: 'Rotativos Compras',
          type: 'link'
        },
        {
          state: 'rotativocomprainternacional',
          name: 'Rotativos Compras Internacionales',
          type: 'link'
        }
      ]
    },
    {
      state: 'facturacion',
      short_label: 'F',
      name: 'Facturación',
      type: 'sub',
      icon: 'ti-files',
      children : [
        {
          state: 'cotizacionesventas',
          name: 'Cotizaciones Ventas',
          type: 'link'
        },
        {
          state: 'facturasventas',
          name: 'Facturas Ventas',
          type: 'link'
        },
        {
          state: 'notascredito',
          name: 'Notas Crédito',
          type: 'link'
        },
        {
          state: 'preciosregulados',
          name: 'Precios Regulados',
          type: 'link'
        }
      ]
    },
    {
      state: 'contabilidad',          //EDITANDO
      short_label: 'CM',
      name: 'Contabilidad',
      type: 'sub',
      icon: 'ti-bar-chart',
      children: [
        {
          state: 'cartera',
          name: 'Cartera',
          type: 'link'
        },
        {
          state: 'comprobantesingresos',
          name: 'Comprobantes Ingresos',
          type: 'link'
        },
        {
          state: 'comprobantesegresos',
          name: 'Comprobantes Egresos',
          type: 'link'
        },
        {
          state: 'notascontables',
          name: 'Notas Contables',
          type: 'link'
        },
        {
          state: 'pyg',
          name: 'PyG',
          type: 'link'
        },
        {
          state: 'libroscontables',
          name: 'Libros Contables',
          type: 'link'
        },
        {
          state: 'inventariosvalorizados',
          name: 'Inventarios Valorizados',
          type: 'link'
        },
        {
          state: 'activosfijos',
          name: 'Activos Fijos',
          type: 'link'
        },
        {
          state: 'amortizaciones',
          name: 'Amortizaciones',
          type: 'link'
        },
        {
          state: 'centroscostos',
          name: 'Centros de Costos',
          type: 'link'
        },
        {
          state: 'informesdian',
          name: 'Informes DIAN',
          type: 'link'
        }                                         
      
      ]
    },
    {
      state: 'recursoshumanos',          //EDITANDO
      short_label: 'CM',
      name: 'Recursos Humanos',
      type: 'sub',
      icon: 'ti-user',
      children: [
        {
          state: 'vacantes',
          name: 'Vacantes',
          type: 'link'
        },
        {
          state: 'postulantes',
          name: 'Postulantes',
          type: 'link'
        },
        {
          state: 'contratos',
          name: 'Contratos',
          type: 'link'
        },
        {
          state: 'novedades',
          name: 'Novedades',
          type: 'link'
        },
        {
          state: 'evaluacionesdesempeño',
          name: 'Evaluaciones Desempeño',
          type: 'link'
        },
        {
          state: 'llegadastarde',
          name: 'Llegadas Tarde',
          type: 'link'
        },
        {
          state: 'alertascomunicaciones',
          name: 'Alertas y Comunicaciones',
          type: 'link'
        }                                                        
      ]
    },
    {
      state: 'comercial',          //EDITANDO
      short_label: 'CM',
      name: 'Comercial',
      type: 'sub',
      icon: 'ti-shopping-cart',
      children: [
        {
          state: 'metas',
          name: 'Metas',
          type: 'link'
        },  
        {
          state: 'metricas',
          name: 'Metricas',
          type: 'link'
        },  
        {
          state: 'actividades',
          name: 'Actividades',
          type: 'link'
        },  
        {
          state: 'rutas',
          name: 'Rutas',
          type: 'link'
        },  
        {
          state: 'consultadisponibilidad',
          name: 'Consulta Disponibilidad',
          type: 'link'
        }                                          
      ]
    },
    {
      state: 'configuracion',
      short_label: 'C',
      name: 'Configuración',
      type: 'sub',
      icon: 'ti-settings',
      children: [
        {
          state: 'base',
          name: 'Información Base',
          type: 'sub',
          children: [
            {
              state: 'funcionarios',
              name: 'Funcionarios'
            },
            {
              state: 'pacientes',
              name: 'Pacientes'
            },
            {
              state: 'clientes',
              name: 'Clientes'
            },
            {
              state: 'proveedores',
              name: 'Proveedores'
            },
           
            {
              state: 'productos',
              name: 'Productos'
            },
            {
              state: 'contratosclientes',
              name: 'Contratos Clientes'
            },
            {
              state: 'bodegas',
              name: 'Bodegas'
            },
            {
              state: 'puntosdispensacion',
              name: 'Puntos de Dispensación'
            },
            {
              state: 'dependencias',
              name: 'Dependencias'
            },
            {
              state: 'cargos',
              name: 'Cargos'
            },
            {
              state: 'grupos',
              name: 'Grupos'
            }
          ]
        },
        {
          state: 'configuracion',
          name: 'Configuración',
          type: 'sub',
          children: [
            {
              state: 'configuraciongeneral',
              name: 'Configuración General'
            },
            {
              state: 'departamentos',
              name: 'Departamentos'
            },
            {
              state: 'causalnoconforme',
              name: 'Causual No Conforme'
            },
            {
              state: 'municipios',
              name: 'Municipios'
            },
            {
              state: 'perfiles',
              name: 'Perfiles'
            },
            {
              state: 'tipodocumentos',
              name: 'Tipo Documentos'
            },
            {
              state: 'tiposervicios',
              name: 'Tipo Servicios'
            },
            {
              state: 'tiposnoconforme',
              name: 'Tipos No Conformes'
            },
            {
              state: 'causalesnopago',
              name: 'Causales no Pago'
            },
            {
              state: 'eps',
              name: 'EPS'
            },
            {
              state: 'niveles',
              name: 'Niveles'
            },
            {
              state: 'regimenes',
              name: 'Regímenes'
            },
            {
              state: 'codigoscie',
              name: 'Códigos CIE'
            },
            {
              state: 'tiposglosa',
              name: 'Tipos Glosa'
            },
            {
              state: 'codigoscum',
              name: 'Códigos CUM'
            },
            {
              state: 'listasganancia',
              name: 'Listas de Ganancia'
            },
            {
              state: 'resoluciones',
              name: 'Resoluciones'
            },
            {
              state: 'tiponovedades',
              name: 'Tipo de Novedades'

            }
          ]
        }
      ]
    },
    
  ],
  },
  
  
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
