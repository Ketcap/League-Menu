import menubar from 'menubar';
import AutoLaunch from 'auto-launch';
import { Menu,session } from 'electron';

export const mb = menubar({
	dir:__dirname+'/../',
	preloadWindow: true,
	height: 850,
	width: 400,
	alwaysOnTop: true,
	icon: __dirname + '/../assets/dragon.png'
});

let appLauncher = new AutoLaunch({ name: 'Dragon', isHidden: true });

const contextMenu = Menu.buildFromTemplate([
	{
		label: 'Launch on Login',
		type: 'checkbox',
		checked: false,
		click: item => {
			appLauncher.isEnabled().then(enabled => {
				if (enabled) {
					return appLauncher.disable().then(() => {
						item.checked = false;
					});
				} else {
					return appLauncher.enable().then(() => {
						item.checked = true;
					});
				}
			});
		},
	},
	{
		label: 'Quit Dragon',
		click: () => mb.app.quit(),
	},
	{
		label: 'Toggle DevTools',
		accelerator: 'Alt+CommandOrControl+I',
		click: function () { mb.window.toggleDevTools() }
	}
]);
mb.on('ready', () => {
	mb.tray.on('right-click', () => {
		mb.tray.popUpContextMenu(contextMenu);
	});
});