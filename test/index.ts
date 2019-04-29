import * as create from '../src/parse-json-bignumber';
import BigNumber from 'bignumber.js';


interface IOptions<T> {
    strict: boolean;
    parse: (long: string) => T;
    stringify: (long: T) => string;
    isInstance: (some: any) => some is T;
}

let options: IOptions<BigNumber> = {
    strict: false,
    parse: (long: string): BigNumber => new BigNumber(long),
    stringify: (long: BigNumber): string => long.toFixed(),
    isInstance: (some): some is BigNumber => some && (some instanceof BigNumber || BigNumber.isBigNumber(some))
};

describe('lib', () => {

    describe('parse', () => {

        let parse;
        beforeEach(() => {
            parse = create().parse;
        });

        it('without big num', () => {

            const json = '{"a": 123}';
            expect(parse(json)).toEqual({a: 123});
        });

        it('with big number', () => {

            const json = '{"a": 12312312312321321312312312312312321321312312312312312321321312}';
            expect(parse(json)).toEqual({a: '12312312312321321312312312312312321321312312312312312321321312'});
        });
    });


    describe('parse to bigNum', () => {

        let parse;
        beforeEach(() => {
            parse = create(options).parse;
        });

        it('with big number', () => {
            const json = '{"a": 12312312312321321312312312312312321321312312312312312321321312}';
            expect(parse(json)).toEqual({a: new BigNumber('12312312312321321312312312312312321321312312312312312321321312')});
        });
    });

    describe('stringify', () => {

        let stringify;
        beforeEach(() => {
            stringify = create().stringify;
        });

        it('stringify with quote', () => {
            expect(stringify({a: '"'})).toBe('{"a":"\\\""}');
        });

        it('stringify with standard toJson', () => {
            let date = new Date();
            expect(stringify({a: date})).toBe(`{"a":"${date.toJSON()}"}`);
        });

        it('with big number', () => {

            const data = {
                a: new BigNumber(123)
            };

            const result = stringify(data);
            expect(result).toBe(JSON.stringify({a: data.a}));
        });

        it('with big number', () => {

            const data = {
                a: new BigNumber('99999999999999999999999999999999999999999999999999999999.99999999999999')
            };

            const result = stringify(data);
            expect(result).toBe(JSON.stringify({a: data.a}));
        });

    });

    describe('stringify to big num', () => {

        let stringify;
        beforeEach(() => {
            stringify = create(options).stringify;
        });

        it('stringify with quote', () => {
            expect(stringify({a: '"'})).toBe('{"a":"\\\""}');
        });

        it('stringify with standard toJson', () => {
            let date = new Date();
            expect(stringify({a: date})).toBe(`{"a":"${date.toJSON()}"}`);
        });

        it('with big number', () => {

            const data = {
                a: new BigNumber(123)
            };

            expect(stringify(data)).toBe('{"a":123}');
        });

        it('with big number', () => {

            const data = {
                a: new BigNumber('9999999999999999999999999999999999.99999999999999')
            };

            const result = stringify(data);
            expect(result).toBe('{"a":9999999999999999999999999999999999.99999999999999}');
        });

    });

});
