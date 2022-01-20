/**
 * This module contains misc. functions that might not apply
 * to a single class.
*/

export function randomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomChoice(arr)
{
    if(arr.length > 0)
    {
        return arr[randomInt(0, arr.length - 1)];
    }
    return null;
}
