import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {AdmissionStatus} from '../core/format';

/** Shows whether a product is still admitted, running out, or past its use-up period. */
@Component({
	selector: 'app-status-badge',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TranslatePipe],
	template: `
		@if (status() !== 'authorised' || !compact()) {
			<span class="status" [class]="'status-' + status()" [title]="'status.' + status() | translate">
				<span class="status-dot" aria-hidden="true"></span>
				{{ (compact() ? 'status.short.' : 'status.') + status() | translate }}
			</span>
		}
	`,
	styles: `
		.status {
			display: inline-flex;
			align-items: center;
			gap: 0.375rem;
			padding: 0.125rem 0.5rem 0.125rem 0.375rem;
			border-radius: 999px;
			border: 1px solid currentcolor;
			font-size: 0.75rem;
			font-weight: 600;
			line-height: 1.4;
			white-space: nowrap;
		}

		.status-dot {
			width: 0.5rem;
			height: 0.5rem;
			border-radius: 50%;
			background: currentcolor;
		}

		.status-authorised {
			color: #047857;
		}

		.status-expiring {
			color: #c2410c;
		}

		.status-expired {
			color: #99191e;
		}
	`
})
export class StatusBadgeComponent {
	readonly status = input.required<AdmissionStatus>();
	/** Hides the badge for products that are simply admitted, to keep result lists calm. */
	readonly compact = input(false);
}
