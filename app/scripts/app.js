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
        var body = Bodies.circle(270 + (Math.random() - .5) * 24, i * -50, 48 * 1.2, {
          angle: i,
          render: {
            sprite: {
              texture: member.icon,
              xScale: 0.5,
              yScale: 0.5
            }
          }
        });
        body.member = member;
        return body;
      });
      World.add(engine.world, bodies);
      World.add(engine.world, [
        Bodies.rectangle(270, 542, 540, 2, {isStatic: true}),
        Bodies.rectangle(542, 270, 2, 540, {isStatic: true}),
        Bodies.rectangle(-2, 270, 2, 540, {isStatic: true})
      ]);
      Events.on(engine, 'mousedown', function (event) {
        var body = bodies.filter(function (body) {
          return Matter.Vertices.contains(body.vertices, event.mouse.position);
        })[0];
        if (body) {
          body.torque +=10;
          body.force.y -=.5;

          $scope.$apply(function () {
            $scope.member = body.member;

          });
        }
      });
      Engine.run(engine);
    });
  });
