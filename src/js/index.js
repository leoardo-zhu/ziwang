

function UserModule() {
    var user = {
        token: Cookies.get('TokenKey'),
        name: Cookies.get('NameKey'),
        avatar: Cookies.get('AvatarKey')
    };

    if (user.token === undefined) {
        return React.createElement(
            'div',
            { className: 'user' },
            React.createElement(
                'h2',
                null,
                '\u6B22\u8FCE\u6765\u5230\u8D44\u7F51'
            ),
            React.createElement(
                'a',
                { href: 'login.html', className: 'upload' },
                '\u7ACB\u5373\u767B\u5F55'
            )
        );
    } else {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'user' },
                React.createElement(
                    'div',
                    { className: 'photo' },
                    React.createElement('img', { src: 'img/user-photo.png', alt: '\u7528\u6237\u5934\u50CF' })
                ),
                React.createElement(
                    'div',
                    { className: 'detail' },
                    React.createElement(
                        'p',
                        null,
                        'Leonardo_Zhu'
                    ),
                    React.createElement(
                        'div',
                        { className: 'level' },
                        '\u7B49\u7EA7 ',
                        React.createElement(
                            'em',
                            null,
                            '1'
                        )
                    )
                )
            ),
            React.createElement(
                'a',
                { href: 'upload.html', className: 'upload' },
                '\u4E0A\u4F20\u8D44\u6E90'
            )
        );
    }
}

function Resources(props) {
    var data = [];

    fetch('' + props).then(function (response) {
        return response.json();
    }).then(function (response) {
        data = response;
    });

    var list = data.return();
}

ReactDOM.render(React.createElement(UserModule, null), document.getElementsByClassName("user-module")[0]);