$(function() {
    let buttonCheckAllActive = $("#check_all_active");
    let buttonUncheckAllActive = $("#uncheck_all_active");
    let buttonCheckAllFinished = $("#check_all_finished");
    let buttonUncheckAllFinished = $("#uncheck_all_finished");

    buttonCheckAllActive.on("click", checkAllActive);
    buttonUncheckAllActive.on("click", uncheckAllActive);
    buttonCheckAllFinished.on("click", checkAllFinished);
    buttonUncheckAllFinished.on("click", uncheckAllFinished);

    let deleteActiveTasksButton = $("#delete_selected_active_tasks");
    let deleteFinishedTasksButton = $("#delete_selected_finished_tasks");

    deleteActiveTasksButton.on("click", deleteActiveTasks);
    deleteFinishedTasksButton.on("click", deleteFinishedTasks);

    let completeTasksButton = $("#complete_tasks");
    let uncompleteTasksButton = $("#uncomplete_tasks");

    completeTasksButton.on("click", completeTasks);
    uncompleteTasksButton.on("click", uncompleteTasks);
});

function completeTasks(){
    let ids = getSelectedTasksIds("active");
    let userId = getUserId();
    $.ajax({
        method: "PUT",
        url: "/complete_multiple_tasks",
        data: {
            ids: ids,
            user_id: userId,
            complete: "true"
        },
        success: function (data) {
        },
        error: function (err) {
        }
    })
}

function moveToCompleted(data) {
    let ids = data.ids;
    //if state true than move to active(nextState = "active"); state false -> to finished
    let nextState = data.state ? "active" : "finished";
    let prevState = data.state ? "finished" : "active";
    let dest = $(".table-"+ nextState +"-tasks tbody");
    for(let i = 0; i < ids.length; i++){
        let id = ids[i];
        let task = $("#task-"+ id);
        task.find("#checkbox-"+id).prop("checked", false)
        task.detach().appendTo(dest);
    }
    adjustCount(prevState, ids.length);
    adjustCount(nextState, -ids.length);
}

function uncompleteTasks(){
    let ids = getSelectedTasksIds("finished");
    let userId = getUserId();
    $.ajax({
        method: "PUT",
        url: "/complete_multiple_tasks",
        data: {
            ids: ids,
            user_id: userId,
            complete: "false"
        },
        success: function (data) {
        },
        error: function (err) {
        }
    })
}

function deleteActiveTasks(){
    let taskIds = getSelectedTasksIds("active");
    deleteTasksByIds(taskIds, "active", taskIds.length);
}

function deleteFinishedTasks(){
    let taskIds = getSelectedTasksIds("finished");
    deleteTasksByIds(taskIds, "finished", taskIds.length);   
}

function deleteTasksByIds(ids, state, length){
    let userId = getUserId();
    $.ajax({
        method: "DELETE",
        url: "/delete_multiple_tasks",
        data: {
            ids: ids,
            user_id: userId
        },
        success: function (data) {
            adjustCount(state, length);
        },
        error: function (err) {
        }
    })
}

function getSelectedTasksIds(state) {
    let ids = [];
    $(".table-"+ state +"-tasks input[type=checkbox]").each(function(){
        if($(this).prop("checked")){
            let idString = $(this).attr("id");
            // id is of type checkbox-{:id}
            idString = idString.slice(9);
            ids.push(idString);
        }
    })
    return ids;
}

function deleteTask(responce){
    const id = responce.taskId;
    const sel = "#task-" + id;
    $(sel).remove();
}

function batchDelete(res) {
    let ids = res.ids;
    for (let i = 0; i < ids.length; i++) {
        let sel = "#task-" + ids[i];
        $(sel).remove();
    }
}

function checkAllActive() {
    $(".table-active-tasks input[type=checkbox]").prop("checked", true);
}

function uncheckAllActive() {
    $(".table-active-tasks input[type=checkbox]").prop("checked", false);
}

function checkAllFinished() {
    $(".table-finished-tasks input[type=checkbox]").prop("checked", true);
}

function uncheckAllFinished() {
    $(".table-finished-tasks input[type=checkbox]").prop("checked", false);
}

function getUserId(){
    return $(".info_user_id").prop("id")
}

function adjustCount(state, num){
    let span = $("#"+ state +"-count");
    if(span.length === 0) {
        var h3 = $("#"+ state +"_tasks_container h3");
        h3.html('Number of '+ state +' tasks: <span id="'+ state +'-count">0</span>');
        span = $("#" + state + "-count");
    }
    let count = span.text();
    let newCount = parseInt(count) - num;
    span.text(newCount);
}

function hello(){
    console.log("Hola!");
}