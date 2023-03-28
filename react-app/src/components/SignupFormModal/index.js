import React, { useState } from "react";
import "./SignupForm.css";
import SignupPageOne from "./SignupPageOne";
import SignupPageTwo from "./SignupPageTwo";
import { useDispatch } from "react-redux";
import { saveStepOneData, saveStepTwoData } from "../../store/session";

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

	const goToNextStep = () => {
		setStep(step + 1);
	};
	const goToPreviousStep = () => {
		setStep(step - 1);
	};

	const handleSaveStepOne = () => {

		const errors = [];

		if (password !== confirmPassword) {
			errors.push("Confirm Password field must be the same as the Password field");
		}
		if (password.length < 6) {
			errors.push("Password must be at least 6 characters long");
		}

		if (errors.length === 0) {
			setErrors([]);
			dispatch(saveStepOneData(username, email, password, firstName, lastName, dateOfBirth));
			goToNextStep();
		} else {
			setErrors(errors);
		}
	};

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
					handleSaveStepOne={handleSaveStepOne}
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
				/>
			)}
		</>
	);
}

export default SignupFormModal;
