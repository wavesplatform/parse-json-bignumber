import * as create from '../src/parse-json-bignumber';
import BigNumber from 'bignumber.js';

// @ts-ignore
let options: IOptions = {
    strict: false,
    parse: (long: string) => new BigNumber(long),
    stringify: (long) => long.toFixed(),
    isInstance: (some) => some && (some instanceof BigNumber || BigNumber.isBigNumber(some))
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
            stringify = create(options).stringify;
        });

        it('stringify with quote', () => {
            expect(stringify({a: '"'})).toBe('{"a":"\\\""}');
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
