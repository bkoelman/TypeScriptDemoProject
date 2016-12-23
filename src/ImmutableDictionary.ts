// http://www.dustinhorne.com/post/2016/06/08/implementing-a-dictionary-in-typescript

export class KeyValuePair<TValue> {
    public readonly key: string;
    public readonly value: TValue;

    public constructor(key: string, value: TValue) {
        this.key = key;
        this.value = value;
    }
}

export class ImmutableDictionary<TValue> {
    private items: { [index: string]: TValue } = {};

    public get length(): number {
        return Object.keys(this.items).length;
    }

    public get keys(): string[] {
        return Object.keys(this.items);
    }

    public get values(): TValue[] {
        let values: TValue[] = [];

        for (let prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }

        return values;
    }

    public getItem(key: string): TValue {
        return this.items[key];
    }

    public add(key: string, value: TValue): ImmutableDictionary<TValue> {

        // https://github.com/m3talstorm/hashcode/blob/master/lib/hashcode.js
        let hash = JSON.stringify(value);

        // TODO: Copy data efficiently
        this.items[key] = value;
        return this;
    }

    public remove(key: string): ImmutableDictionary<TValue> {
        delete this.items[key];
        return this;
    }
}