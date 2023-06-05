import { CSSProperties } from "react"

interface CardProps {
    children: React.ReactNode,
    style?: CSSProperties
    additionalClassName?: string,
}

export default function MatriBoard({ children, style = {}, additionalClassName = "" }: CardProps) {
    return (
        <div className={`card ${additionalClassName}`} style={style}>
            {children}
        </div>
    )
}