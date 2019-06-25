const baseUrl = 'http://10.129.235.5:9000'


window.onload = function () {
    const token = Cookies.get('TokenKey')
    fetch(baseUrl + '/user/dologin', {
        method: 'POST',
        headers: {
            Authorization: token
        }
    })
        .then(response => response.json())
        .then(response => {
            if(!response.flag){
                alert(response.message)
                window.location.href = 'http://47.101.39.237/login.html'
            }
        })
}