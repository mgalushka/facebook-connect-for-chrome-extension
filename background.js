var successURL = 'https://www.facebook.com/connect/blank.html';
function onFacebookLogin() {
	if (!localStorage.accessToken) {
		chrome.tabs.getAllInWindow(null, function(tabs) {
			for (var i = 0; i < tabs.length; i++) {
				if (tabs[i].url.indexOf(successURL) !== -1) {
					var params = tabs[i].url.split('#')[1];
					access = params.split('&')[0]
					console.log(access);
					localStorage.accessToken = access;
					chrome.tabs.onUpdated.removeListener(onFacebookLogin);
					chrome.tabs.remove(tabs[i].id);
					return;
				}
			}
		});
	}
}
chrome.tabs.onUpdated.addListener(onFacebookLogin);
