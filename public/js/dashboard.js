$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/dashboard/getTask",
        success: function (response) {
            console.log(response);
            showTask(response)
        },
        error: function (err) {
            console.log(err);
        }
    });



    function showTask(tasks) {


        for (const key in tasks) {
            console.log(tasks[key]);
            if (tasks[key].done === false) {
                let task = `
            
            <div class="taskContainer" id="${tasks[key]._id}"><p class="task">${tasks[key].text}</p><i class="fas fa-check" onclick="done('${tasks[key]._id}')"></i><i class="fas fa-trash-alt" onclick="trash('${tasks[key]._id}')" ></i></div>


            `
                $(".list").append(task);
            }
        }
        for (const key in tasks) {
            if (tasks[key].done === true) {
                let task = `
            
                <div class="taskContainer" id="${tasks[key]._id}"><p class="task" style="text-decoration: line-through; text-decoration-color: red;">${tasks[key].text}</p><i class="fas fa-check" onclick="done('${tasks[key]._id}')"></i><i class="fas fa-trash-alt" onclick="trash('${tasks[key]._id}')" ></i></div>
    
    
                `
                $(".list").append(task);
            }
        }


    }

    const addBtn = document.querySelector(".add")
    const taskField = document.querySelector(".taskInput")
    const list = document.querySelector(".list")

    addBtn.addEventListener("click", addTask)

    function addTask() {
        if (taskField.value.length === 0) return
        else {

            $.ajax({
                type: "POST",
                url: "/dashboard/add",
                data: {
                    text: $(".taskInput").val()
                },
                success: function (response) {
                    console.log(1002);
                    window.location.reload();
                    console.log(response);
                },
                error: function (err) {
                    console.log(err);
                }
            });


        }
    }

    function enter(e) {
        if (e.keyCode == 13) addTask()
    }




    $(".taskContainer").click(function (e) {
        console.log(e);
    });



});


function done(id) {
    $.ajax({
        type: "PUT",
        url: `/dashboard/${id}`,
        success: function (response) {
            console.log(100);
            window.location.reload();

        },
        error: function (err) {
            console.log(err);
        }
    });
    console.log("done ==> ", id);
}

function trash(id) {
    $.ajax({
        type: "DELETE",
        url: `/dashboard/${id}`,
        success: function (response) {

            window.location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    });
    console.log("trash ==> ", id);
}