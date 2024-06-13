import { createContext, useState, useEffect } from "react";
import { usePouch } from "use-pouchdb";
import { useRouter } from "next/router";

const UserDataContext = createContext({});

const UserDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [sentData, setSentData] = useState(false);

  const db = usePouch();

  const router = useRouter();

  useEffect(() => {
    db?.get("misDatos")
      .then((result) => {
        if (result !== undefined) {
          setUserData(result);
          setIsLoading(false);
        } else {
          setUserData({});
          setIsLoading(false);
          if (
            router.asPath !== "/" &&
            router.asPath !== "/misdatos" &&
            router.asPath !== "/installDb"
          ) {
            router.push("/");
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        if (
          router.asPath !== "/" &&
          router.asPath !== "/misdatos" &&
          router.asPath !== "/installDb"
        ) {
          router.push("/");
        }
      });
  }, [db, sentData]);

  return (
    <UserDataContext.Provider
      value={{ isLoading, userData, setUserData, sentData, setSentData }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataProvider };
export default UserDataContext;
