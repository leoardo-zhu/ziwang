var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseUrl = 'http://10.129.235.5:9000';

// 登录面板
function LoginForm(props) {
    return React.createElement(
        "div",
        { className: "login-box" },
        React.createElement(Header, { headerInfo: props.headerInfo }),
        React.createElement(
            "div",
            { className: "panel" },
            React.createElement(
                "form",
                { action: "javascript:void(0)" },
                props.loginWay,
                React.createElement(ThirdLogin, { way: "register", loginWay: props.headerInfo.title })
            )
        )
    );
}

// 注册面板
function RegisterForm() {

    var headerInfo = {
        title: '手机注册',
        display: 'none'
    };

    return React.createElement(
        "div",
        { className: "register-box" },
        React.createElement(Header, { headerInfo: headerInfo }),
        React.createElement(
            "div",
            { className: "panel" },
            React.createElement(
                "form",
                { action: "javascript:void(0)" },
                React.createElement(SmsLogin, { register: true }),
                React.createElement(ThirdLogin, { way: "login" })
            )
        )
    );
}

// 头部组件
function Header(props) {
    var headerInfo = props.headerInfo;

    function changeLoginWay() {
        headerInfo.otherLogin == '账户登录' ? ReactDOM.render(React.createElement(LoginForm, accountLogin), document.getElementById("form")) : ReactDOM.render(React.createElement(LoginForm, smsLogin), document.getElementById("form"));
    }

    return React.createElement(
        "div",
        { className: "header" },
        React.createElement(
            "span",
            { className: "title" },
            headerInfo.title
        ),
        React.createElement(
            "a",
            { href: "javascript:void(0)",
                style: { display: headerInfo.display },
                onClick: changeLoginWay
            },
            headerInfo.otherLogin,
            React.createElement("i", { className: "fa fa-angle-right", "aria-hidden": "true" })
        )
    );
}

// 短信登录组件

var SmsLogin = function (_React$Component) {
    _inherits(SmsLogin, _React$Component);

    function SmsLogin() {
        _classCallCheck(this, SmsLogin);

        var _this = _possibleConstructorReturn(this, (SmsLogin.__proto__ || Object.getPrototypeOf(SmsLogin)).call(this));

        _this.initState = {
            disabled: true,
            msg: '获取验证码',
            time: 59
        };

        _this.state = Object.assign({
            mobile: '',
            code: '',
            password: '',
            error: {
                flag: false,
                msg: ''
            }
        }, _this.initState);

        _this.handleMobileChange = _this.handleMobileChange.bind(_this);
        _this.handleCodeChange = _this.handleCodeChange.bind(_this);
        _this.sendSms = _this.sendSms.bind(_this);
        _this.submit = _this.submit.bind(_this);
        return _this;
    }

    _createClass(SmsLogin, [{
        key: "handleMobileChange",
        value: function handleMobileChange(e) {
            var mobile = e.target.value;
            this.setState({
                mobile: mobile,
                error: { flag: false, msg: '' }
            });

            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (reg.test(mobile)) {
                this.setState({ disabled: false });
            } else {
                this.setState({ disabled: true });
            }
        }
    }, {
        key: "handleCodeChange",
        value: function handleCodeChange(e) {
            this.setState({ code: e.target.value, error: { flag: false, msg: '' } });
        }
    }, {
        key: "handleMsg",
        value: function handleMsg(error) {
            this.setState({ error: error });
        }
    }, {
        key: "handlePassword",
        value: function handlePassword(password) {
            this.setState({ password: password, error: { flag: false, msg: '' } });
        }
    }, {
        key: "sendSms",
        value: function sendSms() {
            var _this2 = this;

            var mobile = this.state.mobile;
            fetch(baseUrl + ("/user/sendsms/" + mobile), { method: 'POST' }).then(function (response) {
                if (response.ok) {
                    var timer = setInterval(function () {
                        _this2.setState({
                            time: _this2.state.time - 1,
                            msg: _this2.state.time + ' s 后重新获取',
                            disabled: true
                        });

                        if (_this2.state.time < 0) {
                            clearInterval(timer);
                            _this2.setState(Object.assign(_this2.initState, { disabled: false, msg: '重新获取' }));
                        }
                    }, 1000);
                }
            });
        }
    }, {
        key: "submit",
        value: function submit() {
            var _this3 = this;

            if (this.state.error.flag) return;

            var mobile = this.state.mobile;
            var code = this.state.code;
            var password = this.state.password;

            if (mobile.length == 0) {
                this.setState({ error: { flag: true, msg: '手机号为空' } });
                return;
            }

            if (code.length == 0) {
                this.setState({ error: { flag: true, msg: '验证码为空' } });
                return;
            }

            if (this.props.register) {
                fetch(baseUrl + ("/user/register/" + code), {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ mobile: mobile, password: password })
                }).then(function (response) {
                    return response.json();
                }).then(function (response) {
                    if (response.flag) {
                        var _response$data = response.data,
                            token = _response$data.token,
                            name = _response$data.name,
                            avatar = _response$data.avatar;

                        Cookies.set('TokenKey', token);
                        Cookies.set('NameKey', name);
                        Cookies.set('AvatarKey', avatar);
                        window.location.href = 'index.html';
                    } else _this3.setState({ error: { flag: true, msg: response.message } });
                });
            } else {
                fetch(baseUrl + ("/user/login/" + code), {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ mobile: mobile })
                }).then(function (response) {
                    return response.json();
                }).then(function (response) {
                    if (response.flag) {
                        var _response$data2 = response.data,
                            token = _response$data2.token,
                            name = _response$data2.name,
                            avatar = _response$data2.avatar;

                        Cookies.set('TokenKey', token);
                        Cookies.set('NameKey', name);
                        Cookies.set('AvatarKey', avatar);
                        window.location.href = 'index.html';
                    } else _this3.setState({ error: { flag: true, msg: response.message } });
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "sms" },
                React.createElement(
                    "div",
                    { className: "mobile" },
                    React.createElement(
                        "label",
                        { htmlFor: "mobile" },
                        "+86"
                    ),
                    React.createElement("input", { type: "text", id: "mobile", name: "mobile", placeholder: "\u624B\u673A\u53F7\u7801", onChange: this.handleMobileChange, autoComplete: "off" })
                ),
                this.props.register ? React.createElement(Password, { handleMsg: this.handleMsg.bind(this), handlePassword: this.handlePassword.bind(this) }) : '',
                React.createElement(
                    "div",
                    { className: "code" },
                    React.createElement("input", { type: "text", id: "code", name: "code", placeholder: "\u9A8C\u8BC1\u7801", onChange: this.handleCodeChange, autoComplete: "off" }),
                    React.createElement(
                        "button",
                        { className: this.state.disabled ? "disabled" : "", disabled: this.state.disabled, onClick: this.sendSms },
                        this.state.msg
                    )
                ),
                React.createElement(Msg, { error: this.state.error }),
                React.createElement(
                    "button",
                    { className: "submit", onClick: this.submit },
                    this.props.register ? '注册' : '登录'
                )
            );
        }
    }]);

    return SmsLogin;
}(React.Component);

