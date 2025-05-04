export interface RepoFiltersProps {
    initialSearch: string;
    initialLanguage: string;
    initialMinStars: number;
    initialMinForks: number;
    languages: (string | null)[];
    onApply: (filters: {
        search: string;
        language: string;
        minStars: number;
        minForks: number;
    }) => void;
    onClose: () => void;
}