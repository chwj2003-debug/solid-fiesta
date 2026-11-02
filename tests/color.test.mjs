import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lab,compare,rank,fromHex} from '../public/color.js';
test('D65 reference black and white',()=>{assert.deepEqual(lab([0,0,0]),[0,0,0]);const [l,a,b]=lab([255,255,255]);assert.ok(Math.abs(l-100)<.001&&Math.abs(a)<.001&&Math.abs(b)<.001);});
test('exact shade ranks first and inputs change recommendation',()=>{const products=[{id:1,hex:'#E58F7D'},{id:2,hex:'#AA7B92'},{id:3,hex:'#794A43'}];for(const p of products){const result=rank(products,fromHex(p.hex));assert.equal(result[0].id,p.id);assert.equal(result[0].match.score,100);assert.equal(result[0].match.delta,0);assert.ok(result[1].match.delta>0);}assert.equal(products[0].match,undefined);});
test('equal distance is stable, hue and brightness affect score',()=>{assert.equal(rank([{id:2,hex:'#AA7B92'},{id:1,hex:'#AA7B92'}],[170,123,146])[0].id,1);assert.ok(compare([170,123,146],'#794A43').delta>compare([170,123,146],'#AD778F').delta);});
