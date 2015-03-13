/*global angular */
'use strict';

/**
 * The main app module
 * @name app
 * @type {angular.Module}
 */
var lightApp = angular.module('lightApp', ['mgcrea.ngStrap', 'schemaForm', 'pascalprecht.translate'])
.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
    lightApp.controller = $controllerProvider.register;
    lightApp.directive  = $compileProvider.directive;
    lightApp.filter     = $filterProvider.register;
    lightApp.factory    = $provide.factory;
    lightApp.service    = $provide.service;
}])
.controller('SelectController',[ '$scope','$http', function($scope, $http){

  $scope.callBackSD = function (options) {
      return [
          {value: 'value1', label: 'label1'},
          {value: 'value2', label: 'label2'},
          {value: 'value3', label: 'Dynamic select!'}
        ]
  };

  $scope.callBackMSD = function (options) {
      return [
          {value: 'value1', label: 'label1'},
          {value: 'value2', label: 'label2'},
          {value: 'value3', label: 'Multiple dynamic select!'}
        ]
  };


  $scope.callBackMSDAsync = function (options) {
      return $http.get(options.async.url);
  };

  $scope.schema = {
    type: 'object',
    title: 'Select',
    properties: {
      select: {
        title: 'Single Select Static',
        type: 'string',
        description: 'Only single item is allowed',
        items: [
          {value: 'value1', label: 'label1'},
          {value: 'value2', label: 'label2'},
          {value: 'value3', label: 'label3'}
        ]
      },
      multiselect: {
        title: 'Multi Select Static',
        type: 'array',
        description: 'Multi single items are allowed(select third for error)',
        items: [
          {value: ['value1', 'value1a'], label: 'label1'},
          {value: ['value2', 'value2'], label: 'label2'},
          {value: 'value3', label: 'long very very long label3'}
        ]
      },
        selectdynamic: {
            title: 'Single Select Dynamic',
            type: 'string',
            description: 'This data is loaded from the $scope.callBackSD function.'
        },
        multiselectdynamic: {
            title: 'Multi Select Dynamic',
            type: 'array',
            description: 'This data is loaded from the $scope.callBackMSD function.'
        },
        multiselectdynamic_http_post: {
            title: 'Multi Select Dynamic HTTP Post',
            type: 'array',
            description: 'This data is asynchrously loaded using a HTTP post(specify options.url and options.parameter)'
        },
        multiselectdynamic_http_get: {
            title: 'Multi Select Dynamic HTTP Post',
            type: 'array',
            description: 'This data is asynchrously loaded using a HTTP get(specify options.url)'
        },
        multiselectdynamic_async: {
            title: 'Multi Select Dynamic Async',
            type: 'array',
            description: 'This data is asynchrously loaded using a async call(specify options.async.call)'
        }
    },
    required: ['select', 'multiselect']
  };
  $scope.form = [
     {
       key: 'select',
       type: 'strapselect'

     },
     {
       key: 'multiselect',
       type: 'strapselect'
     },
     {
       key: "selectdynamic",
       type: 'strapselectdynamic',
       options: {
         callback: $scope.callBackSD
       }
     },
     {
       key: "multiselectdynamic",
       type: 'strapmultiselectdynamic',
       options: {
           callback: $scope.callBackMSD
       }
     },
     {
       key: "multiselectdynamic_http_post",
       type: 'strapmultiselectdynamic',
       options: {
           http_post: {
               url : "http://example:8080/api/rs",
               parameter: { category: "demo",  name: "getDropdown", readOnly: true}
           }
       }
     },
     {
       key: "multiselectdynamic_http_get",
       type: 'strapmultiselectdynamic',
       options: {
           http_get: {
               url : "http://example:8080/api/rs?cmd={\"category\": \"demo\", \"name\": \"getDropdown\", \"readOnly\": true}"
           }
       }
     },
     {
       key: "multiselectdynamic_async",
       type: 'strapmultiselectdynamic',
       options: {
           async: {
               call: $scope.callBackMSDAsync,
               url : "/test/testdata.json"
           }
       }
     },

     {
       type: "submit",
       style: "btn-info",
       title: "OK"
     },

  ];
  $scope.model = {};
  $scope.model.select = 'value3';
  $scope.model.multiselect = ['value2', 'value1'];


  $scope.submitted = function(form){
    $scope.$broadcast('schemaFormValidate')
    console.log($scope.model);
  };
}]);


