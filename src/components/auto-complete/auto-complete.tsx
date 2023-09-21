import React, {
    useRef,
    LegacyRef,
    useState,
} from "react";

import { HighlightedText } from "../";
import { clamp } from "../../utils";

import './auto-complete.css';

type AutoCompleteProps = {
    onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    valueInput: string;
    onSelectSuggestion: (value: string) => void;
    options: string[];
    onEnterKeyPress?: (value: string) => void;
}

export const AutoComplete = ({
    onChangeInput,
    valueInput,
    options,
    onEnterKeyPress,
    onSelectSuggestion,
}: AutoCompleteProps) => {
    const containerRef = useRef<HTMLDivElement>();
    const suggestionRef = useRef<HTMLDivElement>();
    const inputRef = useRef<HTMLInputElement>();
    const [focusElement, setFocusElement] = useState(-1);

    const handleInputKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            if (focusElement > -1) {
                const suggestionNodes =
                    (suggestionRef.current
                        ?.childNodes as NodeListOf<HTMLDivElement>) ?? [];
                suggestionNodes[focusElement].click();
                reset();
            } else {
                onEnterKeyPress?.(valueInput ?? '');
            }
        }
    };

    const handleAutoSuggestKeyPress = (e: any) => {
        const suggestionNodes =
            (suggestionRef.current?.childNodes as NodeListOf<HTMLDivElement>) ??
            [];
        if (suggestionNodes.length === 0) return;

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();

            const step = e.key === 'ArrowDown' ? 1 : -1;

            const nextIds = clamp(
                -1,
                suggestionNodes.length - 1,
                focusElement + step,
            );
            if (nextIds > -1) {
                suggestionNodes[nextIds].focus();
            } else {
                // this returns focus to input when the first suggestion is
                // selected and arrow up is pressed
                inputRef.current?.focus();
            }
            setFocusElement(nextIds);
        } else {
            inputRef.current?.focus();
        }
    };

    const reset = () => {
        if (focusElement === -1) return;
        inputRef.current?.focus();
        setFocusElement(-1);
    };

    return (
        <div
            onKeyDown={handleAutoSuggestKeyPress}
            className="flex auto-complete-container"
            ref={containerRef as LegacyRef<HTMLDivElement>}
        >
            <div className="flex align-center">
                <input
                    className="input"
                    onChange={onChangeInput}
                    placeholder="Search for a pokemon"
                    value={valueInput}
                    ref={inputRef as LegacyRef<HTMLInputElement>}
                    onKeyUp={handleInputKeyPress}
                />
                <button
                    onClick={() => onEnterKeyPress?.(valueInput ?? '')}
                    className="search-button"
                >
                    <span>Search</span>
                </button>
            </div>
            {valueInput.length >= 3 && options.length > 0 && (
                <div
                    className="flex column suggestion-container"
                    ref={suggestionRef as LegacyRef<HTMLDivElement>}
                    onMouseEnter={reset}
                >
                    {options.map((suggestion, i) => (
                        <button
                            className="suggestion"
                            onClick={() => onSelectSuggestion(suggestion)}
                            key={suggestion}
                        >
                            <HighlightedText str={suggestion} highlightStr={valueInput} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

