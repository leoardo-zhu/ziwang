var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseUrl = '10.129.235.5:9000';

// 登录面板

var LoginForm = function (_React$Component) {
    _inherits(LoginForm, _React$Component);

    function LoginForm(props) {
        _classCallCheck(this, LoginForm);

        var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

        _this.state = {
            error: {
                flag: false,
                msg: ''
            },
            account: {
                username: '',
                password: ''
            }
        };

        _this.submit = _this.submit.bind(_this);
        // this.handleMsg
        _this.handleAccount.bind(_this);
        return _this;
    }

    _createClass(LoginForm, [{
        key: 'handleMsg',
        value: function handleMsg(error) {
            this.setState({
                error: error
            });
        }
    }, {
        key: 'handleAccount',
        value: function handleAccount(account) {
            this.setState({
                account: account
            });
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _this2 = this;

            var loginWay = this.props.headerInfo.title;
            var account = this.state.account;

            if (loginWay == '账户登录') {
                if (account.username.length == 0) {
                    this.setState({ error: { flag: true, msg: '用户名为空' } });
                    return;
                }
                if (account.password.length == 0) {
                    this.setState({ error: { flag: true, msg: '密码为空' } });
                    return;
                }
                fetch("https://easy-mock.com/mock/5cb31cc7bd0927702544e6ac/example/upload", {
                    method: 'POST',
                    body: account
                }).then(function (Response) {
                    Response.ok ? location.href = '' : alert('登录失败');
                });
            } else {
                var mobile = this.state.account.user;
                var code = this.account.password;

                if (mobile.length == 0) {
                    this.setState({ error: { flag: true, msg: '手机号为空' } });
                    return;
                }
                if (code.length == 0) {
                    this.setState({ error: { flag: true, msg: '验证码为空' } });
                    return;
                }

                fetch("https://easy-mock.com/mock/5cb31cc7bd0927702544e6ac/example/upload", {
                    method: 'POST',
                    body: mobile
                }).then(function (Response) {
                    Response.ok ? location.href = '' : _this2.setState({ error: { flag: true, msg: '' } });
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'login-box' },
                React.createElement(Header, { headerInfo: this.props.headerInfo }),
                React.createElement(
                    'div',
                    { className: 'panel' },
                    React.createElement(
                        'form',
                        { action: 'javascript:void(0)' },
                        this.props.loginWay,
                        React.createElement(Msg, { error: this.state.error }),
                        React.createElement(
                            'button',
                            { className: 'submit', onClick: this.submit },
                            '\u767B\u5F55'
                        ),
                        React.createElement(ThirdLogin, { way: 'register', loginWay: this.props.headerInfo.title })
                    )
                )
            );
        }
    }]);

    return LoginForm;
}(React.Component);

// 注册面板


var RegisterForm = function (_React$Component2) {
    _inherits(RegisterForm, _React$Component2);

    function RegisterForm() {
        _classCallCheck(this, RegisterForm);

        var _this3 = _possibleConstructorReturn(this, (RegisterForm.__proto__ || Object.getPrototypeOf(RegisterForm)).call(this));

        _this3.state = {
            error: {
                flag: false,
                msg: ''
            },
            account: {
                mobile: '',
                password: '',
                code: ''
            }
        };

        _this3.submit = _this3.submit.bind(_this3);
        return _this3;
    }

    _createClass(RegisterForm, [{
        key: 'handleMsg',
        value: function handleMsg(error) {
            this.setState({
                error: error
            });
        }
    }, {
        key: 'submit',
        value: function submit() {
            var _this4 = this;

            var error = this.state.error;
            if (!error.flag) {
                fetch('/user/register/' + this.state.account.code, {
                    method: 'POST',
                    body: this.state.account
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    if (!data.flag) {
                        _this4.setState({ error: { flag: true, msg: data.message } });
                    } else {
                        window.location.href = '';
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var headerInfo = {
                title: '手机注册',
                display: 'none'
            };
            return React.createElement(
                'div',
                { className: 'register-box' },
                React.createElement(Header, { headerInfo: headerInfo }),
                React.createElement(
                    'div',
                    { className: 'panel' },
                    React.createElement(
                        'form',
                        { action: 'javascript:void(0)' },
                        React.createElement(SmsLogin, { render: React.createElement(Password, { handleMsg: this.handleMsg.bind(this) }) }),
                        React.createElement(Msg, { error: this.state.error }),
                        React.createElement(
                            'button',
                            { className: 'submit', onClick: this.submit, disabled: this.state.error.flag },
                            '\u6CE8\u518C'
                        ),
                        React.createElement(ThirdLogin, { way: 'login' })
                    )
                )
            );
        }
    }]);

    return RegisterForm;
}(React.Component);

// 头部组件


function Header(props) {
    var headerInfo = props.headerInfo;

    function changeLoginWay() {
        headerInfo.otherLogin == '账户登录' ? ReactDOM.render(React.createElement(LoginForm, accountLogin), document.getElementById("form")) : ReactDOM.render(React.createElement(LoginForm, smsLogin), document.getElementById("form"));
    }

    return React.createElement(
        'div',
        { className: 'header' },
        React.createElement(
            'span',
            { className: 'title' },
            headerInfo.title
        ),
        React.createElement(
            'a',
            { href: 'javascript:void(0)', style: { display: headerInfo.display }, onClick: changeLoginWay },
            headerInfo.otherLogin,
            React.createElement('i', { className: 'fa fa-angle-right', 'aria-hidden': 'true' })
        )
    );
}

// 短信登录组件

var SmsLogin = function (_React$Component3) {
    _inherits(SmsLogin, _React$Component3);

    function SmsLogin() {
        _classCallCheck(this, SmsLogin);

        var _this5 = _possibleConstructorReturn(this, (SmsLogin.__proto__ || Object.getPrototypeOf(SmsLogin)).call(this));

        _this5.initState = {
            disabled: true,
            msg: '获取验证码',
            time: 59
        };

        _this5.state = Object.assign({
            mobile: '',
            code: ''
        }, _this5.initState);

        _this5.handleMobileChange = _this5.handleMobileChange.bind(_this5);
        _this5.handleCodeChange = _this5.handleCodeChange.bind(_this5);
        _this5.sendSms = _this5.sendSms.bind(_this5);
        return _this5;
    }

    _createClass(SmsLogin, [{
        key: 'handleMobileChange',
        value: function handleMobileChange(e) {
            var mobile = e.target.value;
            this.setState({
                mobile: mobile
            });

            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (reg.test(mobile)) {
                this.setState({
                    code: '手机号正确',
                    disabled: false
                });
            } else {
                this.setState({
                    code: '',
                    disabled: true
                });
            }
        }
    }, {
        key: 'handleCodeChange',
        value: function handleCodeChange(e) {
            var code = e.target.value;
            this.setState({ code: code });
            this.props.handleAccount({
                username: this.state.mobile,
                password: this.state.code
            });
        }
    }, {
        key: 'sendSms',
        value: function sendSms() {
            var _this6 = this;

            fetch('https://easy-mock.com/mock/5ce2de5fd558b7779c32e533/ziwang/user/semdSms/{mobile}', { method: 'POST' }).then(function (response) {
                if (response.ok) {
                    var timer = setInterval(function () {
                        _this6.setState({
                            time: _this6.state.time - 1,
                            msg: _this6.state.time + ' s 后重新获取',
                            disabled: true
                        });

                        if (_this6.state.time < 0) {
                            clearInterval(timer);
                            _this6.setState(Object.assign(_this6.initState, { disabled: false, msg: '重新获取' }));
                        }
                    }, 1000);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'sms' },
                React.createElement(
                    'div',
                    { className: 'mobile' },
                    React.createElement(
                        'label',
                        { htmlFor: 'mobile' },
                        '+86'
                    ),
                    React.createElement('input', { type: 'text', id: 'mobile', name: 'mobile', placeholder: '\u624B\u673A\u53F7\u7801', onChange: this.handleMobileChange })
                ),
                this.props.render,
                React.createElement(
                    'div',
                    { className: 'code' },
                    React.createElement('input', { type: 'text', id: 'code', name: 'code', placeholder: '\u9A8C\u8BC1\u7801', onChange: this.handleCodeChange }),
                    React.createElement(
                        'button',
                        { className: this.state.disabled ? "disabled" : "", disabled: this.state.disabled, onClick: this.sendSms },
                        this.state.msg
                    )
                )
            );
        }
    }]);

    return SmsLogin;
}(React.Component);

//账号登录组件


var AccountLogin = function (_React$Component4) {
    _inherits(AccountLogin, _React$Component4);

    function AccountLogin() {
        _classCallCheck(this, AccountLogin);

        return _possibleConstructorReturn(this, (AccountLogin.__proto__ || Object.getPrototypeOf(AccountLogin)).call(this));
    }

    _createClass(AccountLogin, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'account' },
                React.createElement(
                    'div',
                    { className: 'mobile' },
                    React.createElement(
                        'label',
                        { htmlFor: 'account' },
                        React.createElement('i', { className: 'fa fa-user-o', 'aria-hidden': 'true' })
                    ),
                    React.createElement('input', { type: 'text', id: 'account', placeholder: '\u624B\u673A/\u90AE\u7BB1/\u8D44\u7F51\u8D26\u53F7' })
                ),
                React.createElement(
                    'div',
                    { className: 'password' },
                    React.createElement(
                        'label',
                        { htmlFor: 'password' },
                        React.createElement('i', { className: 'fa fa-lock', 'aria-hidden': 'true' })
                    ),
                    React.createElement('input', { type: 'password', id: 'password', placeholder: '\u767B\u5F55\u5BC6\u7801' })
                ),
                React.createElement(
                    'a',
                    { href: '#' },
                    '\u5FD8\u8BB0\u5BC6\u7801'
                )
            );
        }
    }]);

    return AccountLogin;
}(React.Component);

// 密码框组件


var Password = function (_React$Component5) {
    _inherits(Password, _React$Component5);

    function Password() {
        _classCallCheck(this, Password);

        var _this8 = _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).call(this));

        _this8.state = {
            password: '',
            repassword: ''
        };

        _this8.handleInputChange = _this8.handleInputChange.bind(_this8);
        _this8.handlePasswordBlur = _this8.handlePasswordBlur.bind(_this8);
        _this8.handleRepasswordBlur = _this8.handleRepasswordBlur.bind(_this8);
        return _this8;
    }

    _createClass(Password, [{
        key: 'handleInputChange',
        value: function handleInputChange(e) {
            var name = e.target.name;
            var value = e.target.value;

            this.setState(_defineProperty({}, name, value));
        }
    }, {
        key: 'handlePasswordBlur',
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
        key: 'handleRepasswordBlur',
        value: function handleRepasswordBlur(e) {
            var repassword = e.target.value;
            var password = this.state.password;

            repassword !== password ? this.props.handleMsg({ flag: true, msg: "两次密码不一致" }) : this.props.handleMsg({ flag: false, msg: "" });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'password' },
                    React.createElement(
                        'label',
                        { htmlFor: 'password' },
                        React.createElement('i', { className: 'fa fa-lock', 'aria-hidden': 'true' })
                    ),
                    React.createElement('input', {
                        type: 'password',
                        id: 'password',
                        name: 'password',
                        placeholder: '\u5BC6\u7801(6-16\u4F4D\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u7B26\u53F7)',
                        onChange: this.handleInputChange,
                        onBlur: this.handlePasswordBlur })
                ),
                React.createElement(
                    'div',
                    { className: 'password' },
                    React.createElement(
                        'label',
                        { htmlFor: 'repassword' },
                        React.createElement('i', { className: 'fa fa-lock', 'aria-hidden': 'true' })
                    ),
                    React.createElement('input', {
                        type: 'password',
                        id: 'repassword',
                        name: 'repassword',
                        placeholder: '\u786E\u8BA4\u5BC6\u7801',
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
            'div',
            { className: 'msg' },
            React.createElement('i', { className: 'fa fa-exclamation-circle', 'aria-hidden': 'true' }),
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
        'div',
        { className: 'third-login' },
        React.createElement(
            'div',
            { className: 'other', style: { display: way.display } },
            React.createElement(
                'span',
                null,
                '\u5176\u4ED6\u65B9\u5F0F\uFF1A'
            ),
            React.createElement('img', { src: 'img/third-login.png', alt: '' })
        ),
        React.createElement(
            'a',
            { href: 'javascript:void(0)', onClick: function onClick() {
                    ReactDOM.render(way.render, document.getElementById("form"));
                } },
            way.way
        )
    );
}

var smsLogin = {
    loginWay: React.createElement(SmsLogin, { handleAccount: this.handleAccount }),
    headerInfo: { title: '手机快捷登录', otherLogin: '账户登录' }
};

var accountLogin = {
    loginWay: React.createElement(AccountLogin, { handleAccount: this.handleAccount }),
    headerInfo: { title: '账户登录', otherLogin: '手机快捷登录' }

    // 初始化渲染登录面板
};ReactDOM.render(React.createElement(LoginForm, smsLogin), document.getElementById("form"));