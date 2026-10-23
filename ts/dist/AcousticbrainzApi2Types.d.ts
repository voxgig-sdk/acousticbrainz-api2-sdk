export interface Between {
}
export interface BetweenLoadMatch {
    metric: string;
    recording_id: string;
}
export interface BulkDocument {
}
export interface BulkDocumentLoadMatch {
    map_class?: boolean;
    recording_id: string;
    feature?: string;
}
export interface Count {
    count?: number;
    mbid?: string;
}
export interface CountLoadMatch {
    recording_id: string;
}
export interface Document {
}
export interface DocumentLoadMatch {
    mbid: string;
    map_class?: boolean;
    n?: number;
}
export interface Similarity {
    id?: string;
}
export interface SimilarityLoadMatch {
    id: string;
    n_neighbour?: number;
    recording_id: string;
    remove_dup?: string;
    threshold?: number;
}
