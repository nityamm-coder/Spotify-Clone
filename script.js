console.log("javascript starts!!!")


let currentSong = new Audio();
const playbtn =  document.querySelector(".btn");
let songs;
let currFolder;
let isShuffleOn = false;
const shuffleIcon = document.querySelector(".shuffle");
let isLoopOn = false;
const loopIcon = document.querySelector(".loop");



//to change the play/pause svg 
function setPlaybackButtonState(isPlaying) {
    playbtn.setAttribute("src", isPlaying ? "img/pause.svg" : "img/play.svg");
}
//to reset the progress of the seekbar and timer when song/playlist changes
function resetProgressUI() {
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
    document.querySelector(".circle").style.left = "0%";
    document.querySelector(".bar .progress").style.width = "0%";
}


//show playlist name and total songs it conatin 
const libraryPlaylistName = document.getElementById("libraryPlaylistName");
function updateLibraryTitle(title, totalSongs) {
    libraryPlaylistName.textContent = `${title}  •  ${totalSongs} songs `;
}


//change background of the selected song in card
function updateActiveSongRow(track) {
    const rows = document.querySelectorAll(".songList li");

    rows.forEach(row => {
        const rowTitle = row.querySelector(".songinfo > div")?.textContent.trim();
        //finds the song name inside that row

        
        row.classList.toggle("active", rowTitle === track);
        //compares the row’s song name with the song currently being played
        //adds the class 'active' if the song matches, which highlights that particular row

        const isActive = rowTitle === track;
        const playIcon = row.querySelector(".playNow img");
        if (playIcon) {
            const shouldShowPause = isActive && !currentSong.paused;
            playIcon.src = shouldShowPause ? "img/pause.svg" : "img/play.svg";
        }

    });
}


//logic for shuffling the song
function getCurrentTrackName() {
    if (!currentSong.src) return null;

    return decodeURIComponent(
        currentSong.src.split("/").slice(-1)[0].replace(/\.mp3$/i, "")
    );
}

function getRandomSong(exceptTrack = null) {
    if (!Array.isArray(songs) || songs.length === 0) return null;

    let randomSong = null;

    do {
        const randomIndex = Math.floor(Math.random() * songs.length);
        randomSong = songs[randomIndex];
    } while (randomSong === exceptTrack && songs.length > 1);

    return randomSong;
}





function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}






async function getSongs(folder) {
    currFolder = folder;
    console.log("Folder selected: ", folder)

    let a = await fetch(`http://127.0.0.1:3000/${folder}`)
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as)
    songs = []
    // console.log(songs)
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        // if (element.href.endsWith(".mp3")) {
        //     // songs.push(element.href.split("%5C")[3].replaceAll("%20", " ").replace(/\.mp3$/i, ""));
        // }
        const href = element.getAttribute('href') || element.href;
        if (/\.mp3$/i.test(href)) {
            const decoded = decodeURIComponent(href);
            const file = decoded.replace(/^.*[\/\\]/, '').replace(/\.mp3$/i, '');
            songs.push(file);
            // console.log('parsed song:', { href, decoded, file });
        }

    }
    //showing all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <img src="img/music.svg" alt="" style="filter: invert(1);">
                            <div class="songinfo">
                                <div>${song}</div>
                                <div>Nityam</div>
                            </div>
                            <div class="playNow">
                                <span>Play Now</span>
                                <img class= "btnn" src="img/play.svg" alt="" style="filter: invert(1);">
                            </div>
        
         </li>`;
    }

    //attach an event listner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=> {
        e.addEventListener("click", element =>{
            // console.log(e.querySelector(".songinfo").firstElementChild.innerHTML)
            playMusic(e.querySelector(".songinfo").firstElementChild.innerHTML.trim())
        })
    });

    return songs;

}

const playMusic = (track, pause = false)=>{
    // let audio = new Audio("/songs/" + track)
    currentSong.pause();
    currentSong.currentTime = 0;

    const fileName = track.endsWith(".mp3") ? track : `${track}.mp3`;
    currentSong.src = `/${currFolder}/` + encodeURIComponent(fileName);

/* Checks if track already ends with .mp3
if yes, use track as it is, if no, append .mp3
Use encodeURIComponent(fileName) so spaces become %20 e.g. Brown Rang.mp3 becomes Brown%20Rang.mp3 */

    setPlaybackButtonState(!pause);
    
    document.querySelector(".songInfo").innerHTML = track
    resetProgressUI();

    // currentSong.src = "/songs/" + track
    if(!pause){
        currentSong.play()
    }


    updateActiveSongRow(track);

}


async function displayAlbums() {
     let a = await fetch(`http://127.0.0.1:3000/songs`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    // console.log(div)
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")

    let array = Array.from(anchors)

        for (let index = 0; index < array.length; index++) {
            const e = array[index];
            
        
        if(e.href.includes("songs")){
            let folder = (decodeURIComponent(e.href.split("/")[3]).slice(7))

            //get metadata of the folder
            let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
            let response = await a.json();
            // console.log(response)
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
                    
                    <img class="playgreen" src="img/playgreen.svg" alt="">
                    <img class="img" src="songs/${folder}/cover.jpg" alt="img">
                    <h2>${response.title}</h2>
                    <p>${response.description}</p>
                </div>`

        }
    }
    //load playlist whenever the card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(card => {
        card.addEventListener("click", async event => {
            const folder = event.currentTarget?.dataset.folder
                ?? event.target.closest('.card')?.dataset.folder;

            if (!folder) return console.warn('Card folder not found');

            songs = await getSongs(`songs/${folder}`);
            if (songs && songs.length) playMusic(songs[0], true);

            let info = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`);
            let data = await info.json();

            updateLibraryTitle(data.title, songs.length);

        });
    });
}






