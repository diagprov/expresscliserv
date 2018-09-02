
function submitAdd() {

    $.ajax({
        type: "POST",
        url: "/add",
        data: {'a': $("#a").val(), 'b': $("#b").val() },
        success: function(data) {
            $("#result").html(data["sum"]);
        },
        dataType: "json"
    }).fail(function() {
        $("#result").html("Computation failed.");
    });
}
