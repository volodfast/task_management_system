$(function() {
    let buttonCheckAllActive = $("#check_all_active");
    let buttonUncheckAllActive = $("#uncheck_all_active");
    let buttonCheckAllFinished = $("#check_all_finished");
    let buttonUncheckAllFinished = $("#uncheck_all_finished");

    buttonCheckAllActive.on("click", checkAllActive);
    buttonUncheckAllActive.on("click", uncheckAllActive);
    buttonCheckAllFinished.on("click", checkAllFinished);
    buttonUncheckAllFinished.on("click", uncheckAllFinished);
});

function responseToDeleteAjax(responce){
    const id = responce.taskId;
    const sel = "#task-" + id;
    $(sel).hide();
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