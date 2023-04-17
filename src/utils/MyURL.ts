export default class MyURL {
    uri: URL;

    constructor() {
        this.uri = new URL('https://642466119e0a30d92b1b018c.mockapi.io/items');
    }

    public get url(): string {
        return this.uri.toString();
    }

    public set setCategory(id: number) {
        this.uri.searchParams.set('category', id.toString());
    }

    public set sortType(type: string) {
        this.uri.searchParams.set('sortBy', type);
    }

    public set page(num: number) {
        this.uri.searchParams.set('page', num.toString());
        this.uri.searchParams.set('limit', '4');
    }

    public set searchParam(val: string) {
        console.log(val);
        this.uri.searchParams.set('search', decodeURIComponent(val));
    }

    deleteSearParam(params: string) {
        this.uri.searchParams.delete(params);
    }
}
