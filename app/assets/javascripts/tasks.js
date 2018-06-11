$(document).ready(function(){


    $(".datepicker").datepicker({
        format: "yyyy-mm-dd",
        todayHighlight: true,
        weekStart: 1,
        zIndexOffset: 10000,
        orientation: "top right"
    });

    // validation on new and edit

    $("form.edit_task").on("submit", taskValidation);
    $("form.new_task").on("submit", taskValidation)

    function taskValidation(e){

        clearErrors();
        let errors = [];
        let title = $("#task_title").val();
        let priority = parseInt($("#task_priority").val());
        let due_date = parseDate($("#task_due_date").val());
        if (title === "") {
            errors.push("Title cant be blank!");
        } else if (title.length > 255) {
            errors.push("Title cant be longer than 255 characters!");
        }
        
        if(typeof priority !== "number" || isNaN(priority)){
            errors.push("Priority cant be empty!")
        } else if (priority < 0) {
            errors.push("Priority cant be less than 0!");
        } else if (priority > 10) {
            errors.push("Priority cant be greater than 10!");
        }

        if (isNaN(due_date)){
            errors.push("Due date should be valid and cant be blank!");
        } else if (due_date.getTime() < new Date().getTime()) {
            errors.push("Due time cant be in past!");
        }

        if (errors.length !== 0) {
            e.preventDefault();
            displayErrors(errors);
            $(this).find("input[type=submit]").prop("disabled", false);
        } 
    }

    function parseDate(date){
        let year = parseInt(date.split("-")[0]);
        let month = parseInt(date.split("-")[1]) - 1;
        let day = parseInt(date.split("-")[2]);
        return new Date(year, month, day);
    }

    function displayErrors(errors){
        let lis = errors.map(function(e){
            let li = document.createElement("li");
            li.innerText = e;
            return li;
        })
        let ul = $(".errors_js").append(lis);
    }
    function clearErrors(){
        $(".errors_js").html("");
    }
})    
