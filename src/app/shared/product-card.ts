import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {admissionStatus} from '../core/format';
import {Product} from '../core/models';
import {RegistryService} from '../core/registry.service';
import {GhsPictogramComponent} from './ghs-pictogram';
import {StatusBadgeComponent} from './status-badge';

/**
 * One product in a result list, rendered as a card that is entirely a link.
 *
 * The card carries only what tells one result from another: the trade name and the federal
 * admission number people search by, what kind of product it is, whose it is, whether it
 * is still admitted, and the hazard pictograms — because whether a product bears the skull
 * or the environmental hazard is usually the next question after "which one". Everything
 * else the registry holds is a click away and would only make the grid harder to scan.
 */
@Component({
	selector: 'app-product-card',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [GhsPictogramComponent, MatCardModule, RouterLink, StatusBadgeComponent],
	template: `
		<a class="ob-link-card product-card" [routerLink]="['/products', product().id]">
			<mat-card appearance="outlined">
				<mat-card-content>
					<div class="product-card-head">
						<div class="product-card-title">
							<h2 class="product-card-name">{{ product().name }}</h2>
							<p class="product-card-meta">
								<span class="product-card-number app-numeric">{{ product().admissionNumber }}</span>
								@for (type of typeLabels(); track type) {
									<span class="product-card-separator" aria-hidden="true">·</span>
									<span>{{ type }}</span>
								}
							</p>
						</div>
						<app-status-badge class="product-card-status" [status]="status()" [compact]="true" />
					</div>

					<p class="product-card-holder">{{ product().holderName }}</p>

					<div class="product-card-pictograms">
						@for (pictogram of pictograms(); track pictogram.id) {
							<app-ghs-pictogram [code]="pictogram.code ?? ''" [label]="pictogram.label" [size]="28" />
						}
					</div>
				</mat-card-content>
			</mat-card>
		</a>
	`,
	styles: `
		:host {
			display: block;
		}

		.product-card {
			display: block;
			height: 100%;
			color: inherit;
		}

		mat-card {
			height: 100%;
			border-radius: var(--app-radius);
		}

		mat-card-content {
			display: flex;
			flex-direction: column;
			gap: 0.375rem;
			height: 100%;
			padding: 1rem 1.125rem 0.875rem;
		}

		.product-card-head {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 0.75rem;
		}

		.product-card-title {
			min-width: 0;
		}

		.product-card-name {
			margin: 0;
			font-size: 1.0625rem;
			font-weight: 700;
			line-height: 1.3;
		}

		/*
		 * Products carry up to three types. The line wraps freely, and the word breaking
		 * that Oblique sets on the body is turned off here so that a type name moves to the
		 * next line whole instead of being cut in half.
		 */
		.product-card-meta {
			margin: 0.125rem 0 0;
			font-size: 0.8125rem;
			color: var(--app-text-muted);
			word-break: normal;
			overflow-wrap: normal;
		}

		.product-card-number {
			font-weight: 600;
			/* The admission number is one token; it must not break at its hyphen. */
			white-space: nowrap;
		}

		.product-card-separator {
			margin: 0 0.375rem;
		}

		.product-card-holder {
			margin: 0;
			font-size: 0.875rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.product-card-status {
			flex: none;
		}

		/* Reserves the row whether or not the product bears a pictogram, so that the cards
		   of one row end at the same height. */
		.product-card-pictograms {
			display: flex;
			gap: 0.25rem;
			margin-top: auto;
			padding-top: 0.5rem;
			min-height: 1.75rem;
		}
	`
})
export class ProductCardComponent {
	private readonly registry = inject(RegistryService);

	readonly product = input.required<Product>();

	readonly status = computed(() => admissionStatus(this.product()));

	readonly typeLabels = computed(() => {
		const types = this.registry.productTypes();
		return this.product().types.map(id => types.get(id)?.label ?? id);
	});

	readonly pictograms = computed(() => {
		const elements = this.registry.labelElements();
		return this.product()
			.labelElements.map(id => elements.get(id))
			.filter(element => element?.kind === 'HazardPictogram')
			.map(element => element!)
			.sort((left, right) => (left.code ?? '').localeCompare(right.code ?? ''));
	});
}
