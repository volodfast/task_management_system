$(function() {
    $(".task_row").on("mouseover", function (e) {
        $(this).find(".edit_task").css("visibility", "visible");
        $(this).find(".delete_task").css("visibility", "visible");

    });
    $(".task_row").on("mouseout", function (e) {
        $(this).find(".edit_task").css("visibility", "hidden");
        $(this).find(".delete_task").css("visibility", "hidden");
    });

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

    $(".table-active-tasks .title_column").on("click", sortActiveTasksByTitle);
    $(".table-active-tasks .due_date_column").on("click", sortActiveTasksByDueDate);
    $(".table-active-tasks .priority_column").on("click", sortActiveTasksByPriority);

    $(".table-finished-tasks .title_column").on("click", sortFinishedTasksByTitle);
    $(".table-finished-tasks .due_date_column").on("click", sortFinishedTasksByDueDate);
    $(".table-finished-tasks .priority_column").on("click", sortFinishedTasksByPriority);
});

function completeTasks(){
    let ids = getSelectedTasksIds("active");
    if(ids.length === 0) return
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
    if (ids.length === 0) return
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
    if (taskIds.length === 0) return
    deleteTasksByIds(taskIds, "active", taskIds.length);
}

function deleteFinishedTasks(){
    let taskIds = getSelectedTasksIds("finished");
    if (taskIds.length === 0) return
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

// Sorting handler functions

function sortActiveTasksByTitle(){
    $(".table-active-tasks tr.task_row").sort(sortByTitle).appendTo(".table-active-tasks");
}

function sortActiveTasksByDueDate() {
    $(".table-active-tasks tr.task_row").sort(sortByDueDate).appendTo(".table-active-tasks");
}

function sortActiveTasksByPriority() {
    $(".table-active-tasks tr.task_row").sort(sortByPriority).appendTo(".table-active-tasks");
}

function sortFinishedTasksByTitle() {
    $(".table-finished-tasks tr.task_row").sort(sortByTitle).appendTo(".table-finished-tasks");
}

function sortFinishedTasksByDueDate() {
    $(".table-finished-tasks tr.task_row").sort(sortByDueDate).appendTo(".table-finished-tasks");
}

function sortFinishedTasksByPriority() {
    $(".table-finished-tasks tr.task_row").sort(sortByPriority).appendTo(".table-finished-tasks");
}

//Sorting helpers

function sortByTitle(a, b) {
    let av = $(a).find(".title").text().toLowerCase();
    let bv = $(b).find(".title").text().toLowerCase();
    if (av === bv) return 0;
    return av < bv ? -1 : 1
}

function sortByDueDate(a, b) {
    let av = $(a).find(".due_date").text().toLowerCase();
    let bv = $(b).find(".due_date").text().toLowerCase();
    if(av === bv) return 0;
    return av < bv ? -1 : 1
}

function sortByPriority(a, b) {
    let av = $(a).find(".priority").text().toLowerCase();
    let bv = $(b).find(".priority").text().toLowerCase();
    if (av === bv) return 0;
    return av < bv ? -1 : 1
}

//Validation
$(function() {
    $("form.edit_user").on("submit", validateUser);
    $("form.new_user").on("submit", validateUser);

    function validateUser(e) {
        clearErrors();
        let errors = [];
        console.log("hellow")
        let fname = $("#user_first_name").val();
        let lname = $("#user_last_name").val();
        let email = $("#user_email").val();
        let password = $("#user_password").val();
        let password_confirmation = $("#user_password_confirmation").val();

        let reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    
        if (fname === "") {
            errors.push("First Name cant be empty!");
        } else if (fname.length > 50) {
            errors.push("First Name cant be longer than 50 characters!");
        }

        if (lname === "") {
            errors.push("Last Name cant be empty!");
        } else if (lname.length > 50) {
            errors.push("Last Name cant be longer than 50 characters!");
        }

        if(email === "") {
            errors.push("Email cant be blank!");
        } else if(!reg.test(email)){
            errors.push("Email is invalid!");
        }
        console.log(password, password.length, password_confirmation, password == password_confirmation);

        if(document.querySelector("form.edit_user") === null){
            if (password == "") {
                errors.push("Password cant be blank!");
            } else if (password.length < 6) {
                errors.push("Password cant be less than 6 characters!");
            }
        } 

        if (password != password_confirmation){
            errors.push("Password and Password confirmation must be execly the same!");
        }

        if(errors.length !== 0) {
            e.preventDefault();
            displayErrors(errors);
        }
    }

    function displayErrors(errors) {
        let lis = errors.map(function (e) {
            let li = document.createElement("li");
            li.innerText = e;
            return li;
        })
        let ul = $(".errors_js").append(lis);
    }

    function clearErrors() {
        $(".errors_js").html("");
    }
});