function Header() {

    const user = {
        token: Cookies.get('TokenKey'),
        name: Cookies.get('NameKey'),
        avatar: Cookies.get('AvatarKey')
    }

    return (
        <div className="navbar">
            {/* <!-- 品牌logo --> */}
            <a href="index.html" className="logo-brand">
                <img src="img/logo-brand.png" alt="logo" />
            </a>
            {/* <!-- 导航条 --> */}
            <ul className="ul-nav">
                <li><a href="index.html">首页</a></li>
                <li><a href="school.html">校园动态</a></li>
                <li><a href="upload.html">上传</a></li>
                <li><a href="me.html">我的</a></li>
            </ul>
            {/* <!-- 最右侧用户模块 --> */}
            {user.token === undefined ? <Login /> : <User user={user} />}
        </div>
    )
}

function Login() {
    return (
        <div className="login">
            <li>
                <a href="login.html">登录</a>
            </li>
        </div>
    )
}

class User extends React.Component {
    constructor() {
        super()
        this.state = {
            display: false
        }
    }

    logout() {

        Cookies.remove('TokenKey')
        Cookies.remove('NameKey')
        Cookies.remove('AvatarKey')

        window.location.reload()
    }

    render() {
        return (
            <div className="user-info">
                <li>
                    <a href="" className="notice">通知</a>
                </li>
                <li className="hover">
                    <i className="fa fa-plus" id="hover-info" onClick={() => this.setState({ display: !this.state.display })}></i>
                    <ul className="hover-info" style={{ display: this.state.display ? '' : 'none' }}>
                        <li>
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <a href="./makeFriends-submit.html" target="_blank">个人中心</a>
                        </li>
                        <li>
                            <i className="fa fa-cog" aria-hidden="true"></i>
                            <a href="./makeFriends-submit.html" target="_blank">账户设置</a>
                        </li>
                        <li>
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <a href="./makeFriends-submit.html" target="_blank">我的信息</a>
                        </li>
                        <li>
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                            <a href="javascript:void(0)" target="_blank" onClick={this.logout}>退出</a>
                        </li>

                    </ul>
                </li>
                <li>
                    <a href="http://47.101.39.237/user/" className="user-photo">
                        <img src={Cookies.get('AvatarKey')} alt="用户头像" />
                    </a>
                </li>
            </div>
        )
    }
}







ReactDOM.render(
    <Header />,
    document.getElementsByTagName("header")[0]
)



function getUser() {
    return {

    }
}