import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {ObSpinnerService} from '@oblique/oblique';
import {Observable, defer, map, shareReplay, throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';

/** A single cell of a SPARQL result set. */
export interface SparqlValue {
	type: 'uri' | 'literal' | 'bnode';
	value: string;
	'xml:lang'?: string;
	datatype?: string;
}

export type SparqlRow = Record<string, SparqlValue | undefined>;

export interface SparqlResults {
	head: {vars: string[]};
	results: {bindings: SparqlRow[]};
}

/** A plain row where every bound variable is reduced to its string value. */
export type Row = Record<string, string>;

export const LINDAS_ENDPOINT = 'https://lindas.admin.ch/query';
/** Zazuko's SPARQL GUI, used to offer generated queries for inspection. */
export const LINDAS_GUI = 'https://lindas.admin.ch/sparql';

/**
 * Thin client for the LINDAS SPARQL endpoint.
 *
 * Responses are cached per query text for the lifetime of the session, because the
 * registry is republished at most daily and every page re-issues the same handful of
 * queries. The endpoint answers gzipped, so the caching is about latency, not bandwidth.
 */
@Injectable({providedIn: 'root'})
export class SparqlService {
	private readonly http = inject(HttpClient);
	private readonly spinner = inject(ObSpinnerService);
	private readonly cache = new Map<string, Observable<Row[]>>();

	/** Runs `query` and reduces every binding to its string value. */
	query(query: string, options: {cache?: boolean} = {}): Observable<Row[]> {
		const cacheable = options.cache !== false;
		const cached = cacheable ? this.cache.get(query) : undefined;
		if (cached) {
			return cached;
		}
		// Every request raises Oblique's spinner, so that any wait on the endpoint is visible
		// wherever it happens. `defer` ties that to the subscription rather than to building
		// the observable, and `finalize` lowers it again on success and on failure alike.
		const request = defer(() => {
			this.setSpinner(true);
			return this.http.post<SparqlResults>(LINDAS_ENDPOINT, new HttpParams({fromObject: {query}}).toString(), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Accept: 'application/sparql-results+json'
				}
			});
		}).pipe(
			map(results => results.results.bindings.map(binding => toRow(binding))),
			catchError((error: HttpErrorResponse) => throwError(() => new Error(describe(error)))),
			finalize(() => this.setSpinner(false)),
			shareReplay({bufferSize: 1, refCount: false})
		);
		if (cacheable) {
			this.cache.set(query, request);
		}
		return request;
	}

	/**
	 * Raises or lowers the spinner after the current rendering pass.
	 *
	 * Queries are started from constructors and from effects, both of which run while
	 * Angular is checking the view. Toggling the spinner there would change the master
	 * layout in the middle of that check, so the call is deferred by a turn; the queue
	 * preserves the order, and a request that resolves instantly still pairs correctly.
	 */
	private setSpinner(active: boolean): void {
		setTimeout(() => (active ? this.spinner.activate() : this.spinner.deactivate()));
	}

	/** Builds a link that opens `query` in the public LINDAS query editor. */
	guiLink(query: string): string {
		return `${LINDAS_GUI}#query=${encodeURIComponent(query)}`;
	}
}

function toRow(binding: SparqlRow): Row {
	const row: Row = {};
	for (const [key, cell] of Object.entries(binding)) {
		if (cell) {
			row[key] = cell.value;
		}
	}
	return row;
}

function describe(error: HttpErrorResponse): string {
	if (error.status === 0) {
		return 'lindas.unreachable';
	}
	const detail = typeof error.error === 'string' ? error.error.split('\n')[0] : error.message;
	return `${error.status}: ${detail}`;
}

/** Splits a `GROUP_CONCAT` result into its parts, dropping empties. */
export function splitList(value: string | undefined, separator = ','): string[] {
	return (value ?? '')
		.split(separator)
		.map(part => part.trim())
		.filter(part => part.length > 0);
}
