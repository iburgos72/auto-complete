import { getHighlightedText } from './';

describe('getHighlightedText function', () => {
    it('should split text by the highlight string in a case-insensitive manner', () => {
        const text = 'This is a sample text to highlight text.';
        const highlight = 'text';

        const result = getHighlightedText(text, highlight);

        expect(result).toEqual([
            'This is a sample ',
            'text',
            ' to highlight ',
            'text',
            '.',
        ]);
    });

    it('should handle multiple occurrences of the highlight string', () => {
        const text = 'Highlight text in this text, not just one text.';
        const highlight = 'text';

        const result = getHighlightedText(text, highlight);

        expect(result).toEqual([
            'Highlight ',
            'text',
            ' in this ',
            'text',
            ', not just one ',
            'text',
            '.',
        ]);
    });

    it('should handle no match', () => {
        const text = 'This is a sample text.';
        const highlight = 'apple';

        const result = getHighlightedText(text, highlight);

        expect(result).toEqual([text]);
    });
});