import { Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import "./Login.scss";
import AllImages from "../../constant/images";
import { LoginInterface } from "../../interfaces/Login.interface";
import { useForm } from "react-hook-form";
import LoginSchema from "../../schema/LoginSchema";
import { login } from "../../services/Auth.service";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { isValid, errors },
    } = useForm<LoginInterface>({ mode: "all" });
    const { email, password, type, } = LoginSchema;
    const navigate = useNavigate();

    const onSubmit = (values: LoginInterface) => {
        const reqObj = {
            email: values?.email,
            password: values?.password
        }
        login({ data: reqObj }).then((res) => {
            if(res?.data) {
                navigate("/");
                toast.success("Logged in successfully!!!", {autoClose : 4000});
            }
        }).catch((err) => {
            toast.error(err, {autoClose : 4000});
            console.error(err);
        })
    }
    return (
        <div className="fluid-container">
            <Box maxWidth="568px" margin="auto" boxShadow="0px 0px 35px 0px rgba(0, 0, 0, 0.07)">
                <Paper elevation={3} sx={{ padding: '40px 70px', borderRadius : '20px' }}>
                    <Avatar
                        src={AllImages.user}
                        sx={{ height: '54px', width: '54px', margin: 'auto' }}
                    />
                    <Typography className="form-header">
                        Login to Existing User
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormControl sx={{ margin: '30px 0' }} fullWidth>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="user"
                                sx={{ justifyContent: 'center' }}
                            >
                                <FormControlLabel
                                    value="user"
                                    className="radio-label"
                                    control={<Radio className="custom-radio-button" {...register("type", { ...type })} />}
                                    label="User"
                                />
                                <FormControlLabel
                                    value="flight"
                                    className="radio-label"
                                    control={<Radio {...register("type", { ...type })}
                                        className="custom-radio-button" />} label="Flight"
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth>
                            <label className="form-label">Email *</label>
                            <TextField
                                hiddenLabel
                                fullWidth
                                placeholder="email"
                                className="input-fields"
                                {...register("email", { ...email })}
                                error={Boolean(errors && errors?.email)}
                                helperText={errors && errors?.email?.message}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <label className="form-label">Password *</label>
                            <TextField
                                hiddenLabel
                                fullWidth
                                placeholder="******"
                                type="password"
                                className="input-fields"
                                {...register("password", { ...password })}
                                error={Boolean(errors && errors?.password)}
                                helperText={errors && errors?.password?.message}
                            />
                        </FormControl>
                        <div className="remember-link-container">
                            <FormControlLabel
                                // {...register("isAcceptPolicy", { ...isAcceptPolicy })}
                                className="custom-check-box"
                                control={<Checkbox />}
                                label={"Remember Login Info "}
                            />
                            <Link to="">
                                Forgot Password?
                            </Link>
                        </div>
                        <Typography component="div" textAlign={"center"}>
                            <Button
                                type="submit"
                                variant="contained"
                                className="form-submit-button"
                                disabled={!isValid}
                            >
                                Login
                            </Button>
                        </Typography>
                        <p className="register-link-container">
                            don’t have an account?
                            <Link to="/register">
                                create account
                            </Link>
                        </p>
                    </Box>
                </Paper>
            </Box>
        </div>
    )
};

export default Login;