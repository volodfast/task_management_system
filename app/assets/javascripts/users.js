function responseToAjax(responce){
    const id = responce.taskId;
    const sel = "#task-" + id;
    $(sel).hide();
}