//账号登录组件


var AccountLogin = function (_React$Component2) {
    _inherits(AccountLogin, _React$Component2);

    function AccountLogin() {
        _classCallCheck(this, AccountLogin);

        var _this4 = _possibleConstructorReturn(this, (AccountLogin.__proto__ || Object.getPrototypeOf(AccountLogin)).call(this));

        _this4.state = {
            username: '',
            password: '',
            error: {
                flag: false,
                msg: ''
            }
        };

        _this4.handleInputChange = _this4.handleInputChange.bind(_this4);
        _this4.submit = _this4.submit.bind(_this4);
        return _this4;
    }

    _createClass(AccountLogin, [{
        key: "handleInputChange",
        value: function handleInputChange(e) {
            var id = e.target.id;
            var value = e.target.value;

            this.setState(_defineProperty({}, id, value));
        }
    }, {
        key: "submit",
        value: function submit() {
            var _this5 = this;

            var username = this.state.username;
            var password = this.state.password;

            if (username.length == 0) {
                this.setState({ error: { flag: true, msg: '用户名为空' } });
                return;
            }

            if (password.length == 0) {
                this.setState({ error: { flag: true, msg: '密码为空' } });
                return;
            }

            fetch(baseUrl + "/user/login", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                if (response.flag) {
                    var _response$data3 = response.data,
                        token = _response$data3.token,
                        name = _response$data3.name,
                        avatar = _response$data3.avatar;

                    Cookies.set('TokenKey', token);
                    Cookies.set('NameKey', name);
                    Cookies.set('AvatarKey', avatar);
                    window.location.href = 'index.html';
                } else _this5.setState({ error: { flag: true, msg: response.message } });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "account" },
                React.createElement(
                    "div",
                    { className: "mobile" },
                    React.createElement(
                        "label",
                        { htmlFor: "account" },
                        React.createElement("i", { className: "fa fa-user-o", "aria-hidden": "true" })
                    ),
                    React.createElement("input", { type: "text", id: "username", placeholder: "\u624B\u673A/\u90AE\u7BB1/\u8D44\u7F51\u8D26\u53F7", onChange: this.handleInputChange, autoComplete: "off" })
                ),
                React.createElement(
                    "div",
                    { className: "password" },
                    React.createElement(
                        "label",
                        { htmlFor: "password" },
                        React.createElement("i", { className: "fa fa-lock", "aria-hidden": "true" })
                    ),
                    React.createElement("input", { type: "password", id: "password", placeholder: "\u767B\u5F55\u5BC6\u7801", onChange: this.handleInputChange, autoComplete: "off" })
                ),
                React.createElement(
                    "a",
                    { href: "#" },
                    "\u5FD8\u8BB0\u5BC6\u7801"
                ),
                React.createElement(Msg, { error: this.state.error }),
                React.createElement(
                    "button",
                    { className: "submit", onClick: this.submit },
                    "\u767B\u5F55"
                )
            );
        }
    }]);

    return AccountLogin;
}(React.Component);

