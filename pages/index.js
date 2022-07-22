import { Avatar, Button, CircularProgress, Divider } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/Auth/firebaseAuth";
import { signOut } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  const signOutFromApp = () => {
    signOut(auth);
    router.push("/login");
  };

  const UserInformation = () => {
    if (user === null) {
      return null;
    }
    if (user) {
      return (
        <motion.div
          animate={{
            y: [100, -10, 0],
            opacity: [0.5, 1],
          }}
          className="flex flex-col p-4 m-4 max-w-sm md:max-w-lg text-xl md:text-2xl rounded-xl ring gap-y-2">
          <motion.div
            animate={{ scale: [0, 1.2, 1] }}
            className="flex items-center mx-auto">
            <Avatar className="w-32 h-32" src={user?.photoURL} />
          </motion.div>
          <Divider />
          <div>
            <strong>Name:</strong> {user.displayName}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>UID:</strong> {user.uid}
          </div>
        </motion.div>
      );
    }
  };
  if (loading)
    return (
      <div className="flex items-center justify-center w-screen min-h-screen">
        <CircularProgress className="text-6xl" />
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen">
      <Button
        className="mb-4"
        variant="outlined"
        endIcon={<LogoutIcon />}
        onClick={signOutFromApp}>
        Sign Out <strong className="ml-1">{user?.displayName}</strong>
      </Button>
      <UserInformation />
    </div>
  );
}
