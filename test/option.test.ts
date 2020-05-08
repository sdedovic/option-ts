import { Option, Some, None } from '../src';

describe('Option', () => {
    it('works', () => {
        let a = new Some(4);
        let b = None;
        let c = Option.of(3);
        let d = Option.of(null);

        expect(a.isDefined()).toBeTruthy();
        expect(b.isEmpty()).toBeTruthy();

        expect(a.get()).toEqual(4);
        expect(b.get).toThrow();

        expect(c.isDefined()).toBeTruthy();
        expect(c.get()).toEqual(3);

        expect(d.isEmpty()).toBeTruthy();
        expect(d.get).toThrow();
    });
});