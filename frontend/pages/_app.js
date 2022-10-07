import { useEffect, useState } from "react";
import { initNear } from "../near/near-setup";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initNear();
    setIsLoading(false);
  }, []);

  return isLoading ? <>Loading</> : <Component {...pageProps} />;
}

export default MyApp;
