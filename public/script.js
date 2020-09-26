const socket = io('/')
const videoGrid = document.getElementById('video-grid')
//room.ejs > <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js">
const myPeer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '443'
})
// var myPeer = new Peer('someid', { secure: true, host: 'your-app-name.herokuapp.com', port: 443, })
const myVideo = document.createElement('video')
// myVideo.muted = true
let myVideoStream
const peers = {}

// ---------------- MAIN
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(item_stream => {
    myVideoStream = item_stream
    addVideoStream(myVideo, item_stream)
    myPeer.on('call', call => {
        //★★★ 6) call.answer()
        call.answer(item_stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })
    //★★★ 4)
    socket.on('S_USER_KETNOIOK_1', arg_userId => {
        setTimeout(function () { onConnectToNewUser(arg_userId, item_stream) }, 1000)
    })

    // input value
    let text = $("input")
    // when press enter send message
    $('html').keydown(function (e) {
        if (e.which == 13 && text.val().length !== 0) {
            //★★★ 7)
            socket.emit('C_MSG_2', text.val())
            text.val('')
        }
    })
    //★★★ 10)
    socket.on("S_GUI_MSG_ALL_2", (argMessage, argUserId) => {
        $("ul").append(`<li class="message"><b>user [${argUserId}]: </b><br/>${argMessage}</li>`)
        scrollToBottom()
    })
})
// ---------------- MAIN

socket.on('S_USER_OUT_3', userId => {
    if (peers[userId]) peers[userId].close()
})

myPeer.on('open', arg_id => {
    //truyền từ room.ejs: "ROOM_ID" = xxx
    //phải call emit "C_VOROOM_1" trong myPeer.on() thì socket.on("C_VOROOM_1") mới nhận được (userId)
    //★★★ 2)
    socket.emit('C_VOROOM_1', ROOM_ID, arg_id)
})

const onConnectToNewUser = (arg_userId, arg_stream) => {
    const call = myPeer.call(arg_userId, arg_stream)
    const video = document.createElement('video')
    //★★★ 5) call.on()
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })

    peers[arg_userId] = call
}

const addVideoStream = (arg_video, arg_stream) => {
    arg_video.srcObject = arg_stream
    arg_video.addEventListener('loadedmetadata', () => {
        arg_video.play()
    })
    videoGrid.append(arg_video)
}

// ---------------- SUB
const scrollToBottom = () => {
    var d = $('.main__chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}


const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

const playStop = () => {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo()
    } else {
        setStopVideo()
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

const setMuteButton = () => {
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
    document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
    document.querySelector('.main__mute_button').innerHTML = html;
}

const setStopVideo = () => {
    const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `
    document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
    const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
    document.querySelector('.main__video_button').innerHTML = html;
}
// ---------------- SUB

