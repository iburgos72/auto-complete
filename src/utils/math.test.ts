import { clamp } from './';

describe('clamp', () => {
    it('should clamp a value within the specified range', () => {
        expect(clamp(10, 20, 5)).toBe(10); // Should return the minimum value (10)

        expect(clamp(10, 20, 25)).toBe(20); // Should return the maximum value (20)

        expect(clamp(10, 20, 15)).toBe(15); // Should return the value itself (15)
    });

    it('should handle negative values and zero', () => {
        expect(clamp(-10, -5, -7)).toBe(-7); // Should return the value itself (-7)

        expect(clamp(0, 10, 5)).toBe(5); // Should return the value itself (5)

        expect(clamp(-5, 0, -3)).toBe(-3); // Should return the value itself (-3)

        expect(clamp(0, 0, 0)).toBe(0); // Should return the value itself (0)
    });
});