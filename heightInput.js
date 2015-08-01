$.fn.heightInput = function (options) {
    var o = $.extend({
        defaultHeight: [5, 9],
        minHeight: [1, 2],
        maxHeight: [7, 8],
        buttonClass: "default"
    }, options);
    var adjustHeight = function (height, x) {
        var h = height.split(" ");
        if (h.length < 2) {
            return false;
        }
        var feet = parseInt(h[0].substr(0, (h[0].length - 1)));
        var inches = parseInt(h[1].substr(0, (h[1].length - 1)));
        switch (x) {
            case 0:
                if (feet === o.minHeight[0] && inches === o.minHeight[1]) {
                    return height;
                }
                if (inches === 0) {
                    inches = 11;
                    feet = (feet - 1);
                } else {
                    inches = (inches - 1);
                }
                break;
            case 1:
                if (feet === o.maxHeight[0] && inches === o.maxHeight[1]) {
                    return height;
                }
                if (inches === 11) {
                    inches = 0;
                    feet = (feet + 1);
                } else {
                    inches = (inches + 1);
                }
                break;
            default:
                return this.val();
        };
        return (feet + "' " + inches + "\"");
    };
    return this.each(function () {
        var hInput = $(this).addClass("form-control heightInput");
        hInput.val(o.defaultHeight[0] + "' " + o.defaultHeight[1] + "\"").addClass("form-control").css({
            "text-align": "center",
                "padding-left": "2px",
                "padding-right": "2px"
        }).focus(function (e) {
            hInput.blur();
        });
        var formGrp = $("<div>").addClass("form-group");
        var inputGrp = $("<div>").addClass("input-group");
        var minus = $("<span>").addClass("input-group-btn").append(
        $("<button>").addClass("btn btn-" + o.buttonClass).append(
        $("<span>").addClass("glyphicon glyphicon-minus")).click(function () {
            hInput.val(adjustHeight(hInput.val(), 0));
        }));
        var plus = $("<span>").addClass("input-group-btn").append(
        $("<button>").addClass("btn btn-" + o.buttonClass).append(
        $("<span>").addClass("glyphicon glyphicon-plus")).click(function () {
            hInput.val(adjustHeight(hInput.val(), 1));
        }));
        hInput.before(formGrp);
        inputGrp.append(minus, hInput, plus).appendTo(formGrp);
        formGrp.css("margin-bottom", "0px");
    });
};
