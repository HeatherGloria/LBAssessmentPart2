angular
  .module('app', [
    'ngResource'
  ])

  .factory('RepoService', function($resource) {
    return $resource('https://api.github.com/users/:username/repos', {}, {
      query: {
        method: 'JSONP',
        params: { callback: 'JSON_CALLBACK' }
      }
    });
  })

  .factory('IssueService', function($resource) {
    return $resource('https://api.github.com/repos/:username/:repo/issues', {
      state: 'open'
    }, {
      query: {
        method: 'JSONP',
        params: { callback: 'JSON_CALLBACK' }
      }
    });
  })

  .controller('IssueController', function($scope, RepoService, IssueService) {
    $scope.username = 'angular';

    $scope.loadRepos = function() {
      $scope.repos = RepoService.query({ username: $scope.username });
    }();

    $scope.selectRepo = function(repo) {
      $scope.repo = repo;
    };

    $scope.$watch('repo', function(repo) {
      if (repo) {

        $scope.issues = IssueService.query({ username: $scope.username, repo: repo.name });
        console.log($scope.issues);
      }
    });
  })
;
