import * as create from '../src/parse-json-bignumber';
import BigNumber from 'bignumber.js';


describe('lib', () => {

    describe('parse', () => {

        let parse;
        beforeEach(() => {
            parse = create().parse;
        });

        it('without big num', () => {

            const json = '{"a": 123}';
            expect(parse(json)).toEqual({ a: 123 });
        });

        it('with big number', () => {

            const json = '{"a": 123123123123213213123}';
            expect(parse(json)).toEqual({ a: '123123123123213213123' });
        });
    });

    describe('stringify', () => {

        let stringify;
        beforeEach(() => {
            stringify = create({ BigNumber }).stringify;
        });

        it('stringify with quote', () => {
            expect(stringify({ a: '"' })).toBe('{"a":"\\\""}');
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
