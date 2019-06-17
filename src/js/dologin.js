const baseUrl = 'http://10.129.235.5:9000'


window.onload = function () {
    const token = Cookies.get('TokenKey')
    fetch(baseUrl + '/user/dologin', {
        method: 'POST',
        headers: {
            Authorization: token || '124'
        }
    })
        .then(response => response.json())
        .then(response => {
            if(!response.flag){
                alert(response.message)
                window.location.href = 'https://www.baidu.com'
            }
        })
}