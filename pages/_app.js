import "../styles/globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../components/Auth/firebaseAuth";
import { doc, setDoc } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    } else if (user) {
      console.log(user);
      const userRef = doc(db, "users", user.uid);
      setDoc(
        userRef,
        {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        },
        { merge: true }
      ).then(() => {
        router.push("/");
      });
    }
  }, [user]);

  return (
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />
    </StyledEngineProvider>
  );
}

export default MyApp;
