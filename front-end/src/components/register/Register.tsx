import { Box, Button, Checkbox, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterInterface } from "../../interfaces/Register.interface";
import RegisterSchema from "../../schema/RegisterSchema";
import { signUp } from "../../services/Auth.service";
import { toast } from "react-toastify";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { isValid, errors },
    } = useForm<RegisterInterface>({ mode: "all" });
    const { name, email, password, confirmPassword, type, isAcceptPolicy } = RegisterSchema;
    const navigate = useNavigate();

    const onSubmit = (values: RegisterInterface) => {
        const reqObj = {
            name: values?.name,
            email: values?.email,
            password: values?.password,
            type: values?.type
        };
        signUp({ data: reqObj }).then((res) => {
            if (res?.success) {
                toast.success("Register Successfully!!!", {autoClose : 4000})
                navigate("/login");
            }
        }).catch((err) => {
            toast.error(err, {autoClose : 4000});
            console.error("Error : ", err);
        })
    }
    return (
        <div className="container">
            <Box maxWidth="568px" margin="auto" boxShadow="0px 0px 35px 0px rgba(0, 0, 0, 0.07)">
                <Paper elevation={3} sx={{ padding: '40px 70px', borderRadius : '20px'}}>
                    <Typography className="form-header">
                        Register for New User
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormControl sx={{ margin: '30px 0 25px 0' }} fullWidth>
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
                            <label className="form-label">Name *</label>
                            <TextField
                                hiddenLabel
                                fullWidth
                                placeholder="name"
                                className="input-fields"
                                {...register("name", { ...name })}
                                error={Boolean(errors && errors?.name)}
                                helperText={errors && errors?.name?.message}
                            />
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
                        <FormControl fullWidth>
                            <label className="form-label">Confirm Password *</label>
                            <TextField
                                hiddenLabel
                                fullWidth
                                placeholder="******"
                                type="password"
                                className="input-fields confirm-password"
                                {...register("confirmPassword", { ...confirmPassword })}
                                error={Boolean(errors && errors?.confirmPassword)}
                                helperText={errors && errors?.confirmPassword?.message}
                            />
                        </FormControl>
                        <FormControlLabel
                            {...register("isAcceptPolicy", { ...isAcceptPolicy })}
                            className="custom-check-box"
                            control={<Checkbox />}
                            label={"i agree to the terms of service and privacy policy"}
                        />
                        <Typography component="div" textAlign={"center"}>
                            <Button
                                type="submit"
                                variant="contained"
                                className="form-submit-button"
                                disabled={!isValid}
                            >
                                Register
                            </Button>
                        </Typography>
                        <p className="login-link">
                            already have an account?
                            <Link to="/login">
                                Login
                            </Link>
                        </p>
                    </Box>
                </Paper>
            </Box>
        </div>
    )
};

export default Register;