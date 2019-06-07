

function UserModule() {
    const user = {
        token: Cookies.get('TokenKey'),
        name: Cookies.get('NameKey'),
        avatar: Cookies.get('AvatarKey')
    }

    if(user.token === undefined){
        return (
            <div className="user">
                <h2>欢迎来到资网</h2>
                <a href="login.html" className="upload">立即登录</a>
            </div>
        )
    }else{
        return (
            <div>
                <div className="user">
                    <div className="photo">
                        <img src="img/user-photo.png" alt="用户头像" />
                    </div>
                    <div className="detail">
                        <p>Leonardo_Zhu</p>
                        <div className="level">
                            等级 <em>1</em>
                        </div>
                    </div>
                </div>
    
                <a href="upload.html" className="upload">上传资源</a>
            </div>
        )
    }
}

function Resources(props){
    let data = []
    
    fetch(`${props}`)
    .then(response => response.json())
    .then(response => {
        data = response
    })

    const resources = data.map(resource =>
        <div>

        </div>
    )
    return (

    )
}

ReactDOM.render(
    <UserModule/>,
    document.getElementsByClassName("user-module")[0]
)