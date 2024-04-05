import { useState } from "react";
import "./edit-task-component.scss";

function EditTaskComponent() {
    const [dueDate, setDueDate] = useState(getCurrentDate());
    const [dueTime, setDueTime] = useState(getCurrentTime());

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
    }

    return (
        <>
            <div className="edit-task-form-container">
                <form className="edit-task-form">
                    <div className="mb-2">
                        <input type="text" name="task-title" id="task-title" />
                    </div>
                    <div>
                        <label htmlFor="task-notes">Note</label>
                        <input type="textarea" name="task-notes" id="task-notes" />
                    </div>
                    {/* <div className="schedule-radio-group mb-2">
                        <label htmlFor="today-radio">Today</label>
                        <input type="radio" name="today-radio" id="today-radio" />
                        <label htmlFor="tomorrow-radio">Tomorrow</label>
                        <input type="radio" name="tomorrow-radio" id="tomorrow-radio" />
                        <label htmlFor="schedule-radio">Set Date Time</label>
                        <input type="radio" name="schedule-radio" id="schedule-radio" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="due-date">Due On</label>
                        <input type="date" name="due-date" id="due-date" value={dueDate} />
                        <label htmlFor="due-time">Time</label>
                        <input type="time" name="due-time" id="due-time" value={dueTime} />
                    </div> */}
                    <div className="mb-2">
                        <label htmlFor="task-points">Points</label>
                        <input
                            type="number"
                            name="task-points"
                            id="task-points"
                            defaultValue={0}
                            step={10}
                            min={0}
                            max={100}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditTaskComponent;
