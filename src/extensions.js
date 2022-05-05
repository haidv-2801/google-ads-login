

window.fbAsyncInit = function() {
    if (initFB()) {
        setTimeout(() => { initFB() }, 2000)
    }
    function initFB() {
        if (window?.FB) {
            FB.init({
                appId: '2911900925804020',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v13.0'
            });

            return true;
        }
        return false;
    }
}

window.fbAsyncInit();