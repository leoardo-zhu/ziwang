const baseUrl = '10.129.235.5:9000'

// 登录面板
class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: {
                flag: false,
                msg: ''
            },
            account: {
                username: '',
                password: ''
            }
        }

        this.submit = this.submit.bind(this)
        // this.handleMsg
        this.handleAccount.bind(this)
    }

    handleMsg(error) {
        this.setState({
            error: error
        })
    }

    handleAccount(account) {
        this.setState({
            account: account
        })
    }

    submit() {
        const loginWay = this.props.headerInfo.title
        const account = this.state.account


        if (loginWay == '账户登录') {
            if (account.username.length == 0) {
                this.setState({ error: { flag: true, msg: '用户名为空' } })
                return
            }
            if (account.password.length == 0) {
                this.setState({ error: { flag: true, msg: '密码为空' } })
                return
            }
            fetch("https://easy-mock.com/mock/5cb31cc7bd0927702544e6ac/example/upload",
                {
                    method: 'POST',
                    body: account
                }).then(Response => {
                    Response.ok ? location.href = '' : alert('登录失败')
                })
        } else {
            const mobile = this.state.account.user
            const code = this.account.password

            if (mobile.length == 0) {
                this.setState({ error: { flag: true, msg: '手机号为空' } })
                return
            }
            if (code.length == 0) {
                this.setState({ error: { flag: true, msg: '验证码为空' } })
                return
            }

            fetch("https://easy-mock.com/mock/5cb31cc7bd0927702544e6ac/example/upload",
                {
                    method: 'POST',
                    body: mobile
                }).then(Response => {
                    Response.ok ? location.href = '' : this.setState({ error: { flag: true, msg: '' } })
                })
        }

    }

    render() {
        return (
            <div className="login-box">
                <Header headerInfo={this.props.headerInfo} />
                <div className="panel">
                    <form action="javascript:void(0)">
                        {this.props.loginWay}
                        <Msg error={this.state.error} />
                        <button className="submit" onClick={this.submit}>登录</button>
                        <ThirdLogin way="register" loginWay={this.props.headerInfo.title} />
                    </form>
                </div>
            </div>
        )
    }
}

// 注册面板
class RegisterForm extends React.Component {
    constructor() {
        super()
        this.state = {
            error: {
                flag: false,
                msg: ''
            },
            account: {
                mobile: '',
                password: '',
                code: ''
            }
        }

        this.submit = this.submit.bind(this)
    }

    handleMsg(error) {
        this.setState({
            error: error
        })
    }

    submit() {
        let error = this.state.error
        if (!error.flag) {
            fetch(`/user/register/${this.state.account.code}`, {
                method: 'POST',
                body: this.state.account
            }).then(response => response.json())
                .then(data => {
                    if (!data.flag) {
                        this.setState({ error: { flag: true, msg: data.message } })
                    } else {
                        window.location.href = ''
                    }
                })
        }
    }

    render() {
        const headerInfo = {
            title: '手机注册',
            display: 'none'
        }
        return (
            <div className="register-box">
                <Header headerInfo={headerInfo} />
                <div className="panel">
                    <form action="javascript:void(0)">
                        <SmsLogin render={<Password handleMsg={this.handleMsg.bind(this)} />} />
                        <Msg error={this.state.error} />
                        <button className="submit" onClick={this.submit} disabled={this.state.error.flag}>注册</button>
                        <ThirdLogin way="login" />
                    </form>
                </div>
            </div>
        )
    }
}

// 头部组件
function Header(props) {
    const headerInfo = props.headerInfo

    function changeLoginWay() {
        headerInfo.otherLogin == '账户登录' ?
            ReactDOM.render(
                <LoginForm {...accountLogin} />,
                document.getElementById("form")
            )
            :
            ReactDOM.render(
                <LoginForm {...smsLogin} />,
                document.getElementById("form")
            )
    }

    return (
        <div className="header">
            <span className="title">{headerInfo.title}</span>
            <a href="javascript:void(0)" style={{ display: headerInfo.display }} onClick={changeLoginWay}>
                {headerInfo.otherLogin}
                <i className="fa fa-angle-right" aria-hidden="true"></i>
            </a>
        </div>
    )
}

// 短信登录组件
class SmsLogin extends React.Component {

    initState = {
        disabled: true,
        msg: '获取验证码',
        time: 59
    }

    constructor() {
        super()
        this.state = Object.assign({
            mobile: '',
            code: '',
        }, this.initState)

        this.handleMobileChange = this.handleMobileChange.bind(this)
        this.handleCodeChange = this.handleCodeChange.bind(this)
        this.sendSms = this.sendSms.bind(this)
    }

    handleMobileChange(e) {
        const mobile = e.target.value
        this.setState({
            mobile: mobile
        })

        let reg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (reg.test(mobile)) {
            this.setState({
                code: '手机号正确',
                disabled: false
            })
        }
        else {
            this.setState({
                code: '',
                disabled: true
            })
        }
    }

    handleCodeChange(e) {
        const code = e.target.value
        this.setState({ code: code })
        this.props.handleAccount({
            username: this.state.mobile,
            password: this.state.code
        })
    }

