interface ShellType {
    id: number;
    title: string;
    summary: string;
    body: string;
    importance: "low" | "normal" | "high";
}

export class ShellModel implements ShellType {
    id: number;
    title: string;
    summary: string;
    body: string;
    importance: "low" | "normal" | "high";

    constructor(obj: ShellType) {
        this.id = obj.id;
        this.title = obj.title;
        this.summary = obj.summary;
        this.body = obj.body;
        this.importance = obj.importance;
    }
}

export enum Visibility {
    Title = "title",
    Summary = "summary",
    Full = "full"
}