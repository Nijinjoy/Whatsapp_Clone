// Validation for email
export const validateEmail = (email, setEmailError) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address');
        return false;
    } else {
        setEmailError('');
        return true;
    }
};

// Validation for password
export const validatePassword = (password, setPasswordError) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
        setPasswordError('Password must be at least 6 characters and contain a number, lowercase and uppercase letter');
        return false;
    } else {
        setPasswordError('');
        return true;
    }
};

// Validation for confirm password
export const validateConfirmPassword = (confirmPassword, password, setConfirmPasswordError) => {
    if (confirmPassword !== password) {
        setConfirmPasswordError('Passwords do not match');
        return false;
    } else {
        setConfirmPasswordError('');
        return true;
    }
};

// Validation for general fields (empty checks)
export const validateRequiredField = (value, errorMessage, setError) => {
    if (!value) {
        setError(errorMessage);
        return false;
    }
    setError('');
    return true;
};
