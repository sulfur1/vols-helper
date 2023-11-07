const ajaxLineUrl = "/lines"

const ctx = {
    ajaxUrl: ajaxLineUrl
}

$(function () {
    makeEditable({
       "columns": [
           {
               "data": "id"
           },
           {
               "data": "title"
           },
           {
               "data": "length"
           },
           {
               "data": "diameter"
           },
           {
               "data": "startLine"
           },
           {
               "data": "endLine"
           },
           {
               "data": "coordinates",
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
           },
           {
               "render": renderDeleteBtn,
               "defaultContent": "",
               "orderable": false
           }
       ],
        "columnDefs": [
            {
                target: 6,
                visible: false,
                searchable: false
            }
        ],
        "order": [
            [
                0,
                "asc"
            ]
        ]
    });
});