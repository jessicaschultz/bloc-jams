var setSong = function(songNumber){
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber -1];
};

var getSongNumberCell = function(number){
  return  $('.song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '   <td class="song-item-title">' + songName + '</td>'
    + '   <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;
  
    var $row =  $(template);
    
    var clickHandler = function() {
             var songNumber = parseInt($(this).attr('data-song-number'));

             if (currentlyPlayingSongNumber !== null) {
                 // Revert to song number for currently playing song because user started playing new song.
                    var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                    currentlyPlayingCell.html(currentlyPlayingSongNumber);
                     /* var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                      currentlyPlayingCell.html(currentlyPlayingSongNumber);*/
             }
             if (currentlyPlayingSongNumber !== songNumber) {
                      // Switch from Play -> Pause button to indicate new song is playing.
                      $(this).html(pauseButtonTemplate);
                      setSong(songNumber);
                     //currentlyPlayingSongNumber = songNumber;
 +                 //currentSongFromAlbum = currentAlbum.songs[songNumber -1];
                      updatePlayerBarSong();
             } else if (currentlyPlayingSongNumber === songNumber) {
                      // Switch from Pause -> Play button to pause currently playing song.
                      $(this).html(playButtonTemplate);
                      $('.main-controls .play-pause').html(playerBarPlayButton);
                      setSong(songNumber);
                      //currentlyPlayingSongNumber = null;
                      //currentSongFromAlbum = null;
             }
    };

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
      /*var songNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
        var songNumber = parseInt(songNumberCell);*/

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        /*var songNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
        var songNumber = parseInt(songNumberCell);*/
      
        //for the commented out code above: why does it say the value of songNumberCell is [object Object] and value of songNumber is NaN
        //console.log("the value of songNumberCell is "+ songNumberCell + " and value of songNumber is "+ songNumber);

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
    
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
  
     $albumSongList.empty();
 
      for (var i = 0; i < album.songs.length; i++) {
             var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
             $albumSongList.append($newRow);
     }
 };

var trackIndex = function(album, song){
    return album.songs.indexOf(song);
};

var nextSong = function(){
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;
  
      if(currentSongIndex >= currentAlbum.songs.length){
          currentSongIndex = 0;
      }
  
    var lastSongNumber = currentlyPlayingSongNumber;
    /*kept getting an error saying songNumber was undefined, figured it not in the scope, but I thought
    function's parameters like songNumber are accessible ?*/
    var songNumber = currentlyPlayingSongNumber;
  
  //currentlyPlayingSongNumber = currentSongIndex + 1;
  //currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
  
    setSong(songNumber);
  
    updatePlayerBarSong();
  
    //var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    //var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber +'"]');
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    //var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber +'"]');
    setSong(songNumber);
  
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);  
};

var previousSong = function(){
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if(currentSongIndex < 0){
      currentSongIndex = currentAlbum.songs.length -1;
    }
  
    var lastSongNumber = currentlyPlayingSongNumber;
     /*again, same thing error songNumber undefined
     tried: var songNumber = parseInt($(this).attr('data-song-number')); but that messes with updatePlayerBarSong( )*/
    var songNumber = currentlyPlayingSongNumber;
    //currentlyPlayingSongNumber = currentSongIndex + 1;
  // currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
  
    setSong(songNumber);
  
    updatePlayerBarSong();
  
    $('.main-controls .play-pause').html(playerBarPauseButton);
  
   // var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    //var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    //var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
  
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

 /*getting updatePlayerBarSong( ) error about accessing currentSongFromAlbum.title when 
 Tried: var songNumber = parseInt($(this).attr('data-song-number'));*/ 
var updatePlayerBarSong = function(){
 
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);

  $('.main-controls .play-pause').html(playerBarPauseButton);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

 $(document).ready(function(){
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
 });