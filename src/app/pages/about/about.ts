import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {ObExternalLinkModule} from '@oblique/oblique';
import {GRAPH} from '../../core/models';
import {RegistryService} from '../../core/registry.service';
import {LINDAS_ENDPOINT} from '../../core/sparql.service';

/** Stands in for a count that the registry has not delivered, or could not deliver. */
const UNKNOWN = '–';

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
	/** The SHACL shapes the registry is published against, in the office's own repository. */
	readonly modelUrl = 'https://github.com/BLV-OSAV-USAV/PSMV-RDF/blob/main/rdf/shapes/data_shape.ttl';
	readonly sourceUrl = 'https://github.com/damian-oswald/psm';

	/**
	 * The counts behind the registry, or a dash for each of them.
	 *
	 * Every count is the size of a collection the registry service fills once its queries
	 * return, so before that — and after a failed load — they are all legitimately zero.
	 * Showing that zero would state something false about the registry, so the figures are
	 * only given once the load has succeeded and stand as a dash until then.
	 */
	readonly figures = computed(() => {
		const ready = this.registry.status() === 'ready';
		const counts: [string, number][] = [
			['about.figure.products', this.registry.products().length],
			['about.figure.substances', this.registry.substances().size],
			['about.figure.crops', this.registry.crops().size],
			['about.figure.pests', this.registry.pests().size],
			['about.figure.obligations', this.registry.obligations().size],
			['about.figure.holders', this.registry.holders().size]
		];
		return counts.map(([key, count]) => ({key, value: ready ? String(count) : UNKNOWN, known: ready}));
	});

	readonly notes = ['about.note.language', 'about.note.units', 'about.note.inheritance', 'about.note.effects'];
}
