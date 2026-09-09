import {ChangeDetectionStrategy, Component, input, linkedSignal} from '@angular/core';

/** Folder holding the bundled GHS pictogram SVGs, named `GHS01.svg` … `GHS09.svg`. */
const PICTOGRAM_BASE = 'assets/ghs';

/**
 * A GHS hazard pictogram, shown as the official UN symbol on a transparent canvas.
 *
 * The graph names its pictograms (`GHS02`, `GHS07`, …) but carries no `schema:image`, so
 * the image is addressed by that code. The SVGs are the public-domain drawings from
 * Wikimedia Commons, bundled under `src/assets/ghs`; only the diamond interior is white,
 * as the standard requires, and everything around it is transparent. If a code has no
 * matching file, the code itself is drawn inside the standard rhombus, which keeps the
 * hazard legible instead of leaving a gap.
 */
@Component({
	selector: 'app-ghs-pictogram',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (failed()) {
			<svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 100 100" role="img" [attr.aria-label]="label()">
				<title>{{ label() }}</title>
				<path d="M50 2 98 50 50 98 2 50Z" class="frame" />
				<text x="50" y="50" text-anchor="middle" dominant-baseline="central" class="code">{{ code() }}</text>
			</svg>
		} @else {
			<img
				class="pictogram"
				[src]="source()"
				[width]="size()"
				[height]="size()"
				[alt]="label()"
				[title]="label()"
				loading="lazy"
				decoding="async"
				(error)="failed.set(true)"
			/>
		}
	`,
	styles: `
		:host {
			display: inline-flex;
			flex: none;
		}

		.pictogram {
			display: block;
			object-fit: contain;
		}

		.frame {
			fill: #fff;
			stroke: #d0021b;
			stroke-width: 7;
			stroke-linejoin: miter;
		}

		.code {
			fill: #1c2834;
			font-size: 20px;
			font-weight: 700;
		}
	`
})
export class GhsPictogramComponent {
	readonly code = input.required<string>();
	readonly label = input<string>('');
	readonly size = input(48);

	/** Reset when the component is reused for another pictogram in a re-rendered list. */
	readonly failed = linkedSignal({source: this.code, computation: () => false});

	source(): string {
		return `${PICTOGRAM_BASE}/${encodeURIComponent(this.code())}.svg`;
	}
}
