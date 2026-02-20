function Login() {
    function loginCheck() {
        fetch(`http://localhost:5154/api/Auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify()
        })
            .then
    }
}