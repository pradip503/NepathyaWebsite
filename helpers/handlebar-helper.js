const Handlebars = require('handlebars');

module.exports = {

    displaySemesterList: function(semesters) {

        var totalSemester = semesters.length;

        if(totalSemester > 4) {

            var template = "";

            // displays first four semester

            template += "<div class='col-sm-6'><div class='list-group semester-list' id='semesters-list-view'> ";

                for(i=0; i<4; i++) {

                template += '<a class="list-group-item list-group-item-action" href="/questions_collection/subject-list" >' + semesters[i] + '</a>' 
                    
                };

            template += "</div></div>";


            // displays last four semester

            template += "<div class='col-sm-6'><div class='list-group semester-list' id='semesters-list-view'> ";

            for(i=4; i<8; i++) {

                if(semesters[i]) {

                    template += '<a class="list-group-item list-group-item-action" href="/questions_collection/subject-list" >' + semesters[i] + '</a>' 


                }

                
            };

        template += "</div></div>";

            return new Handlebars.SafeString( template );

                

        } else {

            var template1 = "";

            template1 += "<div class='col-sm-12'><div class='list-group semester-list' id='semesters-list-view'> ";
            

            

            semesters.forEach(semester => { 

                template1 +='<a class="list-group-item list-group-item-action" href="/questions_collection/subject-list" >' + semester + '</a>' 

            })
            
            
            template += "</div></div>";


            return new Handlebars.SafeString( template1);


        }
        
    }

};