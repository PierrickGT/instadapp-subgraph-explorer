import { rem } from 'polished';

/**
 * Handle style spacing based on a vertical rythm of 8px
 * @param  {Number} [factor=1] Multiplier factor
 * @return {String}            Pixel value
 */
// eslint-disable-next-line
export const spacingUnit = (factor = 1) => {
    const value = 8 * factor;

    return rem(`${value}px`);
};
