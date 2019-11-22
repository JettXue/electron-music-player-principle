const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')


class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    }
    const finalConfig = { ...basicConfig, ...config }
    super(finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

app.on('ready', () => {
  const mainWindow = new AppWindow({}, './renderer/index.html')
  ipcMain.on('addMusic', function (event) {
    const addWindow = new BrowserWindow({
      width: 600,
      height: 450,
      webPreferences: {
        nodeIntegration: true
      },
      parent: mainWindow
    })
    addWindow.loadFile('./renderer/add.html')
  })
  ipcMain.on('pickMusic', function (event, options) {
    dialog.showOpenDialog({
      title: '选择添加的音乐',
      properties: ['openFile']
    }, function (files) {
      if (files) event.sender.send('getMusic', files)
    })
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


