function validateLogin() {
    var textfield = $("input[name=user]");
    $('button[type="submit"]').click(function(e) {
        e.preventDefault();
        if (textfield.val() != "") {
            //$("body").scrollTo("#output");            
			$("#output").addClass("alert alert-success animated fadeInUp").html("Welcome back " + "<span style='text-transform:uppercase'>" + textfield.val() + "</span>");
			//$("#output").addClass("alert alert-success animated fadeInUp").html("Welcome back " + "<span style='text-transform:uppercase'>" + textfield.val() + "</span>");
            $('button[type="submit"]').html("continue")
                .removeClass("btn-info")
                .addClass("btn-default").click(function(){
                    $("input").css({
                        "height":"auto",
                        "padding":"10px",
                        "opacity":"1"
                    }).val("");
					alert('here');
					// $("link[href='/css/login.css']")[0].disabled=true;
					// $("link[href='//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css']")[0].disabled=true;
					// $("link[href='/css/login.css']").remove();
					// $("link[href='//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css']").remove();
					$('#appMain').load('appMain');
					$("link[href='//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css']")[0].disabled=true;
					$('link[href="/css/login.css"]')[0].disabled=true;
                });
            // $(".avatar").css({
                // "background-image": "url('http://localhost:63342/WeeverWeb/image/35.jpg')"
            // });
			
		
        } else {
            $("#output").removeClass(' alert alert-success');
            $("#output").addClass("alert alert-danger animated fadeInUp").html("sorry enter a username or an email");
        }
    });
}
