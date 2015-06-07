angular.module('kamikikaiApp', ['duScroll'])
  .controller('MainCtrl', function ($scope, $timeout, $http, $element) {
    var diff = Date.now() - ps;
    $timeout(function () {
      $scope.loaded = true;
    }, 500 - diff > 0 ? 500 - diff : 0);
    var Engine = Matter.Engine;
    var World = Matter.World;
    var Bodies = Matter.Bodies;
    var Events = Matter.Events;
    $scope.members = [];
    $http.get('/api/members').success(function (members) {
      var engine = Engine.create($element[0].querySelector('.members'), {
        render: {
          options: {
            wireframes: false,
            width: 540,
            height: 540,
            background: '#ffffff'
          }
        }
      });
      $scope.members = members;
      var bodies = members.map(function (member, i) {
        var body = Bodies.circle(270 + (Math.random() - .5) * 24, i * -50 , 48, {
          angle: i,
          render: {
            strokeStyle: '#d04030',
            sprite: {
              texture: member.icon,
              xScale: 0.5,
              yScale: 0.5
            }
          }});
        return body;
      });
      World.add(engine.world, bodies);
      World.add(engine.world, [
        Bodies.rectangle(270, 540, 540, 1, {isStatic: true}),
        Bodies.rectangle(540, 270, 1, 540, {isStatic: true}),
        Bodies.rectangle(0, 270, 1, 540, {isStatic: true})
      ]);
      var mouseConstraint = Matter.MouseConstraint.create(engine, {

      });
      Events.on(engine, 'tick', function(event) {
        //if(mouseConstraint.mouse.button == 0){
        //}
      });
      Engine.run(engine);
    });
  });
