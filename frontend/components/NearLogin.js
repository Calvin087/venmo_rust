import { useEffect, useState } from "react";
import { wallet, signIn, signOut } from "../near/near-setup";

const NearLogin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (wallet?.getAccountId()) {
      setUser(wallet.getAccountId());
    } else return;
  }, [wallet]);

  const logout = () => {
    signOut();
    setUser(null);
    location.reload();
  };

  return (
    <>
      {user ? (
        <button onClick={() => logout()}>LOGOUT</button>
      ) : (
        <button onClick={() => signIn()}>LOGIN</button>
      )}
    </>
  );
};

export default NearLogin;
