var currentId;

$('#scrape').on("click", function () {
    $.ajax({
        type: "GET",
        url: '/remove'
    }).done(function (data) {
        console.log('Refreshing');
        setTimeout(function () {
            window.location.replace('/');
        }, 5000);
    })
})

$('#saveArticle').on("click", function () {
    let id = $(this).data("id");
    $.ajax({
        type: "PUT",
        url: `/Articles/${id}`
    }).then(function (data) {
        console.log("Request Completed");
    })
})

$(document).on("click", ".save-article", function () {
    var id = ($(this).parent().parent().parent().data("id"));
    var self = $(this);
    $.ajax({
        type: "PUT",
        url: `/api/articles/${id}`
    }).then(function (data) {
        if (data === false) {
            console.log("false");
            self.removeClass("btn-danger");
            self.addClass("btn-primary").text("Save Article");
        } else if (data === true) {
            console.log("true");
            self.removeClass("btn-primary");
            self.addClass("btn-danger").text("Saved!");

        }
    })
});

$(document).on("click", ".view-comment", function () {
    currentId = ($(this).parent().parent().parent().data("id"));
    $.ajax({
        type: "get",
        url: `/api/notes/${currentId}`
    }).then(function (data) {
        $("#noteHead").text(data.title);
        $("#noteBody").text(data.body);
    })
    $("#modal").modal();
})

$("#deleteModal").on("click", function () {
    $.ajax({
        type: "delete",
        url: "/api/notes/",
        data: {
            id: currentId
        }
    }).then(function (data) {
        console.log("Request sent");
        $("#noteHead").text("Comment");
        $("#noteBody").text("");
    });
});

$("#saveModal").on("click", function () {
    var title = $("#title").val();
    var body = $("#body").val();
    console.log(currentId);
    $.ajax({
        type: "post",
        url: "/api/notes/",
        data: {
            title: title,
            body: body,
            id: currentId
        }
    }).then(function (data) {
        $("#noteHead").text(title);
        $("#noteBody").text(body);
    })
});