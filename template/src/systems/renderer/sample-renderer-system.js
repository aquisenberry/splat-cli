"use strict";
function emptyFunction() {
  return;
}
export default function (ecs, game) {
  emptyFunction(game);
  // eslint-disable-line no-unused-vars
  ecs.addEach(function (entity, elapsed) {
    // eslint-disable-line no-unused-vars
    // eslint-disable-line no-unused-vars

    emptyFunction(entity, elapsed);
  }, "playerController2d");
}
