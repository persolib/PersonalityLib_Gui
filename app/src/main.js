const { app, BrowserWindow, nativeImage } = require("electron");
const path = require("path");
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');

// setup the titlebar main process
const options = {
  icon: path.join(__dirname, 'assets/ico/icon.png'),
  backgroundColor: TitlebarColor.fromHex('#FF0000')
};
setupTitlebar(options);

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.once("ready-to-show", () => {
    win.maximize();
  });

  win.loadFile("src/index.html");
  win.setMenuBarVisibility(false);

  // attach fullscreen(f11 and not 'maximized') && focus listeners
  attachTitlebarToWindow(win);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
