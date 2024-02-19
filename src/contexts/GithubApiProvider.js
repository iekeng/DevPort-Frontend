import GithubApiClient from '../apiClients/GithubApiClient';
import { useContext, createContext } from 'react';

const githubContext = createContext();

export default function GithubApiProvider({children}) {

  const githubApi = new GithubApiClient();

  return (
    <githubContext.Provider value={githubApi}>
      {children}
    </githubContext.Provider>
  )
}

export function useGithubApi() {
  return useContext(githubContext);
}