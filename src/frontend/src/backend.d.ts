import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface PoetryContent {
    id: string;
    title: string;
    content: string;
    audio?: ExternalBlob;
    textVersion?: string;
    visualAssets: Array<ExternalBlob>;
    category: ContentCategory;
    videos: Array<ExternalBlob>;
    images: Array<ExternalBlob>;
}
export interface SocialMediaLink {
    url: string;
    platform: string;
}
export interface LayoutPreference {
    style: string;
    featuredSection: string;
    colorScheme: string;
}
export interface Poet {
    id: string;
    content: ArtistContent;
    stateOrUT: StateOrUT;
    name: string;
    biography: string;
    notableWorks: Array<string>;
    website?: string;
    socialMediaLinks: Array<SocialMediaLink>;
    awards: Array<string>;
    genres: Array<string>;
    layoutPreference: LayoutPreference;
    image?: Image;
    avatarImage?: Image;
}
export interface ArtistContent {
    bio: string;
    poetryWorks: Array<PoetryContent>;
    biography: string;
    textWorks: Array<PoetryContent>;
    audioWorks: Array<PoetryContent>;
    videoWorks: Array<PoetryContent>;
    location: StateOrUT;
    artWorks: Array<PoetryContent>;
    images: Array<ExternalBlob>;
}
export interface Image {
    url: string;
    description?: string;
}
export type StateOrUT = {
    __kind__: "unionTerritory";
    unionTerritory: UnionTerritory;
} | {
    __kind__: "state";
    state: State;
};
export interface UserProfile {
    name: string;
    email?: string;
    preferences: {
        theme: string;
        language: string;
    };
    favoritePoets: Array<string>;
}
export enum ContentCategory {
    imageShayaris = "imageShayaris",
    kahanis = "kahanis",
    kavitas = "kavitas",
    ghazals = "ghazals",
    shers = "shers",
    nazms = "nazms",
    top5Shayaris = "top5Shayaris",
    audioFiles = "audioFiles",
    videos = "videos"
}
export enum State {
    goa = "goa",
    chhattisgarh = "chhattisgarh",
    telangana = "telangana",
    manipur = "manipur",
    rajasthan = "rajasthan",
    madhyaPradesh = "madhyaPradesh",
    assam = "assam",
    tripura = "tripura",
    mizoram = "mizoram",
    kerala = "kerala",
    odisha = "odisha",
    tamilNadu = "tamilNadu",
    arunachalPradesh = "arunachalPradesh",
    andhraPradesh = "andhraPradesh",
    punjab = "punjab",
    uttarakhand = "uttarakhand",
    karnataka = "karnataka",
    haryana = "haryana",
    nagaland = "nagaland",
    uttarPradesh = "uttarPradesh",
    himachalPradesh = "himachalPradesh",
    bihar = "bihar",
    sikkim = "sikkim",
    jharkhand = "jharkhand",
    gujarat = "gujarat",
    meghalaya = "meghalaya",
    maharashtra = "maharashtra",
    westBengal = "westBengal"
}
export enum UnionTerritory {
    ladakh = "ladakh",
    jammuAndKashmir = "jammuAndKashmir",
    chandigarh = "chandigarh",
    puducherry = "puducherry",
    lakshadweep = "lakshadweep",
    dadraAndNagarHaveliAndDamanAndDiu = "dadraAndNagarHaveliAndDamanAndDiu",
    andamanAndNicobarIslands = "andamanAndNicobarIslands",
    delhi = "delhi"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPoemToMainPoet(poem: PoetryContent): Promise<void>;
    addPoemToPoet(poetId: string, poem: PoetryContent): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPoet(id: string, poet: Poet): Promise<void>;
    deletePoet(id: string): Promise<void>;
    getAllPoets(): Promise<Array<Poet>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMainPoet(): Promise<Poet>;
    getPoemsByCategory(poetId: string, category: ContentCategory): Promise<Array<PoetryContent>>;
    getPoet(id: string): Promise<Poet>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateMainPoet(updatedPoet: Poet): Promise<void>;
    updatePoet(id: string, updatedPoet: Poet): Promise<void>;
    uploadFile(file: ExternalBlob): Promise<ExternalBlob>;
}
