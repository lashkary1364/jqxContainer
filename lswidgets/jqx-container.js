/*
 * jQuery Container plugin 1.0
 *
 * Copyright (c) 2016 Aioub Amini , ayyub.amini@gmail.com
 *
 * MIT licensed   
 * http://www.linkedsoft.ir/

 * Date: Tue July 12 2016
 */
//

// ; (function ($, window, document, undefined) {

//     "use strict";

//     var methods = {
//         initTable: function (options) {

//             var settings = $.extend({}, $.fn.jqxGrid.defaults, options);

//             var $tbody = $("<tbody/>");
//             $.each(settings.source.url, function (rowIndex, r) {
//                 var $row = $("<tr/>");
//                 if (settings.checkbox) {
//                     $row.append($("<td/>").html('<input type="checkbox"/>'));
//                 }
//                 $.each(r, function (colIndex, c) {
//                     $row.append($("<td/>").text(c));
//                 });

//                 $tbody.append($row);
//             });

//             return this.each(function () {
//                 var $elem = $(this);
//                 $elem.jqxGrid('setContainer', $(this));
//                 $elem.find('table').addClass("table table-hover table-responsive");
//                 $elem.find('table').append($tbody);
//                 $elem.jqxGrid('setSettings', settings);
//             });
//         },
//         // get root nodes of tree  level=0
//         getRootNodes: function () {
//             return $(this).jqxGrid('getSettings', 'getRootNodes').apply(this, [$(this).treegrid('getTreeContainer')]);
//         },
//         setSettings: function (settings) {
//             //$(this).data('settings', settings);
//             $(this).jqxGrid('getContainer').find('thead').css(
//                 { 'background-color': settings.backColor, 'color': settings.color });
//         },
//         getSettings: function () {
//             return $(this).jqxGrid('jqxGrid');
//         },
//         setContainer: function (container) {
//             $(this).data('jqxGrid', container);
//         },
//         getContainer: function () {
//             return $(this).data('jqxGrid');
//         },
//         destroy: function () {
//             // destroy table code here
//         }
//     }

//     $.fn.jqxGrid = function (method) {
//         if (methods[method]) {
//             return methods[method].apply(
//                 this,
//                 Array.prototype.slice.call(arguments, 1)
//             );
//         } else if ($.type(method) === 'object') {
//             return methods.initTable.apply(this, arguments);
//         } else {
//             $.error('Method ' + method +
//                 ' does not exist on jQuery.jqiaPhotomatic'
//             );
//         }
//     };


//     $.fn.jqxGrid.defaults = {
//         backColor: 'yellow',
//         color: 'black',
//         checkbox: false
//     };

// } (jQuery, window, document));



$(function() {

    // There's the gallery and the trash
    var $gallery = $("#gallery"),
        $container = $("#containment-wrapper");

    $(".column").sortable({
        connectWith: ".column",
        handle: ".portlet-header",
        cancel: ".portlet-toggle",
        placeholder: "portlet-placeholder ui-corner-all"
    });

    $(".portlet")
        .addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
        .find(".portlet-header")
        .addClass("ui-widget-header ui-corner-all")
        .prepend("<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

    $(".portlet-toggle").on("click", function() {
        var icon = $(this);
        icon.toggleClass("ui-icon-minusthick ui-icon-plusthick");
        icon.closest(".portlet").find(".portlet-content").toggle();
    });



    var $col = "<div class=\"portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\"><div class=\"portlet-header ui-widget-header ui-corner-all ui-sortable-handle\"> <span class=\"ui-icon ui-icon-minusthick portlet-toggle\"></span><span class=\"ui-icon portlet-toggle ui-icon-minusthick\"></span>محصول مرکز هزینه</div><div class=\"portlet-content\"></div></div>";
    // Let the gallery items be draggable
    $("li", $gallery).draggable({
        cancel: "a.ui-icon", // clicking an icon won't initiate dragging
        revert: "invalid", // when not dropped, the item will revert back to its initial position
        containment: "document",
        helper: "clone",
        cursor: "move",
        opacity: 0.8,
        stop: function($gallery) {
            $(".column").first().append($col);
        }
    });

    // Let the trash be droppable, accepting the gallery items
    $container.droppable({
        accept: "#gallery > li",
        classes: {
            "ui-droppable-active": "ui-state-highlight"
        },
        // drop: function(event, ui) {
        //     deleteImage(ui.draggable);
        // }
    });

    // Image deletion function
    var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";

    function deleteImage($item) {
        $item.fadeOut(function() {
            var $list = $("ul", $container).length ?
                $("ul", $container) :
                $("<ul class='gallery ui-helper-reset'/>").appendTo($container);

            $item.find("a.ui-icon-trash").remove();
            $item.append(recycle_icon).appendTo($list).fadeIn(function() {
                $item
                    .animate({ width: "48px" })
                    .find("img")
                    .animate({ height: "36px" });
            });
        });
    }

    // Image recycle function
    var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";

    function recycleImage($item) {
        $item.fadeOut(function() {
            $item
                .find("a.ui-icon-refresh")
                .remove()
                .end()
                .css("width", "96px")
                .append(trash_icon)
                .find("img")
                .css("height", "72px")
                .end()
                .appendTo($gallery)
                .fadeIn();
        });
    }

    // Image preview function, demonstrating the ui.dialog used as a modal window
    function viewLargerImage($link) {
        var src = $link.attr("href"),
            title = $link.siblings("img").attr("alt"),
            $modal = $("img[src$='" + src + "']");

        if ($modal.length) {
            $modal.dialog("open");
        } else {
            var img = $("<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />")
                .attr("src", src).appendTo("body");
            setTimeout(function() {
                img.dialog({
                    title: title,
                    width: 400,
                    modal: true
                });
            }, 1);
        }
    }

    // Resolve the icons behavior with event delegation
    $("ul.gallery > li").on("click", function(event) {
        var $item = $(this),
            $target = $(event.target);

        if ($target.is("a.ui-icon-trash")) {
            deleteImage($item);
        } else if ($target.is("a.ui-icon-zoomin")) {
            viewLargerImage($target);
        } else if ($target.is("a.ui-icon-refresh")) {
            recycleImage($item);
        }

        return false;
    });

});