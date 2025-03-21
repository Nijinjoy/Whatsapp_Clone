const validateRegistration = (fullName, email, password, confirmPassword) => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
        Alert.alert('Error', 'All fields are required');
        return false;
    }
    if (!validateEmail(email.trim())) {
        Alert.alert('Error', 'Invalid email format');
        return false;
    }
    if (password.length < 8) {
        Alert.alert('Error', 'Password must be at least 8 characters long');
        return false;
    }
    if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return false;
    }
    return true;
};
