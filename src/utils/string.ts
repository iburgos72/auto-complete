export const getHighlightedText = (text: string, highlight: string): string[] =>
    text.split(new RegExp(`(${highlight})`, 'gi'));
