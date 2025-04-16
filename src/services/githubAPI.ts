import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Fetches user data from GitHub API
 * @param username - The GitHub username to fetch data for
 * @returns {Promise<any>} - A promise that resolves to the user data
 * @throws {Error} - Throws an error if the request fails
 */
export const getUser = async (username: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${username}`);
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
        const response = await axios.get(`${BASE_URL}/users/${username}/repos`);
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
        const response = await axios.get(`${BASE_URL}/repos/${username}/${repoName}/languages`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching repository languages');
    }
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
        const response = await axios.get(`${BASE_URL}/repos/${username}/${repoName}/commits`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching repository commits');
    }
}