    sendSms() {
        fetch(`https://easy-mock.com/mock/5ce2de5fd558b7779c32e533/ziwang/user/semdSms/{mobile}`, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    let timer = setInterval(() => {
                        this.setState({
                            time: this.state.time - 1,
                            msg: this.state.time + ' s 后重新获取',
                            disabled: true
                        })

                        if (this.state.time < 0) {
                            clearInterval(timer)
                            this.setState(Object.assign(this.initState, { disabled: false, msg: '重新获取' }))
                        }
                    }, 1000);
                }
            })
    }

    render() {
        return (
            <div className="sms">
                <div className="mobile">
                    <label htmlFor="mobile">+86</label>
                    <input type="text" id="mobile" name="mobile" placeholder="手机号码" onChange={this.handleMobileChange} />
                </div>
                {this.props.render}
                <div className="code">
                    <input type="text" id="code" name="code" placeholder="验证码" onChange={this.handleCodeChange} />
                    <button className={this.state.disabled ? "disabled" : ""} disabled={this.state.disabled} onClick={this.sendSms}>{this.state.msg}</button>
                </div>
            </div>
        )
    }
}

//账号登录组件
class AccountLogin extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="account">
                <div className="mobile">
                    <label htmlFor="account">
                        <i className="fa fa-user-o" aria-hidden="true"></i>
                    </label>
                    <input type="text" id="account" placeholder="手机/邮箱/资网账号" />
                </div>
                <div className="password">
                    <label htmlFor="password">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </label>
                    <input type="password" id="password" placeholder="登录密码" />
                </div>
                <a href="#">忘记密码</a>
            </div>
        )
    }
}

// 密码框组件
class Password extends React.Component {
    constructor() {
        super()
        this.state = {
            password: '',
            repassword: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handlePasswordBlur = this.handlePasswordBlur.bind(this)
        this.handleRepasswordBlur = this.handleRepasswordBlur.bind(this)
    }

    handleInputChange(e) {
        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name]: value
        })
    }

    handlePasswordBlur(e) {
        const password = e.target.value

        let level = 0

        if (password.indexOf(" ") >= 0) {
            this.props.handleMsg({ flag: true, msg: "密码不允许出现空格" })
            return
        }

        if (password.length < 8) {
            this.props.handleMsg({ flag: true, msg: "密码长度至少8位" })
            return

        } else if (password.length > 16) {
            this.props.handleMsg({ flag: true, msg: "密码长度至多16位" })
            return
        }

        if (/[0-9]/.test(password)) level++;
        if (/[A-Za-z]/.test(password)) level++;
        if (/[~#^$@%&!?%*+=_-]/gi.test(password)) level++;

        if (level < 2) {
            this.props.handleMsg({ flag: true, msg: "密码数字、字母、字符至少包含两种" })
            return
        }

        this.props.handleMsg({ flag: false, msg: "" })

    }
    handleRepasswordBlur(e) {
        const repassword = e.target.value
        const password = this.state.password

        repassword !== password ?
            this.props.handleMsg({ flag: true, msg: "两次密码不一致" })
            :
            this.props.handleMsg({ flag: false, msg: "" })
    }

    render() {
        return (
            <div>
                <div className="password">
                    <label htmlFor="password">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="密码(6-16位字母、数字和符号)"
                        onChange={this.handleInputChange}
                        onBlur={this.handlePasswordBlur} />

                </div>
                <div className="password">
                    <label htmlFor="repassword">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </label>
                    <input
                        type="password"
                        id="repassword"
                        name="repassword"
                        placeholder="确认密码"
                        onChange={this.handleInputChange}
                        onBlur={this.handleRepasswordBlur} />
                </div>
            </div>
        )
    }
}

// 错误信息组件
function Msg(props) {
    let error = props.error
    if (error.flag) {
        return (
            <div className="msg">
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                {error.msg}
            </div>
        )
    }
    else return null

}

// 第三方登录组件
function ThirdLogin(props) {
    let way = {}
    if (props.way === "login") {
        way.display = "none"
        way.way = "登录"
        way.render = <LoginForm loginWay={<SmsLogin />} headerInfo={{ title: '手机快捷登录', otherLogin: '账户登录' }} />

    } else {
        way.way = "注册"
        way.render = <RegisterForm />
    }

    return (
        <div className="third-login">
            <div className="other" style={{ display: way.display }}>
                <span>其他方式：</span>
                <img src="img/third-login.png" alt="" />
            </div>
            <a href="javascript:void(0)" onClick={() => {
                ReactDOM.render(
                    way.render,
                    document.getElementById("form")
                )
            }}>{way.way}</a>
        </div>
    )
}

const smsLogin = {
    loginWay: <SmsLogin handleAccount={this.handleAccount} />,
    headerInfo: { title: '手机快捷登录', otherLogin: '账户登录' }
}

const accountLogin = {
    loginWay: <AccountLogin handleAccount={this.handleAccount} />,
    headerInfo: { title: '账户登录', otherLogin: '手机快捷登录' }
}

// 初始化渲染登录面板
ReactDOM.render(
    <LoginForm {...smsLogin} />,
    document.getElementById("form")
)





