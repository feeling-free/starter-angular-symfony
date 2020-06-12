starter-angular-symfony
=======================


# features

- authentication via JWT, login, logout, session expiration support
- angular production builds delivered by symfony (with proper caching)
- all data exchange between server and frontend uses binary protobuf
- automatic formatting of exceptions for angular client (stack traces if symfony debug = true)
- each request is tagged with a unique id, id is logged with every log record, delivered to client 


# protobuf

Protobuf is used for data exchange between server and frontend. See `protos/` 
directory for the message and service definitions. 

For the first installation and after adding or changing a .proto file, run `make generate` to 
generate Typescript and PHP code.

You need the protobuf compiler `protoc` for that. Run `brew install protobuf` or 
`sudo port install protobuf3-cpp` or download a release for your OS 
[here](https://github.com/protocolbuffers/protobuf/releases) 
and follow the installation instructions.

This will write PHP files to `symfony/src-pb` and typescript files to `angular/src/pb`.   

To add a new service: 
- Create the service in a new .proto file in the `/protos/` directory.
- Run `make generate`.
- A PHP interface for your service has been created in `symfony/src-pb`.
- Create a new class in `symfony/services/<your-service-name>.php` 
  and implement the generated interface with your logic.
- Register your service implementation in `ProtobufRpcController::MAPPINGS`.
- Register the (autogenerated) Typescript client in an angular module of 
  your choice. See `shared.module.ts` for examples. 


# symfony

The symfony part is located in the `symfony` directory. 

Run `composer install` to install dependencies.

To install the `symfony` command (standard for symfony v5), run the following 
command: 

```shell script
curl -sS https://get.symfony.com/cli/installer | bash
```

You can start a symfony development server using: 

```shell script
cd symfony
symfony server:start
```

Set database credentials in `.env.local` and create database tables/schema:

```shell script
symfony console doctrine:database:create
symfony console doctrine:schema:update --force
```

Create a first admin account. Additional users can be created in the application.

```shell script
symfony console backend:createadmin testuser@domain.tld 'A#Very$ecretPwd'
```


# angular

The angular part is located in the `angular` directory. 

The project was setup with node version v12.12.0 and npm version 6.11.3. 

Run `npm install` to install dependencies. 

To start a development server, run the following command:

```shell script
cd angular
node_modules/.bin/ng serve 
```

If your have the angular CLI globally installed, you can simply run `ng serve`.


# production builds

Make angular production build: 

```shell script
node_modules/.bin/ng build --prod --deleteOutputPath=false
```

Production builds are automatically delivered by symfony. See FrontendController.php.


# testing

```shell script
# run all tests of the application
php bin/phpunit

# Run all tests in the Foo/ directory
php bin/phpunit tests/Foo

# Run all tests in the Foo class 
php bin/phpunit tests/Foo/FooTest.php
```
