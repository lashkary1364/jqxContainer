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



$(function () {
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

    $(".portlet-toggle").on("click", function () {
        var icon = $(this);
        icon.toggleClass("ui-icon-minusthick ui-icon-plusthick");
        icon.closest(".portlet").find(".portlet-content").toggle();
    });
});