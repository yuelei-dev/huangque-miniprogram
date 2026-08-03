const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..', 'miniprogram', 'pages', 'home');
const wxml = fs.readFileSync(path.join(root, 'home.wxml'), 'utf8');
const wxss = fs.readFileSync(path.join(root, 'home.wxss'), 'utf8');

[
  'hero-haze',
  'hero-beam',
  'hero-starfield',
  'hero-orbit-outer',
  'hero-orbit-mid',
  'hero-orbit-vertical',
  'hero-sphere',
  'hero-particle',
  'hero-dust',
  'hero-reflection'
].forEach((className) => {
  assert.match(wxml, new RegExp(`class="[^"]*${className}`), `${className} must remain in the hero markup`);
  assert.match(wxss, new RegExp(`\\.${className}(?:[\\s,{])`), `${className} must remain styled`);
});

[
  'heroHaze',
  'heroBeam',
  'heroStarfield',
  'heroStageFloat',
  'heroEnergyPlane',
  'heroOrbitOuter',
  'heroOrbitMid',
  'heroOrbitVertical',
  'heroHalo',
  'heroSphereFloat',
  'sphereAtmosphere',
  'sphereCore',
  'heroParticle',
  'heroDust',
  'heroReflection'
].forEach((animationName) => {
  assert.match(wxss, new RegExp(`@keyframes\\s+${animationName}\\b`), `${animationName} keyframes must remain defined`);
  assert.match(wxss, new RegExp(`animation:\\s*${animationName}\\b`), `${animationName} must remain referenced`);
});

assert.match(wxss, /perspective:\s*\d+rpx/);
assert.match(wxss, /transform-style:\s*preserve-3d/);
const heroStart = wxml.indexOf('<view class="hero-motion"');
const heroEnd = wxml.indexOf('<view class="brandbar">');
assert.ok(heroStart >= 0 && heroEnd > heroStart, 'the decorative hero boundary must remain identifiable');
assert.doesNotMatch(wxml.slice(heroStart, heroEnd), /bindtap|catchtap/, 'the decorative hero must not intercept user interaction');

console.log('home 3D orbit contract tests passed');
