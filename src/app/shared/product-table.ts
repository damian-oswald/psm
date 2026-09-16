import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {AdmissionStatus, admissionStatus} from '../core/format';
import {Product} from '../core/models';
import {RegistryService} from '../core/registry.service';
import {StatusBadgeComponent} from './status-badge';

/** One product laid out for a table row, its lists resolved to labelled terms. */
interface Row {
	product: Product;
	status: AdmissionStatus;
	categories: string[];
	activeSubstances: string;
}

/**
 * A result list as a table: one product per row, to compare products column by column.
 *
 * It shows what a card shows but the pictograms — name and admission number, category,
 * holder, status — and adds the active substances, which a row has the width for. A
 * product can belong to several categories, which are named as chips; its active substances
 * are listed as text, as the product page lists them. Crops and pests are left to the
 * product page: a single indication can name 44 crops, which no cell can carry.
 */
@Component({
	selector: 'app-product-table',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatChipsModule, RouterLink, StatusBadgeComponent, TranslatePipe],
	template: `
		<div class="app-scroll-x product-table-scroll">
			<table class="ob-table ob-table-sm product-table">
				<thead>
					<tr>
						<th scope="col">{{ 'product.name' | translate }}</th>
						<th scope="col">{{ 'product.category' | translate }}</th>
						<th scope="col">{{ 'product.holder' | translate }}</th>
						<th scope="col">{{ 'product.activeSubstances' | translate }}</th>
						<th scope="col">{{ 'filter.status' | translate }}</th>
					</tr>
				</thead>
				<tbody>
					@for (row of rows(); track row.product.id) {
						<tr>
							<th scope="row" class="product-table-name">
								<a [routerLink]="['/products', row.product.id]">
									{{ row.product.name }}
									<span class="product-table-number">({{ row.product.admissionNumber }})</span>
								</a>
							</th>
							<td>
								<mat-chip-set class="product-table-chips">
									@for (category of row.categories; track category) {
										<mat-chip disableRipple>{{ category }}</mat-chip>
									}
								</mat-chip-set>
							</td>
							<td>{{ row.product.holderName }}</td>
							<td>{{ row.activeSubstances }}</td>
							<td><app-status-badge [status]="row.status" [compact]="true" /></td>
						</tr>
					}
				</tbody>
			</table>
		</div>
	`,
	styles: `
		:host {
			display: block;
		}

		.product-table-scroll {
			background: var(--app-surface);
			border: var(--app-border);
			border-radius: var(--app-radius);
		}

		/* Smaller than body text, so that seven columns fit beside the filter panel. */
		.product-table {
			width: 100%;
			margin: 0;
			font-size: 0.875rem;

			th,
			td {
				vertical-align: middle;
			}
		}

		.product-table-name {
			font-weight: 700;
		}

		/* The admission number is one token; it must not break at its hyphen. */
		.product-table-number {
			font-weight: 400;
			white-space: nowrap;
		}

		/* Chips wrap within their cell, and a name moves to the next line whole. */
		.product-table-chips {
			word-break: normal;
			overflow-wrap: normal;
		}

		/*
		 * Oblique's chips, compact enough for a table row. Oblique sets its sizes on the chip
		 * itself, so they are overridden there. These chips only name things; they do not
		 * react to the pointer as if they could be clicked.
		 */
		.product-table-chips mat-chip {
			--mat-chip-container-height: 1.375rem;
			--mat-chip-label-text-size: 0.75rem;
			margin: 0.125rem 0.25rem 0.125rem 0;
			pointer-events: none;
		}

	`
})
export class ProductTableComponent {
	private readonly registry = inject(RegistryService);

	readonly products = input.required<Product[]>();

	readonly rows = computed<Row[]>(() => {
		const types = this.registry.productTypes();
		const substances = this.registry.substances();
		const active = this.registry.activeSubstances();
		return this.products().map(product => ({
			product,
			status: admissionStatus(product),
			categories: product.types.map(id => types.get(id)?.label ?? id),
			activeSubstances: product.substances
				.filter(id => active.has(id))
				.map(id => substances.get(id)?.label ?? id)
				.sort((left, right) => left.localeCompare(right))
				.join(', ')
		}));
	});
}
