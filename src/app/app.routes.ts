import {Routes} from '@angular/router';
import {ObUnknownRouteComponent} from '@oblique/oblique';

export const routes: Routes = [
	{path: '', pathMatch: 'full', redirectTo: 'products'},
	{
		path: 'products',
		loadComponent: async () => (await import('./pages/product-search/product-search')).ProductSearchPage
	},
	{
		path: 'products/:id',
		loadComponent: async () => (await import('./pages/product-detail/product-detail')).ProductDetailPage
	},
	{
		path: 'query',
		loadComponent: async () => (await import('./pages/advanced-query/advanced-query')).AdvancedQueryPage
	},
	{
		path: 'about',
		loadComponent: async () => (await import('./pages/about/about')).AboutPage
	},
	{path: '**', component: ObUnknownRouteComponent}
];
