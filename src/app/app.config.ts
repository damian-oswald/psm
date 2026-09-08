import {provideHttpClient} from '@angular/common/http';
import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';
import {provideObliqueConfiguration} from '@oblique/oblique';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(
			routes,
			withComponentInputBinding(),
			withInMemoryScrolling({scrollPositionRestoration: 'top', anchorScrolling: 'enabled'})
		),
		provideHttpClient(),
		provideObliqueConfiguration({
			accessibilityStatement: {
				applicationName: 'Pflanzenschutzmittelverzeichnis',
				createdOn: new Date('2026-09-08'),
				// A demonstration: the operating office and its contact details are invented.
				applicationOperator: 'Bundesamt für XYZ, Musterstrasse 1, 3003 Bern',
				contact: [{email: 'info@xyz.admin.ch'}, {phone: '+41 58 000 00 00'}],
				conformity: 'partial',
				exceptions: [
					'Die Gefahrenpiktogramme werden als vereinfachte Zeichnungen dargestellt, da der Datensatz keine Bilddateien enthält. Jedes Piktogramm trägt eine Textalternative.'
				]
			},
			translate: {
				locales: {
					locales: ['de-CH', 'fr-CH', 'it-CH', 'en-US'],
					defaultLanguage: 'de',
					disabled: false,
					languages: {de: 'Deutsch', fr: 'Français', it: 'Italiano', en: 'English'}
				}
			},
			material: {
				MAT_FORM_FIELD_DEFAULT_OPTIONS: {appearance: 'outline', subscriptSizing: 'dynamic'},
				MAT_CHECKBOX_OPTIONS: {color: 'primary'}
			},
			icon: {registerObliqueIcons: true}
		})
	]
};
