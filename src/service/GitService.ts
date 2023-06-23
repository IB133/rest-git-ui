import axios from "axios";

export interface IRepositoriesRequest {
    repositories: {
        gitlab: string[];
        github: string[];
    }
    gitlabToken: string;
    githubToken: string;
}

export interface IRepositoriesStatusResponse {
    gitlab: {
        success: string[];
        failure: string[];
    },
    github: {
        success: string[];
        failure: string[];
    },
}

export interface IRespositoriesInfo {
    name: string;
    url: string;
    description: string;
    creation: string;
    contributorCount: number;
    contributors: string[];
}

export class GitService {
    public getRepositoriesStatus(request: IRepositoriesRequest): Promise<IRepositoriesStatusResponse> {
        const apiUrl = 'http://intern-git-rest-bragin.apps.okd4.sm-soft.ru/api/restgit/add';
        const headers = {
            'Gitlab-auth-token': request.gitlabToken,
            "Github-auth-token": request.githubToken
        }
        return axios.post<IRepositoriesStatusResponse>(apiUrl, request.repositories,
            {headers: headers}).then((response) => {
            console.log('aboba')
            return response.data;
        });
    }

    public getRepositoryInfo(repoName: string): Promise<IRespositoriesInfo[]> {
        const apiUrl  = `http://intern-git-rest-bragin.apps.okd4.sm-soft.ru/api/restgit/repo/${repoName}`
        console.log(repoName);
        return axios.get<IRespositoriesInfo[]>(apiUrl).then((response) =>
        {
            return response.data
        });
    }
}
