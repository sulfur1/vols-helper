const ajaxLineUrl = "rest/admin/line"

const ctx = {
    ajaxUrl: ajaxLineUrl
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