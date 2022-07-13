import { useState, useEffect } from "react";
import { getTags } from "../../Api/tag-api";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import PaginationComponent from "../../Components/PaginationComponent/PaginationComponent";
import "./TagsPage.scss";
import Tag from "./Tag";

function TagsPage() {
    const [tags, setTags] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState("");

    const LimitRecordInPage = 12;

    useEffect(() => {
        getTags(page, LimitRecordInPage, filter).then((res) => {
            setTags(res.tagsArray);
            setTotalPages(res.totalPages);
        });
    }, [page, filter]);

    function handleChangeFilter(e) {
        setFilter(e.target.value);
    }

    return (
        <div className="tags-page">
            <Sidebar />
            <div className="tags-page__content">
                <div className="tags-page__header">
                    <div className="tags-page__title">Tags</div>
                    <div className="tags-page__introduction">
                        A tag is a keyword or label that categorizes your question with other,
                        similar questions. Using the right tags makes it easier for others to find
                        and answer your question.
                    </div>
                    <div className="tags-page__filter">
                        <svg fill="#525960" width="18" height="18">
                            <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z" />
                        </svg>{" "}
                        <input
                            type="text"
                            value={filter}
                            name="filter"
                            placeholder="Filter by tag name"
                            onChange={handleChangeFilter}
                        />
                    </div>
                </div>

                <div className="tags">
                    {tags.map((tags, index) => (
                        <Tag key={index} tagName={tags[0]} numQuestion={tags[1]} />
                    ))}
                </div>

                <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
            </div>
        </div>
    );
}

export default TagsPage;
