export interface UserCardProps {
    user: {
        avatar_url: string;
        name: string;
        login: string;
        bio: string | null;
        location: string | null;
        followers: number;
        public_repos: number;
    };
}