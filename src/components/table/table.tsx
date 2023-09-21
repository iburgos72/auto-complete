import React from "react";

type THeadProps = {
    headers: string[];
}

export const THead = ({ headers }: THeadProps) => (
    <thead>
        <tr>
            {headers.map((column, index) => (
                <th key={index}>{column}</th>
            ))}
        </tr>
    </thead>
)

type TBodyProps = {
    data: any[][];
}

export const TBody = ({data}: TBodyProps) => (
    <tbody>
        {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.map((val, columnIndex) => (
                    <td key={`${rowIndex}-${columnIndex}`}>
                        {val}
                    </td>
                ))}
            </tr>
        ))}
    </tbody>
)