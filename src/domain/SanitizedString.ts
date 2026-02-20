export type TextFormat = 'none' | 'lowercase' | 'uppercase' | 'slug';

export class SanitizedString {
    private readonly rawText: string;

    constructor(rawText: string) {
        this.rawText = rawText;
    }

    private stripSpecialCharacters(text: string): string {
        if (!text) {
            return '';
        }

        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s]/g, '');
    }

    public format(formatType: TextFormat): string {
        const cleanText = this.stripSpecialCharacters(this.rawText);

        if (formatType === 'lowercase') {
            return cleanText.toLowerCase();
        }

        if (formatType === 'uppercase') {
            return cleanText.toUpperCase();
        }

        if (formatType === 'slug') {
            return cleanText.trim().toLowerCase().replace(/\s+/g, '-');
        }

        return cleanText;
    }

    public getWordCount(): number {
        if (!this.rawText.trim()) {
            return 0;
        }
        return this.rawText.trim().split(/\s+/).length;
    }

    public getCharCount(): number {
        return this.rawText.length;
    }
}