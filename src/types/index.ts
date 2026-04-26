export interface Collection {
    id: string;
    name: string;
    icon: string;
    count: number;
    description?: string;
    items?: Item[];
}

export interface Item {
    id: string;
    collectionId: string;
    name: string;
    description: string;
    imageUrl: string;
    rating: number;
    date: string;
    createdAt: string;
}
