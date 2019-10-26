


// sends ajax request for sending mail to server
    $('#sendMailButton').click(function() {



        var name = document.getElementById("name").value;
        var mailId = document.getElementById("mailId").value;
        var subject = document.getElementById("subject").value;
        var description = document.getElementById("description").value;

        if(name == '' || mailId == '' || subject == '' || description == '') {
            toastr.error('Please fill all the fields!')
        } else {
            $.ajax({
                type: "POST",
                url: '/mail_us',
                data: {name: name, mailId: mailId, subject: subject, description: description},
                cache: false,
                success: function(data) {
                    toastr.success( 'Thank you for connecting with us!');
                },
                error: function() {
                    toastr.error('We cannot connect you this time. Please try again later!')
                }
                
            });
        }

        

       

    });