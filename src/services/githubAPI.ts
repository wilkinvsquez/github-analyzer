import axios from 'axios';

const BASE_URL = 'https://api.github.com';

const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
}

/**
 * Fetches user data from GitHub API
 * @param username - The GitHub username to fetch data for
 * @returns {Promise<any>} - A promise that resolves to the user data
 * @throws {Error} - Throws an error if the request fails
 */
export const getUser = async (username: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${username}`, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user data');
    }
}

export const searchUsers = async (username: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/users?`, { params: { q: username, per_page: 10 } });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user data');
    }
}

/**
 * Fetches user repositories from GitHub API
 * @param username - The GitHub username to fetch repositories for
 * @returns {Promise<any>} - A promise that resolves to the user repositories
 * @throws {Error} - Throws an error if the request fails
 */
export const getUserRepos = async (username: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${username}/repos`, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user repositories');
    }
}

/**
 * Fetches repository languages from GitHub API
 * @param username - The GitHub username to fetch repository languages for
 * @param repoName - The name of the repository to fetch languages for
 * @returns {Promise<any>} - A promise that resolves to the repository languages
 * @throws {Error} - Throws an error if the request fails
 */
export const getRepoLanguages = async (username: string, repoName: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/repos/${username}/${repoName}/languages`, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching repository languages');
    }
}

/**
 * Fetches the number of commits in a GitHub repository
 * @param owner - The owner of the repository
 * @param repo - The name of the repository
 * @returns {Promise<number>} - A promise that resolves to the number of commits
 */
export async function getCommitCount(owner: string, repo: string): Promise<number> {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
        },
    });

    if (!res.ok) return 0;

    const linkHeader = res.headers.get('Link');
    if (!linkHeader) {
        const commits = await res.json();
        return commits.length;
    }

    const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
    return match ? parseInt(match[1]) : 1;
}

/**
 * Fetches repository commits from GitHub API
 * @param username - The GitHub username to fetch repository commits for
 * @param repoName - The name of the repository to fetch commits for
 * @returns {Promise<any>} - A promise that resolves to the repository commits
 * @throws {Error} - Throws an error if the request fails
 */
export const getRepoCommits = async (username: string, repoName: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/repos/${username}/${repoName}/commits`, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching repository commits');
    }
}