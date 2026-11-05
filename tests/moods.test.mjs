import {test} from 'node:test';
import assert from 'node:assert/strict';
import {moods,rankMood} from '../public/moods.js';
test('three keywords required',()=>assert.equal(rankMood([0,6]),null));
test('all six mood categories resolve from their keywords',()=>moods.forEach((m,i)=>assert.equal(rankMood([i,i+6,i+12]).id,m.id)));
test('majority wins and ties do not depend on click order',()=>{assert.equal(rankMood([1,7,0]).id,'clear');assert.equal(rankMood([0,1,2]).id,rankMood([2,1,0]).id);});
