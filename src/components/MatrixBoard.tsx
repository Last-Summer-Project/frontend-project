interface MaxtrixBoardProps {
    children: React.ReactNode
}

export default function MatrixBoard({ children }: MaxtrixBoardProps) {
    return (
        <div className="matrix-board col-sm-50 inner-left-xs inner-right-sm animated fadeInUp">
            {children}
        </div>
    )
}