async function main() {
    //getting list of all songs
    await getSongs("songs/Prime Bollywood")
    // console.log(songs)
    updateLibraryTitle("Prime Bollywood", songs.length);    
    playMusic(songs[0], true)

    
    //display all the albums/playlist on the page
    displayAlbums()

    
    //attach an event listener to play, next & previous
    playbtn.addEventListener("click", ()=>{
        if (currentSong.paused) {
            currentSong.play()
            setPlaybackButtonState(true);
        }
        else{
            currentSong.pause()
            setPlaybackButtonState(false);
        }
 
        const currentTrack = getCurrentTrackName();
        if (currentTrack) updateActiveSongRow(currentTrack);

    })



    // keep the seek bar and timer synced
    currentSong.addEventListener("timeupdate", () => {
        const duration = Number(currentSong.duration) || 0;
        if (!duration) return;

        const percent = (currentSong.currentTime / duration) * 100;

        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(duration)}`;

        document.querySelector(".circle").style.left = percent + "%";
        document.querySelector(".bar .progress").style.width = percent + "%";
    });

    // click on bar to seek to exact location
    document.querySelector(".bar").addEventListener("click", e => {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const duration = Number(currentSong.duration) || 0;

        if (!duration) return;

        const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1) * 100;

        document.querySelector(".circle").style.left = percent + "%";
        document.querySelector(".bar .progress").style.width = percent + "%";

        currentSong.currentTime = (duration * percent) / 100;
    });



    //adding event listener to previous button
    document.querySelector(".previous").addEventListener("click", ()=>{
        currentSong.pause()
        console.log("Previous clicked")

        if (!Array.isArray(songs) || !currentSong.src) return console.warn("No songs loaded or no current track");

        const currentTrack = decodeURIComponent(
            currentSong.src.split("/").slice(-1)[0].replace(/\.mp3$/i, "")
        );

        const index = songs.indexOf(currentTrack);

        if (isShuffleOn) {
            const randomSong = getRandomSong(currentTrack);
            if (randomSong) playMusic(randomSong);
            return;
        }

        if((index) > 0){
            playMusic(songs[index-1])
        } else {
            playMusic(songs[songs.length - 1]);
        }

    });

    //adding event listener to next button
    document.querySelector(".next").addEventListener("click", () => {
        currentSong.pause();

        if (!Array.isArray(songs) || !currentSong.src) return;

        const currentTrack = decodeURIComponent(
            currentSong.src.split("/").slice(-1)[0].replace(/\.mp3$/i, "")
        );

        if (isShuffleOn) {
            const randomSong = getRandomSong(currentTrack);
            if (randomSong) playMusic(randomSong);
            return;
        }


        const index = songs.indexOf(currentTrack);

        if (index + 1 < songs.length) {
            playMusic(songs[index + 1]);
        } else {
            playMusic(songs[0]);
        }
    });



    //auto-play next song when current song ends
    currentSong.addEventListener("ended", () => {

        if (isLoopOn) {
            currentSong.currentTime = 0;
            currentSong.play();
            return;
        }

        if (!Array.isArray(songs) || !currentSong.src) return;

        const currentTrack = decodeURIComponent(
            currentSong.src.split("/").slice(-1)[0].replace(/\.mp3$/i, "")
        );

        if (isShuffleOn) {
            const randomSong = getRandomSong(currentTrack);
            if (randomSong) playMusic(randomSong);
            return;
        }

        const index = songs.indexOf(currentTrack);

        if (index + 1 < songs.length) {
            playMusic(songs[index + 1]);
        } else {
            playMusic(songs[0]); // loop back to the first song
        }
    });



    //adding event listener to Volume range
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
        console.log("Volume set to: ", e.target.value, "/ 100")
        currentSong.volume  = parseInt(e.target.value)/100;
    })

    //filled gradient inside volume range
    const volumeRange = document.querySelector('.volume input[type="range"]');

    function updateVolumeGradient() {
        const min = Number(volumeRange.min || 0);
        const max = Number(volumeRange.max || 100);
        const value = Number(volumeRange.value);
        const percent = ((value - min) / (max - min)) * 100;
        volumeRange.style.setProperty('--range-percent', `${percent}%`);
    }
    volumeRange.addEventListener('input', updateVolumeGradient);
    updateVolumeGradient();



    //adding event listener to mute volume
    document.querySelector(".volume>img").addEventListener("click", e=>{
        if(e.target.src.includes("volume.svg")){
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
            volumeRange.style.setProperty('--range-percent', "0%");
        }
        else{
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentSong.volume = 0.2;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 20;
            volumeRange.style.setProperty('--range-percent', "20%");
            
        }
    })


    //event listener for play/Pause from Keyboard --> Spacebar
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            event.preventDefault(); // prevents page scrolling

            if (currentSong.paused) {
                currentSong.play();
                playbtn.setAttribute("src", "img/pause.svg");
            } else {
                currentSong.pause();
                playbtn.setAttribute("src", "img/play.svg");
            }
        }
    });


    //event listener for shuffle
    shuffleIcon.addEventListener("click", () => {
        isShuffleOn = !isShuffleOn;
        shuffleIcon.classList.toggle("active", isShuffleOn);
    });


    //event listener for loop 
    loopIcon.addEventListener("click", () => {
        isLoopOn = !isLoopOn;
        loopIcon.classList.toggle("active", isLoopOn);
    });
    

}



main()