// 密码框组件


var Password = function (_React$Component3) {
    _inherits(Password, _React$Component3);

    function Password() {
        _classCallCheck(this, Password);

        var _this6 = _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).call(this));

        _this6.state = {
            password: '',
            repassword: ''
        };

        _this6.handleInputChange = _this6.handleInputChange.bind(_this6);
        _this6.handlePasswordBlur = _this6.handlePasswordBlur.bind(_this6);
        _this6.handleRepasswordBlur = _this6.handleRepasswordBlur.bind(_this6);
        return _this6;
    }

    _createClass(Password, [{
        key: "handleInputChange",
        value: function handleInputChange(e) {
            var name = e.target.name;
            var value = e.target.value;

            this.setState(_defineProperty({}, name, value));

            this.props.handlePassword(this.state.repassword);
        }
    }, {
        key: "handlePasswordBlur",
        value: function handlePasswordBlur(e) {
            var password = e.target.value;

            var level = 0;

            if (password.indexOf(" ") >= 0) {
                this.props.handleMsg({ flag: true, msg: "密码不允许出现空格" });
                return;
            }

            if (password.length < 8) {
                this.props.handleMsg({ flag: true, msg: "密码长度至少8位" });
                return;
            } else if (password.length > 16) {
                this.props.handleMsg({ flag: true, msg: "密码长度至多16位" });
                return;
            }

            if (/[0-9]/.test(password)) level++;
            if (/[A-Za-z]/.test(password)) level++;
            if (/[~#^$@%&!?%*+=_-]/gi.test(password)) level++;

            if (level < 2) {
                this.props.handleMsg({ flag: true, msg: "密码数字、字母、字符至少包含两种" });
                return;
            }

            this.props.handleMsg({ flag: false, msg: "" });
        }
    }, {
        key: "handleRepasswordBlur",
        value: function handleRepasswordBlur(e) {
            var repassword = e.target.value;
            var password = this.state.password;

            repassword !== password ? this.props.handleMsg({ flag: true, msg: "两次密码不一致" }) : this.props.handleMsg({ flag: false, msg: "" });

            this.props.handlePassword(repassword);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "password" },
                    React.createElement(
                        "label",
                        { htmlFor: "password" },
                        React.createElement("i", { className: "fa fa-lock", "aria-hidden": "true" })
                    ),
                    React.createElement("input", {
                        type: "password",
                        id: "password",
                        name: "password",
                        placeholder: "\u5BC6\u7801(6-16\u4F4D\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u7B26\u53F7)",
                        onChange: this.handleInputChange,
                        onBlur: this.handlePasswordBlur })
                ),
                React.createElement(
                    "div",
                    { className: "password" },
                    React.createElement(
                        "label",
                        { htmlFor: "repassword" },
                        React.createElement("i", { className: "fa fa-lock", "aria-hidden": "true" })
                    ),
                    React.createElement("input", {
                        type: "password",
                        id: "repassword",
                        name: "repassword",
                        placeholder: "\u786E\u8BA4\u5BC6\u7801",
                        onChange: this.handleInputChange,
                        onBlur: this.handleRepasswordBlur })
                )
            );
        }
    }]);

    return Password;
}(React.Component);

// 错误信息组件


function Msg(props) {
    var error = props.error;
    if (error.flag) {
        return React.createElement(
            "div",
            { className: "msg" },
            React.createElement("i", { className: "fa fa-exclamation-circle", "aria-hidden": "true" }),
            error.msg
        );
    } else return null;
}

// 第三方登录组件
function ThirdLogin(props) {
    var way = {};
    if (props.way === "login") {
        way.display = "none";
        way.way = "登录";
        way.render = React.createElement(LoginForm, { loginWay: React.createElement(SmsLogin, null), headerInfo: { title: '手机快捷登录', otherLogin: '账户登录' } });
    } else {
        way.way = "注册";
        way.render = React.createElement(RegisterForm, null);
    }

    return React.createElement(
        "div",
        { className: "third-login" },
        React.createElement(
            "div",
            { className: "other", style: { display: way.display } },
            React.createElement(
                "span",
                null,
                "\u5176\u4ED6\u65B9\u5F0F\uFF1A"
            ),
            React.createElement("img", { src: "img/third-login.png", alt: "" })
        ),
        React.createElement(
            "a",
            { href: "javascript:void(0)", onClick: function onClick() {
                    ReactDOM.render(way.render, document.getElementById("form"));
                } },
            way.way
        )
    );
}

var smsLogin = {
    loginWay: React.createElement(SmsLogin, null),
    headerInfo: { title: '手机快捷登录', otherLogin: '账户登录' }
};

var accountLogin = {
    loginWay: React.createElement(AccountLogin, null),
    headerInfo: { title: '账户登录', otherLogin: '手机快捷登录' }

    // 初始化渲染登录面板
};ReactDOM.render(React.createElement(LoginForm, smsLogin), document.getElementById("form"));