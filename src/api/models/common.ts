export type PaginatedResponse<T> = {
    count: number;
    previous: string;
    next: string;
    results: T[];
};