import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signUpWithGoogleRedirect,
  auth
} from '../../utils/firebase/firebase.utils';
import { async } from '@firebase/util';
import SignUp from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocref = await createUserDocumentFromAuth(user);
  };



  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUp />
    </div>
  );
};

export default SignIn;
