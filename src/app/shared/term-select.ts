import {ChangeDetectionStrategy, Component, computed, input, model, signal, viewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {ObAutocompleteComponent, ObIAutocompleteInputOption} from '@oblique/oblique';
import {fullTermLabel, shortTermLabel} from '../core/format';
import {Term} from '../core/models';

/** How many options the panel offers; the rest are reached by typing. */
const PANEL_LIMIT = 60;

/**
 * Picks any number of terms out of a code list, by typing rather than by scrolling.
 *
 * The registry's code lists run to 1466 obligations and 524 pests, which no dropdown can
 * present usefully. Oblique's autocomplete does the typing part and underlines the part of
 * each option that matched; the running selection is shown below it as removable chips.
 *
 * The options handed to the autocomplete are pre-filtered and capped, because a panel
 * holding every obligation would put a thousand options into the DOM at once. The filter
 * is the same case-insensitive substring test the autocomplete applies internally, so the
 * two never disagree about what matches.
 */
@Component({
	selector: 'app-term-select',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FormsModule, MatChipsModule, MatIconModule, ObAutocompleteComponent, TranslatePipe],
	template: `
		<div class="term-select">
			<ob-autocomplete
				[inputLabelKey]="labelKey()"
				[noResultKey]="'common.noOption'"
				[autocompleteOptions]="autocompleteOptions()"
				[displayWith]="display"
				[ngModel]="null"
				[name]="labelKey()"
				(ngModelChange)="onInput($event)"
				(selectedOptionChange)="add($event)"
			/>

			@if (selectedTerms().length) {
				<mat-chip-set class="term-select-chips" [attr.aria-label]="labelKey() | translate">
					@for (term of selectedTerms(); track term.id) {
						<mat-chip [title]="fullLabel(term)" (removed)="remove(term.id)">
							{{ chipLabel(term) }}
							<button matChipRemove [attr.aria-label]="fullLabel(term)">
								<mat-icon svgIcon="xmark" />
							</button>
						</mat-chip>
					}
				</mat-chip-set>
			}
		</div>
	`,
	styles: `
		.term-select {
			display: block;
		}

		.term-select-chips {
			margin-top: 0.25rem;
		}

		mat-chip {
			font-size: 0.8125rem;
		}
	`
})
export class TermSelectComponent {
	/** Translation key of the field label; Oblique's autocomplete translates it itself. */
	readonly labelKey = input.required<string>();
	readonly options = input.required<Term[]>();
	readonly selected = model<string[]>([]);

	private readonly autocomplete = viewChild.required(ObAutocompleteComponent);
	private readonly search = signal('');

	private readonly byId = computed(() => new Map(this.options().map(term => [term.id, term])));

	readonly selectedTerms = computed(() => this.selected().map(id => this.byId().get(id) ?? {id, label: id}));

	readonly autocompleteOptions = computed<ObIAutocompleteInputOption<Term>[]>(() => {
		const needle = this.search().trim().toLowerCase();
		const chosen = new Set(this.selected());
		const available = this.options().filter(term => !chosen.has(term.id));
		const matching = needle ? available.filter(term => this.display(term).toLowerCase().includes(needle)) : available;
		return matching.slice(0, PANEL_LIMIT).map(term => ({label: term}));
	});

	/** Renders a term for both the input and the option list; also drives the filtering. */
	readonly display = (term: Term | string | null): string => {
		if (!term || typeof term === 'string') {
			return '';
		}
		return term.code ? `${term.code} · ${term.label}` : term.label;
	};

	chipLabel(term: Term): string {
		return shortTermLabel(term);
	}

	fullLabel(term: Term): string {
		return fullTermLabel(term);
	}

	onInput(value: Term | string | null): void {
		this.search.set(typeof value === 'string' ? value : '');
	}

	add(option: ObIAutocompleteInputOption<Term>): void {
		const id = option.label.id;
		if (!this.selected().includes(id)) {
			this.selected.update(ids => [...ids, id]);
		}
		this.clearInput();
	}

	remove(id: string): void {
		this.selected.update(ids => ids.filter(other => other !== id));
	}

	private clearInput(): void {
		this.search.set('');
		// The autocomplete keeps the picked term in its input; a multiple choice needs it empty.
		this.autocomplete().writeValue(null as unknown as Term);
	}
}
