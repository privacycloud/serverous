# Serverous

[![Build Status](https://travis-ci.org/privacycloud/serverous.svg?branch=master)](https://travis-ci.org/privacycloud/serverous)

<!-- TOC depthFrom:2 depthTo:3 -->

- [Usage](#usage)
  - [How to work with mocks](#how-to-work-with-mocks)
- [Contributing](#contributing)

<!-- /TOC -->

---

Project Maintainer: [@sergioalvz](https://github.com/sergioalvz)

---

## Usage

Using `serverous` with `docker-compose` is, by far, the easiest way to setup the project. Since `serverous` is distributed as a Docker image, it can be easily loaded as a Compose service.

Take the following YAML sample definition:

```yml
version: '3'

services:
  api:
    # Load the serverous image from the registry
    image: privacycloud/serverous:1.1.1
    # Point to the OpenAPI spec that you want to mock
    environment:
      - OPEN_API_SPEC=http://example.com/swagger.json
    # Expose the default port
    ports:
      - 3000:3000
    # Mount your own mocks at ./your/own/mocks
    # into /etc/mocks on the container
    volumes:
      - ./your/own/mocks:/etc/mocks

```

By typing `docker-compose up --build` with the previous configuration, `serverous` will automatically start a web server at <http://localhost:3000> which will validate any incoming request against the OpenAPI definition.

### How to work with mocks

`serverous` reads your OpenAPI definition and creates a new route for each specific path. For example, if the following path is defined:

```text
GET /pet/{petId}
```

`serverous` will create an endpoint `/pet/{petId}` which will be able to receive and process `GET` requests.

Since OpenAPI can contain validations, `serverous` will also check that incoming requests match those definitions by validating their _query params_ (if any), _payload_ (if any) and _headers_.

If everything goes fine, `serverous` will look over `/etc/mocks` to return any matching mock for the request. The way to define mocks for any request is by creating a directory structure which respects the path definition and its related HTTP verb.

For example, if you want to generate a mock for the previous route: `GET /pet/{petId}`, you would need to create the following structure into the mocks volume:

 ```text
 /etc/mocks
└── pet
    └── {petId}
        └── get.(js|json)
 ```

`get.(js|json)` will be the file responsible of returning the mock. It can be both: a JSON file which directly returns the response or a JavaScript file which exports a function.

#### JSON mocks

As easy as directly returning the expected response:

```json
{
  "data": [
    {
      "name": "Tob",
      "type": "dog",
      "age": 3
    },
    {
      "name": "Pelican",
      "type": "cat",
      "age": 1
    }
  ]
}
```

#### JavaScript mocks

Export a function which respects the following signature:

> **NOTE**: Since this function is going to be evaluated into the `serverous` itself, it is not possible to `import` or `require` any dependency from your _host_ project.

```javascript
module.exports = ({ req, h, faker }) => {
  return {
    // Response
  };
};
```

| Parameter | Description |
| --------- | ----------- |
| `req`     | A [Request](https://hapijs.com/api/17.2.2#request) instance |
| `h`       | A [ResponseToolkit](https://hapijs.com/api/17.2.2#response-toolkit) instance |
| `faker`   | A [Faker](https://github.com/marak/Faker.js/) instance (for convenience in case of generating random / fake data) |

#### Hot reloading mocks

Support for hot-reloading mocks once the `serverous` instance is running is limited to JSON mocks (since they are read everytime a request is received). JavaScript mocks, on the other hand, do not support hot-reloading at this moment and it is needed to stop/start the server to make new changes to take effect.

## Contributing

Read our [contributing guide](https://github.com/privacycloud/serverous/blob/master/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to `serverous`.
