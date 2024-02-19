import { createContext, useContext, useEffect } from "react";
import { useApi } from "./DevPortApiProvider";
import { useGithubApi } from "./GithubApiProvider";

const UserContext = createContext();
const localApi = useApi();
const githubApi = useGithubApi();

// useEffect(
//   console.log(githubApi.isAuthenticated)
// )
  
export default function UserProvider({children}) {
  return(
    <UserContext.Provider>
      {children}
    </UserContext.Provider>
  )
}