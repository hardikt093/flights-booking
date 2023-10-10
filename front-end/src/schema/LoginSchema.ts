const LoginSchema = {
    email: {
        required: { value: true, message: "Email is required." },
        pattern: {
            value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please enter a valid email",
        },
    },
    password: {
        required: { value: true, message: "Password is required." },
        minLength: {
            value: 8,
            message: "Password contains minimum 8 characters.",
        },
        maxLength: {
            value: 16,
            message: "Password contains maximum 16 characters.",
        },
    },
    type: {
        required: { value: false, message: "Please select type" },
    },
}

export default LoginSchema;