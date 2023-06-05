interface CardHeaderProps {
    children: string,
    additionalClassName?: string,
}

export default function CardHeader({ children, additionalClassName = "" }: CardHeaderProps) {
    return (
        <div className={`card-header ${additionalClassName}`}>
            <div className="d-flex justify-content-between">
                <h5 className="mb-2 w-18 omyu" style={{ "fontSize": "30px" }}>
                    {children}
                </h5>
            </div>
        </div>
    )
}