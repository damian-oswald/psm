import {Component, inject, signal} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ObINavigationLink, ObMasterLayoutConfig, ObMasterLayoutModule} from '@oblique/oblique';
import {RegistryService} from './core/registry.service';

@Component({
	selector: 'app-root',
	imports: [ObMasterLayoutModule, TranslatePipe],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App {
	private readonly registry = inject(RegistryService);
	private readonly translate = inject(TranslateService);

	readonly year = signal(new Date().getFullYear());

	readonly navigation: ObINavigationLink[] = [
		{url: 'products', label: 'nav.search'},
		{url: 'query', label: 'nav.query'},
		{url: 'about', label: 'nav.about'}
	];

	constructor() {
		const config = inject(ObMasterLayoutConfig);
		config.homePageRoute = '/products';
		config.layout.hasMaxWidth = false;
		config.header.isSticky = true;
		config.header.serviceNavigation.displayLanguages = true;
		config.header.serviceNavigation.displayApplications = false;
		config.header.serviceNavigation.displayAuthentication = false;
		config.header.serviceNavigation.displayInfo = false;
		config.header.serviceNavigation.displayMessage = false;
		config.header.serviceNavigation.displayProfile = false;

		this.translate.onLangChange.subscribe(() => this.updateTitle());
		this.updateTitle();
		this.registry.load();
	}

	private updateTitle(): void {
		document.title = this.translate.instant('app.title') as string;
	}
}
