import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
// import Typography from '@material-ui/core/Typography';
import Formsy from 'formsy-react';

// import ApiClient from '../../services/api';
const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function LoginPage() {
	const classes = useStyles();

	const dispatch = useDispatch();
	const login = useSelector(({ auth }) => auth.login);

	const [authError, setAuthError] = React.useState(false);
	const [authErrorMsg, setAuthErrorMsg] = React.useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const formRef = useRef(null);

	useEffect(() => {
		setAuthError(false);
		setAuthErrorMsg('');
		if (!login.success) {
			if (login.error.message) {
				setAuthError(true);
				setAuthErrorMsg(login.error.message);
			}
		}

		// console.log(login.error);
		if (login.error && (login.error.email || login.error.password)) {
			formRef.current.updateInputsWithError({
				...login.error
			});
			//console.log("IDK")
			disableButton();
		}
	}, [login.error, login.success]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}
	function handleSubmit(email, password) {
		// console.log(`email : ${email}`);
		// console.log(`password : ${password}`);
		setAuthError(false);
		disableButton();
		dispatch(submitLogin({ email, password }));
		disableButton();
	}
	// 	const classes = useStyles();

	// 	const { form, handleChange, resetForm } = useForm({
	// 		email: '',
	// 		password: '',
	// 		device: ''
	// 		/* remember: true */
	// 	});

	// 	function isFormValid() {
	// 		return form.email.length > 0 && form.password.length > 0;
	// 	}

	// 	function handleSubmit(ev) {
	// 		ev.preventDefault();

	// 		resetForm();
	// 	}

	// const useStyles = makeStyles(theme => ({
	// 	root: {
	// 		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
	// 		color: theme.palette.primary.contrastText
	// 	}
	// }));

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					<Card
						className={clsx(
							classes.leftSection,
							'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
						)}
						square
					>
						<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
							<FuseAnimate delay={300}>
								<div className="flex items-center mb-48">
									<img className="logo-icon w-48" src="assets/images/logos/cl.png" alt="logo" />
									<div className="border-l-1 mr-4 w-1 h-40" />
									<div>
										<Typography className="text-24 font-800 logo-text" color="inherit">
											MIS
										</Typography>
										<Typography
											className="text-16 tracking-widest -mt-8 font-700"
											color="textSecondary"
										>
											CodersLab
										</Typography>
									</div>
								</div>
							</FuseAnimate>

							<Formsy
								onValidSubmit={({ email, password }) => handleSubmit(email, password)}
								onValid={enableButton}
								onInvalid={disableButton}
								ref={formRef}
								className="flex flex-col justify-center w-full"
							>
								<TextFieldFormsy
									className="mb-16"
									type="email"
									name="email"
									label="Email"
									//value=
									validations={{
										isEmail: true
									}}
									validationErrors={{
										isEmail: 'This is not a valid email'
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Icon className="text-20" color="action">
													email
												</Icon>
											</InputAdornment>
										)
									}}
									variant="outlined"
									required
								/>

								<TextFieldFormsy
									className="mb-16"
									type="password"
									name="password"
									label="Password"
									//value="admin"
									validations={{
										minLength: 6
									}}
									validationErrors={{
										minLength: 'Min character length is 6'
									}}
									InputProps={{
										className: 'pr-2',
										type: showPassword ? 'text' : 'password',
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={() => setShowPassword(!showPassword)}>
													<Icon className="text-20" color="action">
														{showPassword ? 'visibility' : 'visibility_off'}
													</Icon>
												</IconButton>
											</InputAdornment>
										)
									}}
									variant="outlined"
									required
								/>

								<Button
									type="submit"
									variant="contained"
									color="primary"
									className="w-full mx-auto mt-16 normal-case"
									aria-label="LOG IN"
									disabled={!isFormValid}
									value="legacy"
								>
									Login
								</Button>
							</Formsy>
						</CardContent>
					</Card>

					<div
						className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}
					>
						<div className="max-w-320">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography variant="h3" color="inherit" className="font-800 leading-tight">
									Management Information System
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography variant="subtitle1" color="inherit" className="mt-32">
									A professional touch to your system
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default LoginPage;
