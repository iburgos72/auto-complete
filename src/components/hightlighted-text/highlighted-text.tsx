import React from "react";

import { getHighlightedText } from "../../utils";

import './highlighted-text.css';

type HighlightedTextProps = {
    str: string;
    highlightStr: string;
}

export const HighlightedText = ({
    str,
    highlightStr,
}: HighlightedTextProps) =>
    <span className="normal-text">
        {
            getHighlightedText(str, highlightStr).map((part, idx) => (
                idx % 2 === 1
                    ? <b key={idx} className='highlight'>{part}</b>
                    : part
            ))
        }
    </span>
