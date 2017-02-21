declare module 'humanize-duration' {
    type WordResolver = (c: number) => string;

    export interface Language {
        y: string | WordResolver;
        mo: string | WordResolver;
        w: string | WordResolver;
        d: string | WordResolver;
        h: string | WordResolver;
        m: string | WordResolver;
        s: string | WordResolver;
        ms: string | WordResolver;
        decimal: string | WordResolver;
    }

    export interface UnitMeasures {
        d: number;
        h: number;
        m: number;
        mo: number;
        ms: number;
        s: number;
        w: number;
        y: number;
    }

    export interface HumanizerOptions {
        /**
         * Language for unit display (accepts an ISO 639-1 code from one of the supported languages).
         */
        language?: string;
        /**
         * String to display between the previous unit and the next value.
         */
        delimiter?: string;
        /**
         * String to display between each value and unit.
         */
        spacer?: string;
        /**
         * Number representing the maximum number of units to display for the duration.
         */
        largest?: number;
        /**
         * Array of strings to define which units are used to display the duration (if needed). 
         * Can be one, or a combination of any, of the following: ['y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms']
         */
        units?: string[];
        /**
         * Boolean value. Use true to round the smallest unit displayed (can be combined with largest and units).
         */
        round?: boolean;
        /**
         * String to substitute for the decimal point in a decimal fraction.
         */
        decimal?: string;
        /**
         * String to include before the final unit. You can also set serialComma to false to eliminate the final comma.
         */
        conjunction?: string;
        serialComma?: boolean;
        /**
         * Customize the value used to calculate each unit of time.
         */
        unitMeasures?: UnitMeasures;
    }

    export interface Humanizer {
        (ms: number, humanizerOptions?: HumanizerOptions): string;
    }

    export interface HumanizeDuration {
        (ms: number, humanizerOptions?: HumanizerOptions): string;
        getSupportedLanguages(): string[];
        humanizer(passedOptions: HumanizerOptions): Humanizer;
    }

    const humanizeDuration: HumanizeDuration;

    export default humanizeDuration;
}

