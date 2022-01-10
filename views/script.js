const checkPassword = () => {
    var input = document.getElementById("password").value;
    var input_retype = document.getElementById("retype").value;
    var message = document.getElementById("message");
    var regex =
        /^(?!.*[\s])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@_#$%^&*]).{8,20}$/;
    var check = false;

    if (regex.test(input)) {
        check = true;
        console.log("hiiiiiiii");
        message.innerHTML = ``;
        document.getElementById("submit").disabled = false;
        if (input !== input_retype) {
            document.getElementById(
                "message-retype"
            ).innerHTML = `<p>Passwords must be the same</p>`;
            document.getElementById("submit").disabled = true;
        } else {
            document.getElementById("message-retype").innerHTML = ``;
            document.getElementById("submit").disabled = false;
        }
    } else {
        message.innerHTML = `<p>Password must have at least 8 characters, 1 Uppercase, 1 lowercase, a number and a special symbol.</p>`;
        document.getElementById("submit").disabled = true;
    }
};
