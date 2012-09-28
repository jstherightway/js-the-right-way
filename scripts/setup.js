(function ($) {
    // Load contributors
    var $contributors = $('#contributors');
    if ( $contributors.length ) {
        var fail = function () {
            $contributors.html('<p>This project would not be possible without the help of <a href="https://github.com/braziljs/js-the-right-way/graphs/contributors">our amazing contributors</a> on GitHub.</p>');
        };
        $.ajax({
            cache: false,
            dataType: 'jsonp',
            timeout: 3000,
            type: 'GET',
            url: 'https://api.github.com/repos/braziljs/js-the-right-way/contributors'
        }).done(function (data) {
            if ( data.data && data.data.length ) {
                var $ul = $('<ul></ul>'), dataLength = data.data.length;
                for ( var i = 0; i < dataLength; i++ ) {
                    $ul.append(['<li><a href="https://github.com/', data.data[i].login, '" target="_blank">', data.data[i].login, '</a></li>'].join(''));
                }
                $contributors.html($ul);
            } else {
                fail();
            }
        }).fail(fail);
    }

    //Add current view's highlighting to the navigation
    
    var win = $(window);
    var navLinks = $('.site-navigation a');
    var headers = $('h1, h2');
    
    var headerTops = headers.map(function(i, e){ return $(e).offset().top; });
    var headerBottoms = headers.map(function(i, e){ return $(e).offset().top + $(e).height(); });
    var headerIds = headers.map(function(i, e){ return e.id; });
    
    var navlinksById = {};
    $.each(headerIds, function(i, e){ navlinksById[e] = navLinks.filter('[href="/#'+e+'"]'); });

    win.scroll(function() {
        navLinks.removeClass("active");

        var viewTop = win.scrollTop();
        var viewBottom = viewTop + win.height();

        var previous = headers[0].id;
        var foundOne = false;
        var fallback = previous;
        
        //for all h1 and h2 elements, check if they are visible
        headers.each(function(i,e) {
            if (headerTops[i] >= viewTop) {
                //if we are passed the view and no heading was highlighted yet, store previous one as fallback
                if (!foundOne)
                    fallback=previous;
                if (headerBottoms[i] <= viewBottom) {
                    navlinksById[headerIds[i]].addClass('active');
                    foundOne = true;
                } else {
                    return false; //break the each(), the rest is below
                }
            }
            previous=e.id;
        });
        //no h1/h2 is in the viewport, so highlight the last one above
        if (!foundOne)
            navlinksById[fallback].addClass('active');
    });
})(jQuery);

