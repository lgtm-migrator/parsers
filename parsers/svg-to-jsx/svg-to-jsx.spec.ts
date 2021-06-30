import seeds from '../../tests/seeds';
import libs, { LibsType } from '../global-libs';
import { InputDataType } from './svg-to-jsx.parser';
import svgToJsx from './svg-to-jsx.parser';

describe('Svg to jsx', () => {
  it('Get tokens - apply parsers', async done => {
    const tokens = seeds().tokens.filter(({ type }) => type === 'vector');
    const result = await svgToJsx(tokens as InputDataType, undefined, libs as LibsType);
    if (result instanceof Error) return done.fail(result);
    expect(Array.isArray(result)).toEqual(true);
    result.forEach(file => {
      expect(typeof file.value.content).toEqual('string');
      expect(file.value.fileName.endsWith('.jsx')).toEqual(true);
      const reg = new RegExp(
        `export default \\(\\) => \\(\\n  <svg([\\s\\S]*)>([\\s\\S]*)<\\/svg>\\n\\);`,
        'gm',
      );
      expect(file.value.content).toMatch(reg);
    });
    done();
  });
  it('Get tokens - apply parsers without export default', async done => {
    const tokens = seeds().tokens.filter(({ type }) => type === 'vector');
    const result = await svgToJsx(
      JSON.parse(JSON.stringify(tokens)) as InputDataType,
      { formatConfig: { exportDefault: false } },
      libs as LibsType,
    );
    if (result instanceof Error) return done.fail(result);
    expect(Array.isArray(result)).toEqual(true);
    result.forEach(file => {
      expect(typeof file.value.content).toEqual('string');
      expect(file.value.fileName.endsWith('.jsx')).toEqual(true);
      const reg = new RegExp(
        `export const ([a-zA-Z0-9])+ = \\(\\) => \\(\\n  <svg([\\s\\S]*)>([\\s\\S]*)<\\/svg>\\n\\);`,
        'gm',
      );
      expect(file.value.content).toMatch(reg);
    });
    done();
  });
  it('Get tokens - apply parsers with wrapper', async done => {
    const tokens = seeds().tokens.filter(({ type }) => type === 'vector');
    const result = await svgToJsx(
      tokens as InputDataType,
      {
        prepend: "import React from 'react';",
        variableFormat: 'camelCase',
        wrapper: {
          tag: 'div',
          className: 'icon-{{name}} icon',
        },
        formatConfig: {
          exportDefault: false,
        },
      },
      libs as LibsType,
    );

    if (result instanceof Error) return done.fail(result);
    expect(Array.isArray(result)).toEqual(true);
    result.forEach(file => {
      expect(typeof file.value.content).toEqual('string');
      expect(file.value.fileName.endsWith('.jsx')).toEqual(true);
      const reg = new RegExp(
        `import React from "react";([\\s\\S]*)export const ([a-zA-Z0-9])+ = \\(\\) => \\(\\n  <div className="icon-[\\s\\S]* icon">([\\s\\S]*)<svg([\\s\\S]*)>([\\s\\S]*)<\\/svg>\\n  <\\/div>\\n\\);`,
        'gm',
      );
      expect(file.value.content).toMatch(reg);
    });
    done();
  });
});
