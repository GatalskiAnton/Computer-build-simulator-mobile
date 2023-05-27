import { firebase } from '../config'

async function resetPassword(email, navigation) {
    await firebase.auth().sendPasswordResetEmail(email)
        .then(function (user) {
            alert('Please check your email');
            navigation.navigate("LogInScreen");
        });
}

export { resetPassword }