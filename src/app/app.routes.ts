import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { PedidosComponent } from './feature/pedidos/pedidos.component';
import { DomicilioComponent } from './feature/domicilio/domicilio.component';
import { CajaComponent } from './feature/caja/caja.component';
import { ConfiguracionComponent } from './feature/configuracion/configuracion.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'pedidos', pathMatch: 'full' },
            { path: 'pedidos', component: PedidosComponent },
            { path: 'domicilio', component: DomicilioComponent },
            { path: 'caja', component: CajaComponent },
            { path: 'configuracion', component: ConfiguracionComponent },
            { path: 'otros/pagina1', component: PedidosComponent },
            { path: 'otros/pagina2', component: PedidosComponent },
            { path: 'otros/pagina3', component: PedidosComponent },
        ]
    }
];
