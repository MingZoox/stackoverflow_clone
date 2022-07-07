import "./PaginationComponent.scss";

function PaginationComponent({ page, setPage, totalPages }) {
    return (
        <div className="pagination">
            {[...Array(totalPages)].map((x, index) => (
                <span
                    key={index}
                    className={index + 1 === page ? "target-active" : ""}
                    onClick={(e) => {
                        setPage(index + 1);
                    }}>
                    {index + 1}
                </span>
            ))}
        </div>
    );
}

export default PaginationComponent;
