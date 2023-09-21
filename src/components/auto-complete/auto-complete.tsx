import React, {
    LegacyRef,
    useRef,
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
    const suggestionRef = useRef<HTMLDivElement>();
    const inputRef = useRef<HTMLInputElement>();
    const [focusElement, setFocusElement] = useState(-1);

    // TODO: the any should be replaced with the correct type: KeyboardEvent<HTMLInputElement>
    // but there were some issues with the types
    const handleInputKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            if (focusElement > -1) {
                // if the user presses enter while a suggestion is focused,
                // it will simulate a click in the suggestion element
                const suggestionNodes =
                    (suggestionRef.current
                        ?.childNodes as NodeListOf<HTMLDivElement>) ?? [];
                suggestionNodes[focusElement].click();
                reset();
            } else {
                // if the user presses enter while the input element is focused,
                // this will exec the onEnterKeyPress callback
                onEnterKeyPress?.(valueInput ?? '');
            }
        }
    };

    // TODO: the any should be replaced with the correct type: KeyboardEvent<HTMLInputElement>
    // but there were some issues with the types
    const handleAutoSuggestKeyPress = (e: any) => {
        const suggestionNodes =
            (suggestionRef.current?.childNodes as NodeListOf<HTMLDivElement>) ??
            [];
        if (suggestionNodes.length === 0) return;

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                // this allows navigating through the suggestions with arrow keys
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

