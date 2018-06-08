$(document).ready(function(){
    $(".task_row").on("mouseover", function (e) {
        $(this).find(".edit_task").css("visibility", "visible");
        $(this).find(".delete_task").css("visibility", "visible");

    })
    $(".task_row").on("mouseout", function (e) {
        $(this).find(".edit_task").css("visibility", "hidden");
        $(this).find(".delete_task").css("visibility", "hidden");
    })

    $(".datepicker").datepicker({
        format: "yyyy-mm-dd"
    });
})



