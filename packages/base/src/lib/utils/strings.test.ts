import React from 'react';
import { toCamel, toDashCase } from './strings';

describe('toCamel', () => {
  it('should convert kebab-case to camelCase', () => {
    const input = 'hello-world';
    const expectedOutput = 'helloWorld';
    const result = toCamel(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should convert multiple kebab-case to camelCase', () => {
    const input = 'hello-world-how-are-you';
    const expectedOutput = 'helloWorldHowAreYou';
    const result = toCamel(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty string', () => {
    const input = '';
    const expectedOutput = '';
    const result = toCamel(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle string without kebab-case', () => {
    const input = 'helloWorld';
    const expectedOutput = 'helloWorld';
    const result = toCamel(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe('toDashCase', () => {
  it('should convert camelCase to dash-case', () => {
    const result = toDashCase('camelCaseString');
    expect(result).toBe('camel-case-string');
  });

  it('should handle single uppercase letter at the beginning', () => {
    const result = toDashCase('UpperCase');
    expect(result).toBe('upper-case');
  });

  it('should handle strings with no uppercase letters', () => {
    const result = toDashCase('lowercase');
    expect(result).toBe('lowercase');
  });

  it('should handle strings with consecutive uppercase letters', () => {
    const result = toDashCase('ConsecutiveUpperCases');
    expect(result).toBe('consecutive-upper-cases');
  });

  it('should handle empty string', () => {
    const result = toDashCase('');
    expect(result).toBe('');
  });

  it('should handle strings with only one uppercase letter', () => {
    const result = toDashCase('A');
    expect(result).toBe('a');
  });

  it('should handle strings with digits', () => {
    const result = toDashCase('stringWith123Digits');
    expect(result).toBe('string-with-123-digits');
  });

  it('should handle strings with digits at the end of the string', () => {
    const result = toDashCase('primaryColor01');
    expect(result).toBe('primary-color-01');
  });
});
