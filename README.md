# lambda-formation

A small framework for building nodejs [AWS Lambda][aws-lambda-url]
projects that are compatible with [AWS CloudFormation][aws-cloudformation-url]
[Custom Resources][aws-custom-resources-url].

[![lambda-formation][lambda-formation-image]][lambda-formation-url]

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coveralls-image]][coveralls-url]
[![Code Climate][codeclimate-image]][codeclimate-url]


The functions in a lambda-formation project can also be run directly
through the AWS Lambda API.  They will work with but do not rely on AWS
CloudFormation.

## Getting Started

Use the Yeoman generator
[generator-lambda-formation](https://github.com/SungardAS/generator-lambda-formation)

    yo lambda-formation:project my-lambda-formation-project

Now lets create a resource:

    cd my-lambda-formation-project
    
    yo lambda-formation:resource resource1

Now you have a project structure similar to the following:

    - my-lambda-formation-project
    |- .gitignore
    |- LICENSE
    |- README.md
    |- index.js
    |- lib
     |- resources
     |- README.md
     |- resource1
      |- create.js
      |- delete.js
      |- index.js
      |- update.js
    |- package.json


Add as many resources as necessary. A resource will map directly to a
CloudFormation Custom Resource. Beneath each resource a skeleton for controling `Create`,
`Update` and `Delete` request types have be generated.


## How does it work?

The project is designed so that calling a function from CloudFormation
is as seamless as possible.

For the following Custom Resource definition:

    {
      "AWSTemplateFormatVersion": "2010-09-09",
      "Resources": {
        "MyLambdaFormationResource": {
          "Type": "Custom::resource1",
          "Properties": {
            "ServiceToken": ARN_OF_LAMBDA_FORMATION,
            "myFirstProperty": "First Property",
            "mySecondProperty": {
              "name": "A Sub Property"
            }
          }
        }
      }
    }

CloudFormation will run the lamda code at `ARN_OF_LAMBDA_FORMATION`,
which is the zip of the lambda-formation project.

In this example lambda-formation will load `resource1` based on the
`Custom::resource1` type. If this project had multiple resources any
other resource could be executed by NAME with `Custom::NAME`.

If this is the first execution of the CloudFormation stack the handler in `create.js`
will be executed.  When the stack is updated the handler in `update.js` is executed.
When the stack is removed the handler in `delete.js` is executed.


### Direct call through Lambda

While the structure is designed to work with CloudFormation any handler
can be called directly though Lambda.

The main handler in the root `index.js` file is a router that can get
to any resource in the project.

Parameters to the main handler support multiple cases for the first
letter.  CloudFormation defaults to capitals while it is convention for
most other node project to use lower case.  This project supports both.

`resourceType|ResourceType` - Name of the resource to load.  Will
forward to the handler in the `index.js` file of the named resource.

`requestType|RequestType` - Name for the type of request
`Create|Update|Delete`.  Can also be one of `create|update|delete`

Direct Lambda execution:

    {
      "requestType": "delete",
      "resourceType": "resource1",
      "myCustomParam": "myCustomValue"
    }


## Where does my code go?

The `create.js`, `update.js` and `delete.js` files under each resource
in `lib/resources` is where any code or modules should be added.

Add code directly to the stubbed functions or write a module
and require it here.  Please do not alter the `handler` function.
This function controls the routing and execution response based on
direct Lambda versus CloudFormation calls.

### Resources

Each resource file will have a `create`, `update` or `delete` funciton
respectively.  The only requirement is that `util.done` is called when
any custom code has finish processing.  The `util.done` function will
prepare the responce for CloudFormation or as a return directly to
Lambda and complete the context for the execution.

    util.done(err,event,context[,data,id]);

On success `err` should be `null`

The `event` and `context` objects are required and can simply be passed
through.

The `data` parameter is optional and if included must be null or an object of key/value pairs
that describe resource. When executed though CloudFormation the
keys will be availbale as Resource Outputs.  For direct Lambda calls the
object will be sent to `context.done`.

The `id` parameter is only required for 'create.js'.  This will be
the ID CloudFormation will use to track the resource.  If `id` is
provided then `data` must also be defined.

## Examples

* [lambda-formation-example-resources](https://github.com/SungardAS/lambda-formation-example-resources)
* [spotinst-lambda](https://github.com/SungardAS/spotinst-lambda)

## Sungard Availability Services | Labs
[![Sungard Availability Services | Labs][labs-logo]][labs-github-url]

This project is maintained by the Labs team at [Sungard Availability
Services](http://sungardas.com)

GitHub: [https://sungardas.github.io](https://sungardas.github.io)

Blog:
[http://blog.sungardas.com/CTOLabs/](http://blog.sungardas.com/CTOLabs/)


[labs-github-url]: https://sungardas.github.io
[labs-logo]: https://raw.githubusercontent.com/SungardAS/repo-assets/master/images/logos/sungardas-labs-logo-small.png
[npm-image]: https://badge.fury.io/js/lambda-formation.svg
[npm-url]: https://npmjs.org/package/lambda-formation
[travis-image]:
https://travis-ci.org/SungardAS/lambda-formation.svg?branch=master
[travis-url]: https://travis-ci.org/SungardAS/lambda-formation
[daviddm-image]:
https://david-dm.org/SungardAS/lambda-formation.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/SungardAS/lambda-formation
[coveralls-image]:
https://coveralls.io/repos/SungardAS/lambda-formation/badge.svg
[coveralls-url]:
https://coveralls.io/r/SungardAS/lambda-formation
[codeclimate-image]: https://codeclimate.com/github/SungardAS/lambda-formation/badges/gpa.svg
[codeclimate-url]: https://codeclimate.com/github/SungardAS/lambda-formation

[aws-lambda-url]: https://aws.amazon.com/lambda/
[aws-cloudformation-url]: https://aws.amazon.com/cloudformation/
[aws-custom-resources-url]: http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html
[lambda-formation-image]: ./docs/images/lambda-formation.png?raw=true
[lambda-formation-url]: https://github.com/SungardAS/lambda-formation
