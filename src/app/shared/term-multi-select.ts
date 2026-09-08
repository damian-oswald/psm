import {ChangeDetectionStrategy, Component, computed, input, model} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {TranslatePipe} from '@ngx-translate/core';
import {Term} from '../core/models';

/**
 * Picks any number of terms out of a short code list, as a dropdown.
 *
 * Used where the whole list fits in a panel — product type, application area, admission
 * type, status, country of production. Each option carries the number of products behind
 * it, counted against the other filters, so an empty result is visible before it is chosen.
 */
@Component({
	selector: 'app-term-multi-select',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatFormFieldModule, MatSelectModule, TranslatePipe],
	template: `
		<mat-form-field subscriptSizing="dynamic">
			<mat-label>{{ labelKey() | translate }}</mat-label>
			<mat-select
				multiple
				[value]="selected()"
				(valueChange)="selected.set($event)"
				[panelClass]="'ob-select-panel-sm'"
			>
				<mat-select-trigger>{{ triggerLabel() }}</mat-select-trigger>
				@for (option of options(); track option.id) {
					<mat-option [value]="option.id" [disabled]="option.count === 0 && !selected().includes(option.id)">
						<span class="option">
							<span class="option-label">{{ option.label }}</span>
							@if (option.count !== undefined) {
								<span class="option-count app-numeric">{{ option.count }}</span>
							}
						</span>
					</mat-option>
				}
			</mat-select>
		</mat-form-field>
	`,
	styles: `
		mat-form-field {
			width: 100%;
		}

		.option {
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			gap: 1rem;
		}

		.option-count {
			color: var(--app-text-muted);
			font-size: 0.75rem;
		}
	`
})
export class TermMultiSelectComponent {
	readonly labelKey = input.required<string>();
	readonly options = input.required<Term[]>();
	readonly selected = model<string[]>([]);
	/** Beyond this many choices the trigger counts them instead of listing them. */
	readonly maxNamesInTrigger = input(2);

	private readonly byId = computed(() => new Map(this.options().map(term => [term.id, term])));

	readonly triggerLabel = computed(() => {
		const selected = this.selected();
		if (selected.length > this.maxNamesInTrigger()) {
			return `${selected.length}`;
		}
		return selected.map(id => this.byId().get(id)?.label ?? id).join(', ');
	});
}
