import { Typography } from "@mui/material";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, UserProps } from "../../context/UserContext";
import { google, auth } from "../../Firebase";
import { PrivateRoutes } from "../../models/routes";
import "./SignIn.css";

type PropsExistAccount = {
  exist: boolean
}

export const SignIn:React.FC<PropsExistAccount> = ({exist}) => {
  const [existAccount, setExistAccount] = useState(exist);

  const auth = getAuth();

  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      const user = auth.currentUser;
      console.log(user?.email);
    })
    .catch((error: Error) => {
      // Handle Errors here.
      console.log(error)
    });

  return (
    <div className="Container">
      {
        existAccount ? <div style={{width: "100%"}}>
          <Typography variant="h5">
            <i className="bi bi-person"></i>
            &nbsp; Sign In With Your User Acccount
          </Typography>
          <br />
          <SignInWithGoogleProvider />
          <br />
          <hr />
          <SignInWithEmailAndPassword />
          <br />
          <button style={{width: "100%", marginTop: "40px"}} className="btn btn-primary" onClick={() => setExistAccount(false)}>I need your Account?</button>
        </div> : <div style={{width: "100%"}}>
          <Typography variant="h5">
            <i className="bi bi-person-add"></i>
            &nbsp; Create User With Email And Password
          </Typography>
          <br />
          <CreateUserWithEmailAndPassword>
            {<button className="btn btn-light" onClick={() => setExistAccount(true)}>I have an account!</button>}
          </CreateUserWithEmailAndPassword>

        </div>
      }
    </div>
  )
}

type PropsChild = {
  children: JSX.Element;
}

export const CreateUserWithEmailAndPassword: React.FC<PropsChild> = ({ children }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordrepeat, setPasswordRepeat] = useState<string>("");
  const [acceptterms, setAcceptTerms] = useState<boolean>(false);

  const [errors, setErrors] = useState("");
  const [errorsshow, setErrorsShow] = useState(false);

  const createuserWithemailpassword = (email: string, password: string, repeatpassword: string, acceptterms: boolean) => {
    if (password === repeatpassword && acceptterms && password.length > 8) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          console.log("user created: successfully >", user.displayName);
          setErrors("");
          setErrorsShow(false);
        })
        .catch((error: Error) => {
          if (error.message === "Firebase: Error (auth/email-already-in-use).") {
            setErrors("Email Already in use");
            setErrorsShow(true);
          }
        });
    }
    else {
      setErrorsShow(true);
      if (password !== repeatpassword)
        setErrors("Password Diferent")
      if (password.length < 8)
        setErrors("The password cannot have less than 8 digits.")
      if (acceptterms !== true)
        setErrors("Accept Terms");
    }
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        Email: <input className="form-control" form-control type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" pattern=".+@gmail\.com"
          title="Match in example@gmail.com format." />
        <br />
        Password: <input className="form-control" type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        Repeat Password: <input className="form-control" type="password" name="password" onChange={(e) => setPasswordRepeat(e.target.value)} />
        <br />
        Accept Terms and Conditions: <input className="form-check-label" type="checkbox" name="accept" onChange={(e) => setAcceptTerms(!acceptterms)} />
        <br />
        {errorsshow ? <ErrorsStrings content={errors} show={errorsshow} /> : <div></div>}
        <br />
        <div style={{ position: "relative", width: "100%" }}>
          {
            children
          }
          <button style={{ position: "absolute", right: "0px" }} className="btn btn-primary" onClick={() => createuserWithemailpassword(email, password, passwordrepeat, acceptterms)}>
            <i className="bi bi-person-plus"></i>
            &nbsp; Create User
          </button>
        </div>
      </form>
    </div>
  )
}

export const SignInWithEmailAndPassword = () => {
  const { setUser } = useContext<UserProps>(UserContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
        
  const [errors, setErros] = useState("");
  const [errorsshow, setErrosShow] = useState(false);

  const signinwithemailpassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUser(true);
        navigate("/dashboard");
        // ...
        console.log("session started by: ", user.displayName);
        setErros("");
        setErrosShow(false);
      })
      .catch((error: Error) => {
        switch (error.message) {
          case "Firebase: Error (auth/wrong-password).":
            setErros("Wrong Password");
            setErrosShow(true);
            break;
          case "Firebase: Error (auth/user-not-found).":
            setErros("User Not Found");
            setErrosShow(true);
            break;
          default:
            setErros(error.message);
            setErrosShow(true);
        }
      });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      Email: <input className="form-control" type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" pattern=".+@gmail\.com"
        title="Match in example@gmail.com format." />
      <br />
      Password: <input className="form-control" type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      {errorsshow ? <ErrorsStrings content={errors} show={errorsshow} /> : <div></div>}
      <div style={{ position: "relative", width: "100%" }}>
        <button style={{position: "absolute", left: 0}} className="btn btn-light" onClick={() => ResetPasswordWithEmail(email)}>Forget your Password?</button>
          <button style={{ position: "absolute", top: "0px", right: "0px" }} className="btn btn-primary" onClick={() => signinwithemailpassword(email, password)}>
            <i className="bi bi-box-arrow-in-right"></i>
            &nbsp; Sign In
          </button>
      </div>

    </form>
  )
}

export const SignInWithGoogleProvider = () => {
  const signinwithgoogleprovider = () => {
    const auth = getAuth();
    signInWithPopup(auth, google)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential?.signInMethod);
        // The signed-in user info.
        const user = result.user;
        console.log(user.displayName);
      }).catch((error) => {
        console.log(error);
      });
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <button className="btn btn-light" style={{ width: "100%"}} onClick={() => signinwithgoogleprovider()}>
      <i className="bi bi-google"></i> 
      &nbsp; Sign In With Google
      </button>
    </form>
  )
}

export const ResetPasswordWithEmail = (email: string) => {
  sendPasswordResetEmail(auth, email).then(() => {
    console.log("Reset Password Comfirm");
  }).catch((error: Error) => {
    if (error.message === "Firebase: Error (auth/user-not-found).") {
      console.log("User Not Found");
    }
  });
}

interface ErrorsMesage {
  content: string,
  show: boolean
}

export const ErrorsStrings: React.FC<ErrorsMesage> = ({ content, show }) => {
  return (
    <label style={{ color: "red" }}>{show ? content : ""}</label>
  )
}

type Props = {
  title: string
};

export const ButtonSignOut = ({ title }: Props) => {
  const SignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Sign Out");
    }).catch((error: Error) => {
      console.log(error);
    });
  }

  return (
    <button className="btn btn-danger" onClick={() => SignOut()}>{title}</button>
  )
}
