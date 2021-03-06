import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  auth
} from '../../utils/firebase/firebase.utils';

import { async } from '@firebase/util';
import SignUp from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss'

const Authentication = () => {

  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUp />
    </div>
  );
};

export default Authentication;
