const SignUp = () => {
    const registerUser = () => {
        console.log("register");
    };

    return (
        <div>
            <h1>ユーザ登録</h1>
            <div className="register">
                <input placeholder="メールアドレス" />
                <input placeholder="パスワード" />
                <button onClick={registerUser}>新規登録</button>
            </div>
        </div>
    );
};

export default SignUp