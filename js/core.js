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
  'visionmedia',
  'guille',
  'nzakas',
  'jeresig',
  'substack',
  'dherman',
  'creationix',
  'mrdoob',
  'codepo8'
];

for (var user in users) {
  $.get('https://api.github.com/users/'+users[user]+'?client_id=5feee647eb6cc3d1f984&client_secret=9ed0c553e278d047a264c3abd26f385144d51ac4', function(result) {
      $('#whotofollow .users').append('<div class="user"><a href="'+result.html_url+'"><img src="'+result.avatar_url+'"><span>'+result.name+'</span></a></div>');
  });
}

$.get('https://api.github.com/repos/braziljs/js-the-right-way/contributors?client_id=5feee647eb6cc3d1f984&client_secret=9ed0c553e278d047a264c3abd26f385144d51ac4', function(result) {
  for (var i = 0; i < result.length; i++) {
    $('#footer .users').append('<div class="user"><a href="'+result[i].html_url+'"><img src="'+result[i].avatar_url+'"><span>'+result[i].login+'</span></a></div>');
  }
})
