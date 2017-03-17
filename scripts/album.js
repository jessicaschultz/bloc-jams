 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

var albumSeasons = {
    title: 'Seasons',
    artist: 'Mother Nature',
    label: 'EM',
    year: '2017',
    albumArtUrl: 'assets/images/album_covers/13.png',
    songs: [
          {title: 'Winter', duration: '1:01'},
          {title: 'Spring', duration: '5:01' },
          { title: 'Summer', duration: '3:21'},
          { title: 'Fall', duration: '3:14' }
    ]

};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
    + '   <td class="song-item-number">' + songNumber + '</td>'
    + '   <td class="song-item-title">' + songName + '</td>'
    + '   <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;
  
  return template;
};

var setCurrentAlbum = function(album) {
      //#1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    
  //#2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
  
  // #3
     albumSongList.innerHTML = '';
 
  // #4
      for (var i = 0; i < album.songs.length; i++) {
             albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };
 
 window.onload = function() {
     setCurrentAlbum(albumPicasso);
 };
var albumImage = document.getElementsByClassName('album-cover-art')[0];
albumImage.addEventListener('click', function() {
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  
  if (albumTitle.firstChild.nodeValue == 'The Colors') {
    setCurrentAlbum(albumMarconi);
  }
  else if (albumTitle.firstChild.nodeValue == 'The Telephone') {
    setCurrentAlbum(albumSeasons);
  }
  else if (albumTitle.firstChild.nodeValue =='Seasons') {
    setCurrentAlbum(albumPicasso);
  };
})
//if the image is the first album, when I click on it, I want it to change to the second album
// if the image is the second album, when I clickon it, I want it to change to the third album
// if the image is the third album, when I clickon it, I want it to change to the first album
