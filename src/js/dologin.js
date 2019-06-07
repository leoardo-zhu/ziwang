const baseUrl = 'http://localhost:9000'


window.onload = function () {
    fetch(baseUrl + `/user/dologin/${Cookies.get('TokenKey')}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(response => {
            if (!response.flag) {
                Cookies.remove('TokenKey')
                location.href = 'index.html'
            }
        })
}