import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Security Tests', () => {
  test('should not contain eval in production code', () => {
    // Simple check for eval usage
    const sourceCode = require('fs').readFileSync(
      require('path').resolve(__dirname, '../src/components/UserInput.tsx'), 
      'utf8'
    );
    
    // This test should fail because we intentionally used eval
    expect(sourceCode).not.toContain('eval(');
  });

  test('should not have dangerouslySetInnerHTML without sanitization', () => {
    const sourceCode = require('fs').readFileSync(
      require('path').resolve(__dirname, '../src/components/UserInput.tsx'), 
      'utf8'
    );
    
    // This test should fail because we intentionally used dangerouslySetInnerHTML
    expect(sourceCode).not.toContain('dangerouslySetInnerHTML');
  });
});