import Sidebar from "../../Layouts/Sidebar/Sidebar";
import "./QuestionsPage.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';


function QuestionsPage() {
    return (
        <div className="questions-page">
            <Sidebar />

            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"><h4>All Questions</h4></a>
                    </div>
                    <a href="#" className="btn btn-primary active" role="button" data-bs-toggle="button" aria-pressed="true">Ask question</a>
                </nav>

                <div className="menu">
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Active</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Bountied</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Unanswered</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">More</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Frequent</a></li>
                                <li><a class="dropdown-item" href="#">Score</a></li>
                                <li><a class="dropdown-item" href="#">Unanswered (my tags)</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Custom filter</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>



        </div>
    );
}

export default QuestionsPage;
