function initPopups() {
    $.each($('[data-src]'), function (i, tn) {
        var thumbnail = $(tn);
        var src = thumbnail.attr('data-src');

        if (src) {
            thumbnail.on('click', function () {

                var url = src.indexOf("?") != -1 ? src : src + "?autoplay=1";
                $.blockUI({
                    message: '<iframe src="' + url + '" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>',
                    css: {
                        position: 'fixed',
                        width: '80%',
                        height: '90%',
                        left: '10%',
                        top: '5%',
                        border: 'none',
                        "z-index": 10000,
                        backgroundColor: 'transparent'
                    },
                    fadeIn: 25
                });

                // Close modal dialog with ESC key
                $(document).keyup(function (e) {
                    e.preventDefault();
                    if (e.keyCode == 27) {
                        $.unblockUI({
                            fadeOut: 25
                        });
                    }
                });

                // Click outside dialog to close
                $(document).on('mouseup', function (e) {
                    e.preventDefault();
                    $.unblockUI({
                        fadeOut: 25
                    });
                });

                return false;
            })
        }
    });
}

$(document).ready(function() {
    initPopups();
});