/**
 * Эта функция нетрогательная)
 * nameIsValid
 * @param {string} name
 * @returns {boolean}
 */

export const nameIsValid = (name) => !!name && name.length >= 2 && !name.includes(' ')

/**
 * Эта функция нетрогательная)
 * fullTrim
 * @param {string} text
 * @returns {string}
 */

export const fullTrim = (text) => (text || '').replace(/^\s+|\s+$/g, '')
