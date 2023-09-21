import React, {
    useRef,
    LegacyRef,
    useState,
    Fragment,
} from "react";
import {clamp, getHighlightedText} from "../../utils";

type AutoCompleteProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    options: string[];
    value: string;
    onEnterKeyPress?: (value: string) => void;
}

export const AutoComplete = ({
    onChange,
    value,
    options,
    onEnterKeyPress,
}: AutoCompleteProps) => {
    const containerRef = useRef<HTMLDivElement>();
    const inputRef = useRef<HTMLInputElement>();
    const [focusElement, setFocusElement] = useState(-1);

    const handleInputKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            if (focusElement > -1) {
                const suggestionNodes =
                    (containerRef.current
                        ?.childNodes as NodeListOf<HTMLDivElement>) ?? [];
                suggestionNodes[focusElement].click();
            } else {
                onEnterKeyPress?.(value ?? '');
            }
        }
    };

    const handleAutoSuggestKeyPress = (e: any) => {
        const suggestionNodes =
            (containerRef.current?.childNodes as NodeListOf<HTMLDivElement>) ??
            [];
        if (suggestionNodes.length == 0) return;

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

    return (
        <div
            onKeyDown={handleAutoSuggestKeyPress}
        >
            <input
                onChange={onChange}
                placeholder="Search for a pokemon"
                value={value}
                ref={inputRef as LegacyRef<HTMLInputElement>}
                onKeyUp={handleInputKeyPress}
            />
            {value.length >= 3 && options.length > 0 && (
                <div
                    className="flex column"
                    ref={containerRef as LegacyRef<HTMLDivElement>}
                >
                    {options.map((suggestion, i) => (
                        <Fragment key={suggestion}>
                            <button onClick={() => alert(suggestion)}>
                                {getHighlightedText(suggestion, value).map((part, idx) => (
                                    idx % 2 === 1 ? <b key={idx}>{part}</b> : <span key={idx}>{part}</span>
                                ))}
                            </button>
                        </Fragment>
                    ))}
                </div>
            )}
        </div>
    )
}

