var currentId;

$('#scrape').on("click", function () {
    $(this).text("Refreshing, please wait...");
    $(this).removeClass("btn-info");
    $(this).addClass("btn-warning");
    $.ajax({
        type: "GET",
        url: '/remove'
    }).done(function (data) {
        console.log('Refreshing');
        setTimeout(function () {
            window.location.replace('/');
        }, 2000);
    })
});

$('#saved').on("click", function () {
    $.ajax({
        type: "GET",
        url: `/saved`
    });
})

$('.saveArticle').on("click", function () {
    let id = $(this).data("id");
    $.ajax({
        type: "POST",
        url: `/Articles/${id}`
    }).then(function (data) {
        console.log("Article Saved!");
    })
});

$('.unsaveArticle').on("click", function () {
    let id = $(this).data("id");
    $.ajax({
        type: "POST",
        url: `/Articles/unsave/${id}`
    }).then(function (data) {
        console.log("Article Unsaved!");
    })
});

$(".noteModal").on("click", function () {
    var myVal = $(this).data("id");
    $(".modal-footer #saveNote").val(myVal);

    $.ajax({
        type: "GET",
        url: `/Notes/${myVal}`
    }).then(function (NoteData) {
        console.log(NoteData);
        if (NoteData.length === 1) {
            $("#note-text").val(NoteData[0].message);
        } else {
            $("#note-text").val("");
        }
    })
});

$("#saveNote").on("click", function () {
    let id = $(this).val();
    let message = $("#note-text").val();
    console.log(message);
    $.ajax({
        type: "POST",
        url: `/Notes`,
        data: {
            articleId: id,
            message: message
        }
    }).then(function (data) {
        $("#saveNote").removeClass("btn-primary");
        $("#saveNote").addClass("btn-warning");
        $("#saveNote").text("message saved! Refreshing..");
        setTimeout(function () {
            window.location.replace('/');
        }, 2000);
    })
});
