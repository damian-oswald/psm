import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {ObExternalLinkModule} from '@oblique/oblique';
import {GRAPH} from '../../core/models';
import {RegistryService} from '../../core/registry.service';
import {LINDAS_ENDPOINT} from '../../core/sparql.service';

/** Explains where the data comes from and what its peculiarities mean for the display. */
@Component({
	selector: 'app-about',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ObExternalLinkModule, TranslatePipe],
	templateUrl: './about.html',
	styleUrl: './about.scss'
})
export class AboutPage {
	private readonly registry = inject(RegistryService);

	readonly endpoint = LINDAS_ENDPOINT;
	readonly graph = GRAPH;
	readonly modelUrl = 'https://agriculture.ld.admin.ch/plant-protection/shape/';

	readonly figures = computed(() => [
		{key: 'about.figure.products', value: this.registry.products().length},
		{key: 'about.figure.substances', value: this.registry.substances().size},
		{key: 'about.figure.crops', value: this.registry.crops().size},
		{key: 'about.figure.pests', value: this.registry.pests().size},
		{key: 'about.figure.obligations', value: this.registry.obligations().size},
		{key: 'about.figure.holders', value: this.registry.holders().size}
	]);

	readonly notes = ['about.note.language', 'about.note.units', 'about.note.inheritance', 'about.note.effects'];
}
