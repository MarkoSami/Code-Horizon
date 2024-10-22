export default interface RequestOptions {
    page: number,
    limit: number,
    sortBy?: string | undefined,
    order?: 'asc' | 'desc'
    query: object
}