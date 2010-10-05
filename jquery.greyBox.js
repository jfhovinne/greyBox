/* greyBox : greybox jQuery plugin
 * Copyright (C) 2008-2010 Jean-Francois Hovinne - http://www.hovinne.com/
 * Dual licensed under the MIT and GPL licenses.
 */

jQuery.fn.fixedBox = jQuery.fn.fixedBox || function() {};

jQuery.fn.greyBox = function(options) {

    options = jQuery.extend({
        width: 200,
        height: 200,
        loadIframe: false,
        loadImg: false,
        title: false,
        closeLinkText: 'X',
        closeLinkTitle: 'Close',
        fixedBoxOptions: {},
        openCallback: null
    }, options);
    
    return(this.each(function() {
    
        $(this).click(function() {

            var url = $(this).attr('href');
            $('#' + options.prefixId + 'overlay').remove();

            //top div
            var div_top = $('<div></div>').attr('id', options.prefixId + 'top');

            //title
            var div_title = $('<div></div>')
                .attr('id', options.prefixId + 'title')
                .text(options.title || $(this).attr('title'));

            //close div
            var div_close = $('<div></div>').attr('id', options.prefixId + 'close');

            //content div, when not using an iframe
            var div_content = $('<div></div>').attr('id', options.prefixId + 'content');

            //close link
            var a_close = $('<a></a>')
                .attr('id', options.prefixId + 'closelink')
                .attr('href', '#')
                .attr('title', options.closeLinkTitle)
                .text(options.closeLinkText)
                .click( function() {
                    $('#' + options.prefixId + 'overlay').remove();
                    if ( $.isFunction( options.closeCallback ) ) options.closeCallback( $(this) );
                    return false;
                });

            //construct top div
            $(div_close).append(a_close).appendTo(div_top).before(div_title);

            //iframe
            var iframe = $('<iframe>').attr('id', options.prefixId + 'iframe').attr('src', url);

            //image
            var img = $('<img>').attr('id', options.prefixId + 'img').attr('src', url);

            //construct content div
            $(div_content).append(options.loadIframe ? iframe : null);
            $(div_content).append(options.loadImg ? img : null);

            //overlay div
            var overlay = $('<div></div>')
                .attr('id', options.prefixId + 'overlay')
                .width(options.width)
                .height(options.height)
                .appendTo(document.body)
                .append(div_top)
                .append(div_content)
                .fixedBox(options.fixedBoxOptions);

            if ( $.isFunction( options.openCallback ) ) options.openCallback( $(this), overlay );

            return false;
        });
    }));
};
