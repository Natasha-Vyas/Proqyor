import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent)
  },
  {
    path: 'reliable-supply',
    loadComponent: () => import('./pages/reliable-supply/reliable-supply').then(m => m.ReliableSupplyComponent)
  },
  {
    path: 'project-control',
    loadComponent: () => import('./pages/project-control/project-control').then(m => m.ProjectControlComponent)
  },
  {
    path: 'scalable-capacity',
    loadComponent: () => import('./pages/scalable-capacity/scalable-capacity').then(m => m.ScalableCapacityComponent)
  },
  {
    path: 'cost-optimization',
    loadComponent: () => import('./pages/cost-optimization/cost-optimization').then(m => m.CostOptimizationComponent)
  },
  {
    path: 'service/:id',
    loadComponent: () => import('./pages/service-detail/service-detail').then(m => m.ServiceDetailComponent)
  },
  {
    path: 'products/:family',
    loadComponent: () => import('./pages/products/products').then(m => m.ProductsComponent),
    runGuardsAndResolvers: 'paramsChange'
  }
];
