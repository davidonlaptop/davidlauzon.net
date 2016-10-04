var Portfolio = function(){
  // Pseudo-class instance
  // BEWARE: use +that+ instead of +this+ in public methods
  var that = {};
  
  // PRIVATE Variables & Methods
  var className = 'Portfolio';
  var logging   = true;
  var lang = 'fr';
  var projects = {};
  var FADEIN_DELAY = 200;
  var FADEOUT_DELAY = 1000;
  
  function log( msg ) {
    if (logging) {
      if (console && console.log)
        console.log( className + "::" + msg);
      else
        alert( className + "::" + msg );
    }
  }


  // PUBLIC Variables & Methods
  //that.lang = "fr";

	// Configure the portfolio
	that.setup = function(options) {
	  lang     = options['lang']     || 'fr';
	  projects = options['projects'] || {};
	  
	  that.loadProjects();
	};
	
	// Loads all project into the DOM
	that.loadProjects = function() {
	  // Display each project with a 500 ms in between
	  //log('Loading projects');
	  for (var i=0; i<projects.length; i++) {
	    //log('i=' + i);
  	  Portfolio.addProject( i, projects[i] );
  		
  		$('.project').addClass('ui-widget-content ui-corner-all ui-widget-shadow');
      $('.project a.ext').attr('target','_blank');
      
  		window.setTimeout( that.showProject, i * FADEIN_DELAY, i );
  	}
	};
  
  // Adds a project in the DOM
  that.addProject = function(projectId, project) {
    $('#portfolio').append('<div class="project" id="project_'+projectId+'" style="display:none;">'+
      '<div class="date">'+project.date+'</div>'+
      '<div class="title">'+project.title[lang]+'</div>'+
      '<div class="link"><a class="ext" href="'+project.href+'" target="_blank">'+project.link+'</a></div>'+
      '<div class="info">'+project.info[lang]+'</div>'+
    '</div>');
  };
  
  // Show the project with animations
  that.showProject = function(projectId){
	  $('#project_'+projectId).fadeIn(4000, 'swing');
	};
	
  // Toggle the viewing language
  that.switchLang = function() {
    //log('switching...');
    if (lang == 'fr') {
      $('#switchlang')[0].title = "voir la page en français";
      $('#switchlang')[0].innerHTML = "Français";
      $('#switchlang').css('backgroundImage', 'url("images/countryflags/png/fr.png")');
      lang = 'en';
    } else {
      $('#switchlang')[0].title = "view page in english";
      $('#switchlang')[0].innerHTML = "English";
      $('#switchlang').css('backgroundImage', 'url("images/countryflags/png/us.png")');
      lang = 'fr';
    }
    //log('language is now :' + lang);
    
    var projectsDOMs = $('.project');
    
    projectsDOMs.fadeOut(FADEOUT_DELAY);
    
    window.setTimeout( function(){ 
      projectsDOMs.remove();
      // Reload the projects in the new language;
      that.loadProjects();
    }, FADEOUT_DELAY );
  };
  
  // Return the current viewing language
  that.getLang = function() {
    return lang;
  }

  // Return pseudo-class
  return that;
}();

// Singleton requires the parenthesis at the end

// Instanciate the class (no need to use the +new+ keyword)
//var myPortfolio = Porfolio();


