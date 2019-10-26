


(function()  {

    renderSemesters();

    function renderSemesters() {

        var template = $('#semesters-load-view').html();
        var compiled = Handlebars.compile(template);

        $('#semesters-list-view').html(compiled);

            
    }


    
})();