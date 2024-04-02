import "./task-component.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import EditTaskComponent from "./edit-task-component/edit-task-component";

function TaskComponent() {
    return (
        <>
            <div className="task-component">
                <FontAwesomeIcon className="edit-task-icon" icon={faPencil} />
                <EditTaskComponent />
            </div>
        </>
    );
}

export default TaskComponent;
