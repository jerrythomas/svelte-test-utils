export function setup(): void;
export function reset(): void;
export class SvelteWrapper {
    constructor(Tag: any, props?: {});
    Tag: any;
    props: {};
    container: any;
    component: any;
    set properties(arg: any);
    render(): void;
    textContent(selector: any): any;
    fire(selector: any, event: any, details: any): any;
    cleanup(): void;
}
