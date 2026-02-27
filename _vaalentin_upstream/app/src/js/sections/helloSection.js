'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Smoke = require('../objects3D/SmokeObject3D');

var helloSection = new Section('hello');

var title = new TextPanel(
  'YOSIN NUROV\nMIDDLE FRONTEND DEV',
  {
    align: 'center',
    style: '',
    size: 50,
    lineSpacing: 40
  }
);
title.el.position.set(0, 5, 0);
helloSection.add(title.el);

var smoke = new Smoke({  
  frontColor: '#4c4c4c',
  backColor: '#ffffff',
  layers: 3,
  data: [
    { positionX : 10.7, positionY: 3.9, positionZ: 17.8, rotationZ: 2.7, scale: 3.9 },
    { positionX : -2.8, positionY: 2.6, positionZ: -11, rotationZ: 0.7, scale: 7.7 },
    { positionX : 13, positionY: 19.5, positionZ: -1.3, rotationZ: 2, scale: 2.7 }
  ]
});

helloSection.add(smoke.el);

smoke.el.visible = false;

helloSection.onIn(function () {
  title.in();
});

helloSection.onOut(function (way) {
  title.out(way);
});

var smokePlaying = false;

helloSection.smokeStart = function () {
  if (smokePlaying) {
    return false;
  }

  smokePlaying = true;

  smoke.start();

  smoke.el.visible = true;
};

helloSection.smokeStop = function () {
  if (!smokePlaying) {
    return false;
  }

  smokePlaying = false;

  smoke.stop();

  smoke.el.visible = false;
};

module.exports = helloSection;
