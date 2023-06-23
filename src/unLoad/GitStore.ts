import {create} from "zustand";
import {IRepositoriesStatusResponse, IRespositoriesInfo} from "../service/GitService.ts";

export interface IGitStore {
    repositoryList: IRepositoriesStatusResponse;
    setRepositoryList: (newRepositories: IRepositoriesStatusResponse) => void;

}

export interface IRepoInfo{
    repositoryInfo: IRespositoriesInfo[];
    setRepositoryInfo: (repository: IRespositoriesInfo[]) => void;
}

export const useGitStore = create<IGitStore>((set) => ({
    repositoryList: {} as IRepositoriesStatusResponse,
    setRepositoryList: (newRepositories: IRepositoriesStatusResponse ) => set({repositoryList: newRepositories}),
}));


export const useRepoInfo = create<IRepoInfo>((set) => ({
    repositoryInfo: [],
    setRepositoryInfo: (repository: IRespositoriesInfo[]) => set({repositoryInfo: repository}),
}));