import {ChangeDetectionStrategy, Component, ElementRef, computed, input, model, signal, viewChild} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {TranslatePipe} from '@ngx-translate/core';
import {Term} from '../core/models';

/** Above this many options the panel gets a field to narrow them down with. */
const SEARCH_THRESHOLD = 12;

/** How many options the panel renders at once; the rest are reached by narrowing. */
const PANEL_LIMIT = 100;

/**
 * Picks terms out of a code list, as a dropdown.
 *
 * With {@link multiple} it holds any number of terms and names them all in its trigger,
 * comma separated; without it, it holds one and offers an empty option to let go of it
 * again. The selection is handed over as a list either way, so that a caller can treat
 * both kinds of field alike. Each option carries the number of products behind it, counted
 * against the filters already set, so an empty result is visible before it is chosen.
 *
 * The registry's code lists are long — 524 pests, 449 substances, 326 crops — so a panel
 * with more than a handful of options grows a field to narrow them down with, and renders
 * at most a hundred of what matches. Whatever is chosen is always rendered, however the
 * list is narrowed: a selected option that vanished from the panel would take its value
 * with it, because the dropdown reads its selection off the options it can see.
 */
@Component({
	selector: 'app-term-dropdown',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatFormFieldModule, MatIconModule, MatSelectModule, TranslatePipe],
	template: `
		<mat-form-field subscriptSizing="dynamic" floatLabel="always">
			<mat-label>{{ labelKey() | translate }}</mat-label>
			<mat-select
				[multiple]="multiple()"
				[placeholder]="'filter.any' | translate"
				[value]="value()"
				(valueChange)="onValue($event)"
				(openedChange)="onOpened($event)"
				[panelClass]="'ob-select-panel-sm app-term-panel'"
			>
				<mat-select-trigger>{{ triggerLabel() || ('filter.any' | translate) }}</mat-select-trigger>

				@if (searchable()) {
					<div class="term-search" (click)="$event.stopPropagation()">
						<mat-icon svgIcon="search" />
						<input
							#searchField
							type="text"
							autocomplete="off"
							[attr.aria-label]="'common.filterOptions' | translate"
							[placeholder]="'common.filterOptions' | translate"
							[value]="search()"
							(input)="onSearch($event)"
							(keydown)="onSearchKey($event)"
						/>
					</div>
				}

				@if (!multiple()) {
					<mat-option value="">{{ 'filter.any' | translate }}</mat-option>
				}
				@for (option of visibleOptions(); track option.id) {
					<mat-option
						[value]="option.id"
						[title]="option.label"
						[disabled]="option.count === 0 && !selected().includes(option.id)"
					>
						<span class="option">
							<span class="option-label">{{ option.label }}</span>
							@if (option.count !== undefined) {
								<span class="option-count app-numeric">{{ option.count }}</span>
							}
						</span>
					</mat-option>
				}
				@if (hiddenCount()) {
					<mat-option disabled>
						<span class="option-more">{{ 'common.moreOptions' | translate: {count: hiddenCount()} }}</span>
					</mat-option>
				}
			</mat-select>
		</mat-form-field>
	`,
	styles: `
		mat-form-field {
			width: 100%;
		}

		.term-search {
			position: sticky;
			top: 0;
			z-index: 1;
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin: -0.5rem 0 0.25rem;
			padding: 0.5rem 0.75rem;
			background: var(--app-surface, #fff);
			border-bottom: var(--app-border);

			input {
				flex: 1;
				min-width: 0;
				border: 0;
				background: none;
				font: inherit;
				color: inherit;

				&:focus {
					outline: none;
				}
			}

			mat-icon {
				flex-shrink: 0;
				color: var(--app-text-muted);
			}
		}

		.option {
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			gap: 1rem;
		}

		.option-label {
			min-width: 0;
		}

		.option-count {
			flex: 0 0 auto;
			color: var(--app-text-muted);
			font-size: 0.75rem;
		}

		.option-more {
			color: var(--app-text-muted);
			font-size: 0.75rem;
			font-style: italic;
		}
	`
})
export class TermDropdownComponent {
	readonly labelKey = input.required<string>();
	readonly options = input.required<Term[]>();
	readonly selected = model<string[]>([]);
	/** Whether the field holds several terms at once; fixed for the life of the field. */
	readonly multiple = input(true);

	protected readonly search = signal('');

	private readonly searchField = viewChild<ElementRef<HTMLInputElement>>('searchField');

	private readonly byId = computed(() => new Map(this.options().map(term => [term.id, term])));

	readonly searchable = computed(() => this.options().length > SEARCH_THRESHOLD);

	readonly value = computed(() => (this.multiple() ? this.selected() : (this.selected()[0] ?? '')));

	readonly triggerLabel = computed(() =>
		this.selected()
			.map(id => this.byId().get(id)?.label ?? id)
			.join(', ')
	);

	/** What matches the panel's own search, capped, plus everything already chosen. */
	private readonly matchingOptions = computed(() => {
		const needle = this.search().trim().toLowerCase();
		return needle ? this.options().filter(option => option.label.toLowerCase().includes(needle)) : this.options();
	});

	readonly visibleOptions = computed(() => {
		const shown = this.matchingOptions().slice(0, PANEL_LIMIT);
		const rendered = new Set(shown.map(option => option.id));
		const missing = this.selected()
			.filter(id => !rendered.has(id))
			.map(id => this.byId().get(id) ?? {id, label: id});
		return [...shown, ...missing];
	});

	readonly hiddenCount = computed(() => Math.max(0, this.matchingOptions().length - PANEL_LIMIT));

	onValue(value: string | string[]): void {
		this.selected.set(typeof value === 'string' ? (value ? [value] : []) : value);
	}

	onSearch(event: Event): void {
		this.search.set((event.target as HTMLInputElement).value);
	}

	/**
	 * Keeps the dropdown's own keyboard handling out of the search field.
	 *
	 * A letter typed into the field would otherwise reach the dropdown's type-ahead and
	 * jump to an option; the keys that move through the list and close the panel are let
	 * through, so that a term can be reached without leaving the field.
	 */
	onSearchKey(event: KeyboardEvent): void {
		if (!['ArrowDown', 'ArrowUp', 'Enter', 'Escape', 'Tab'].includes(event.key)) {
			event.stopPropagation();
		}
	}

	onOpened(opened: boolean): void {
		this.search.set('');
		if (opened) {
			// The panel is rendered into an overlay, so it can only be focused once it is there.
			setTimeout(() => this.searchField()?.nativeElement.focus());
		}
	}
}
