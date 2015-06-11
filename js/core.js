var App = (function( window, document, $ ) {

    'use strict';

    var users = [
      'BrendanEich', 
      'isaacs', 
      'rdworth', 
      'fat', 
      'michalbe', 
      'afabbro',
      'addyosmani', 
      'joezimjs', 
      'douglascrockford',
      'paulirish',
      'tj',
      'guille',
      'nzakas',
      'jeresig',
      'substack',
      'dherman',
      'creationix',
      'mrdoob',
      'codepo8',
      'rwaldron',
      'darkwing',
      'bevacqua'
    ],
    userIsDone;

    return {
        // Init function
        init: function() {
            this.getGithubUsers();
            this.getGithubContrib();
        },
        // Getting and appending users of github
        getGithubUsers: function() {
            var i = userIsDone = users.length,
                str=[];
            // Callback function
            function cb( result ) {
                userIsDone-=1;
                str.push( [ '<div class="user"><a href="', result.html_url, '"><img height="80" width="80" src="', result.avatar_url, '"><span>', result.name, '</span></a></div>' ].join('') );
                // Checking if all callbacks were called
                if( userIsDone === 0 ) {
                   $('#whotofollow .users').append( str.join('') );
                }
            }
            // Doing the requests for each user
            while ( i-- ) {
              $.get( [ 'https://api.github.com/users/', users[ i ], '?client_id=5feee647eb6cc3d1f984&client_secret=9ed0c553e278d047a264c3abd26f385144d51ac4' ].join(''), cb );
            }
        },
        // Getting the project's contributors
        getGithubContrib: function() {

            // Callback function
            function cb( result ) {
                var i=0,
                    length = result.length,
                    str=[];

                for ( ; i < length; i+=1 ) {
                    str.push( [ '<div class="user"><a href="', result[ i ].html_url, '"><img width="80" height="80" src="', result[ i ].avatar_url, '"><span>', result[ i ].login, '</span></a></div>' ].join('') );
                }
                $('#footer .users').append( str.join('') );
            }

            // Doing the request
            $.get('https://api.github.com/repos/braziljs/js-the-right-way/contributors?client_id=5feee647eb6cc3d1f984&client_secret=9ed0c553e278d047a264c3abd26f385144d51ac4', cb )
        }
    }


}( window, document, jQuery ));

// Starting the Application
App.init();