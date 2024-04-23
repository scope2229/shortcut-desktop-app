const {app, BrowserWindow, shell} = require("electron");
const contextMenu = require('electron-context-menu');
const windowStateKeeper = require('electron-window-state');

contextMenu({
    showInspectElement: false,
});

const APPURL = "https://app.shortcut.com";

app.on("ready", () => {
    let mainWindowState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 600,
    });

    const win = new BrowserWindow({
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
        },
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
    });

    win.loadURL(APPURL);

    win.webContents.setWindowOpenHandler(({url}) => {
        if (!url.startsWith(APPURL)) {
            shell.openExternal(url);
            return {action: "deny"};
        }
        return {action: "allow"};
    });

    mainWindowState.manage(win);
});
