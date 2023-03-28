import React, { useState } from "react";
import "./SignupForm.css";
import SignupPageOne from "./SignupPageOne";
import SignupPageTwo from "./SignupPageTwo";
import { useDispatch } from "react-redux";
import { saveStepOneData, saveStepTwoData, checkExistingUsernameEmail } from "../../store/session";

function SignupFormModal() {
	const dispatch = useDispatch()
	const [step, setStep] = useState(1);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [profilePicture, setProfilePicture] = useState("");
	const [location, setLocation] = useState("");
	const [gender, setGender] = useState("");
	const [bio, setBio] = useState("");
	const [errors, setErrors] = useState([]);

	const isValidEmail = (email) => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	const goToNextStep = () => {
		setStep(step + 1);
	};
	const goToPreviousStep = () => {
		setStep(step - 1);
	};



	const validateForm = () => {
		const errors = []
		// const requiredFields = [
		// 	firstName,
		// 	lastName,
		// 	dateOfBirth,
		// 	email,
		// 	username,
		// 	password,
		// 	confirmPassword,
		// 	location,
		// 	gender,
		// 	bio,
		// ]
		// requiredFields.forEach((field) => {
		// 	if (field === "") {
		// 		errors.push(`Field ${field} is required.`)
		// 	}
		// })

		if (!isValidEmail(email)) {
			errors.push('Invalid email.');
		}

		const currentDate = new Date();
		const dob = new Date(dateOfBirth);
		let age = currentDate.getFullYear() - dob.getFullYear();
		const month = currentDate.getMonth() - dob.getMonth();

		if (month < 0 || (month === 0 && currentDate.getDate() < dob.getDate())) {
			age--;
		}

		if (age < 18) {
			errors.push("You must be at least 18 or older to register")
		}

		if (password !== confirmPassword) {
			errors.push("Confirm Password field must be the same as the Password field");
		}
		if (password.length < 6) {
			errors.push("Password must be at least 6 characters long");
		}

		return errors
	};


	const handleCheckUsernameEmail = async () => {
		const { usernameExists, emailExists } = await dispatch(checkExistingUsernameEmail(username, email));

		const errors = validateForm()

		if (usernameExists) {
			errors.push('Username already exists')
		}
		if (emailExists) {
			errors.push("Email already exists");
		}
		if (errors.length === 0) {
			setErrors([]);
			dispatch(saveStepOneData(username, email, password, firstName, lastName, dateOfBirth));
			goToNextStep();
		} else {
			setErrors(errors);
		}
	};


	// const handleSaveStepOne = () => {

	// 	const errors = validateForm();


	// 	if (errors.length === 0) {
	// 		setErrors([]);
	// 		dispatch(saveStepOneData(username, email, password, firstName, lastName, dateOfBirth));
	// 		goToNextStep();
	// 	} else {
	// 		setErrors(errors);
	// 	}
	// };

	const handleSaveStepTwo = () => {
		dispatch(saveStepTwoData(location, gender, bio, profilePicture));
	};


	return (
		<>
			{step === 1 && (
				<SignupPageOne
					email={email}
					setEmail={setEmail}
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
					confirmPassword={confirmPassword}
					setConfirmPassword={setConfirmPassword}
					firstName={firstName}
					setFirstName={setFirstName}
					lastName={lastName}
					setLastName={setLastName}
					dateOfBirth={dateOfBirth}
					setDateOfBirth={setDateOfBirth}
					goToNextStep={goToNextStep}
					handleSaveStepOne={handleCheckUsernameEmail}
					errors={errors}
					setErrors={setErrors}
				/>
			)}
			{step === 2 && (
				<SignupPageTwo
					email={email}
					username={username}
					password={password}
					firstName={firstName}
					lastName={lastName}
					dateOfBirth={dateOfBirth}
					profilePicture={profilePicture}
					setProfilePicture={setProfilePicture}
					location={location}
					setLocation={setLocation}
					gender={gender}
					setGender={setGender}
					bio={bio}
					setBio={setBio}
					goToNextStep={goToNextStep}
					goToPreviousStep={goToPreviousStep}
					handleSaveStepTwo={handleSaveStepTwo}
					validateForm={validateForm}
				/>
			)}
		</>
	);
}

export default SignupFormModal;
