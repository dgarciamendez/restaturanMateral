import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { PedidosComponent } from './feature/pedidos/pedidos.component';
import { MesaDetailComponent } from './feature/pedidos/components/mesa-detail/mesa-detail.component';
import { DomicilioComponent } from './feature/domicilio/domicilio.component';
import { CajaFeatureComponent } from './feature/caja/caja-feature.component';
import { ConfiguracionComponent } from './feature/configuracion/configuracion.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'pedidos', pathMatch: 'full' },
            { path: 'pedidos', component: PedidosComponent },
            { path: 'pedidos/mesa/:id', component: MesaDetailComponent },
            { path: 'domicilio', component: DomicilioComponent },
            { path: 'caja', component: CajaFeatureComponent },
            { path: 'configuracion', component: ConfiguracionComponent },
            { path: 'otros/pagina1', component: PedidosComponent },
            { path: 'otros/pagina2', component: PedidosComponent },
            { path: 'otros/pagina3', component: PedidosComponent },
        ]
    }
];
