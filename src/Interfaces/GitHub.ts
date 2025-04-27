export interface GitHubUser {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
}

export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    commits?: number;
}