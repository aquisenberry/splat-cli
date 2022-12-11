"use strict";

export default function (ecs) {
  // eslint-disable-line no-unused-vars
  ecs.addEach(function (entity, elapsed) {
    // eslint-disable-line no-unused-vars
    let e = entity;
    let l = elapsed;
    function emptyFunction() {
      return { e, l };
    }
    emptyFunction();
  }, "playerController2d");
}
