const { ipcRenderer } = require('electron')

document.getElementById('pickMusicBtn').addEventListener('click', () => {
    ipcRenderer.send('pickMusic');
    ipcRenderer.on('getMusic', function(event, path){
        console.log('path', path);
    })
})