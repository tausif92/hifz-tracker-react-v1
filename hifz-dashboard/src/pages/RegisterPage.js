import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	TextField,
	Typography,
	Paper,
	CircularProgress,
	Alert,
	Link,
	Container,
	IconButton,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function RegisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [touched, setTouched] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [isFormValid, setIsFormValid] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	// 🚀 Redirect to dashboard if already logged in
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/dashboard");
		}
	}, [navigate]);

	const validateForm = () => {
		const errors = {};

		if (!email.trim()) {
			errors.email = "Email is required";
		} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			errors.email = "Invalid email format";
		}

		if (!password) {
			errors.password = "Password is required";
		} else if (password.length < 6) {
			errors.password = "Password must be at least 6 characters";
		}

		if (!confirmPassword) {
			errors.confirmPassword = "Confirm Password is required";
		} else if (confirmPassword !== password) {
			errors.confirmPassword = "Passwords do not match";
		}

		setFormErrors(errors);
		setIsFormValid(Object.keys(errors).length === 0);
	};

	useEffect(() => {
		validateForm();
	}, [email, password, confirmPassword]);

	const handleBlur = (field) => {
		setTouched((prev) => ({ ...prev, [field]: true }));
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		setError("");
		setTouched({ email: true, password: true, confirmPassword: true });

		if (!isFormValid) return;

		setLoading(true);
		try {
			const res = await fetch("http://localhost:4000/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Registration failed");

			navigate("/login");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box sx={{ bgcolor: "#f5f6f8", minHeight: "100vh" }}>
			<Container maxWidth='xl'>
				{/* Header Section */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 6, // Increased margin bottom
						pt: 3,
						position: "relative",
					}}
				>
					{/* Logo on left */}
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<IconButton
							component={RouterLink}
							to='/'
							sx={{ p: 0, mr: 1 }}
						>
							<MenuBookIcon
								sx={{
									fontSize: 40,
									backgroundColor: "white",
									borderRadius: "50%",
									p: 1,
									boxShadow: 2,
									color: "#00b050",
								}}
							/>
						</IconButton>
						<Typography
							variant='h5'
							fontWeight='bold'
							sx={{ color: "#00b050" }}
						>
							Hifz App
						</Typography>
					</Box>

					{/* Centered title */}
					<Typography
						variant='h3'
						fontWeight={700}
						sx={{
							position: "absolute",
							left: "50%",
							transform: "translateX(-50%)",
							fontFamily: "'Poppins', sans-serif",
							letterSpacing: "0.5px",
							lineHeight: 1.2,
							textShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
							color: "#2E7D32",
						}}
					>
						Quran Hifz Tracker
					</Typography>

					{/* Home button on right */}
					<IconButton
						component={RouterLink}
						to='/'
						sx={{
							color: "#00b050",
							"&:hover": {
								backgroundColor: "rgba(0, 176, 80, 0.08)",
							},
						}}
					>
						<HomeIcon fontSize='large' />
					</IconButton>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						mt: 8, // Added margin top to move form down
					}}
				>
					<Paper elevation={3} sx={{ padding: 4, width: 320 }}>
						<Typography variant='h5' textAlign='center' mb={3}>
							Register
						</Typography>

						{error && (
							<Alert severity='error' sx={{ mb: 2 }}>
								{error}
							</Alert>
						)}

						<form onSubmit={handleRegister}>
							<TextField
								fullWidth
								label='Email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onBlur={() => handleBlur("email")}
								error={touched.email && !!formErrors.email}
								helperText={touched.email && formErrors.email}
								margin='normal'
								required
							/>
							<TextField
								fullWidth
								label='Password'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								onBlur={() => handleBlur("password")}
								error={
									touched.password && !!formErrors.password
								}
								helperText={
									touched.password && formErrors.password
								}
								margin='normal'
								required
							/>
							<TextField
								fullWidth
								label='Confirm Password'
								type='password'
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								onBlur={() => handleBlur("confirmPassword")}
								error={
									touched.confirmPassword &&
									!!formErrors.confirmPassword
								}
								helperText={
									touched.confirmPassword &&
									formErrors.confirmPassword
								}
								margin='normal'
								required
							/>

							<Box mt={3}>
								<Button
									type='submit'
									variant='contained'
									fullWidth
									disabled={loading || !isFormValid}
									sx={{
										backgroundColor: "#00b050",
										"&:hover": {
											backgroundColor: "#008a3e",
										},
									}}
								>
									{loading ? (
										<CircularProgress size={24} />
									) : (
										"Register"
									)}
								</Button>
							</Box>
						</form>

						<Typography
							variant='body2'
							textAlign='center'
							mt={3}
							color='text.secondary'
						>
							Already have an account?{" "}
							<Link
								component={RouterLink}
								to='/login'
								underline='hover'
								color='primary'
							>
								Login
							</Link>
						</Typography>
					</Paper>
				</Box>
			</Container>
		</Box>
	);
}

export default RegisterPage;
