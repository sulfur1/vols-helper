const ajaxLinesUrl = "/rest/admin/lines"

const ctx = {
    ajaxUrl: ajaxLinesUrl
}

$(function () {
    makeEditable({
       "columns": [
           {
               "data": "name"
           },
           {
               "data": "length"
           },
           {
               "data": "diameter"
           },
           {
               "data": "from"
           },
           {
               "data": "to"
           },
           {
               "render": renderMapBtn,
               "defaultContent": "",
               "orderable": false
           },
           {
               "render": renderEditBtn,
               "defaultContent": "",
               "orderable": false
           }
       ]
    });
});