export interface Event {
    id?: string;
    title: string;
    description: string;
    date: Date;
    genres?: Map<string, boolean>;
    imageUrl?: string;
    ticket?: string;
}
