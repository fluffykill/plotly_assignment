## Description

Plolty NestJS Assignment

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Example Mutations
To Create A User
```
mutation{
  createUser(
    createUserInput: {
      name: "Test1",
      age: 1,
      email: "test@test.ca",
      orderId: "1,2,3"
    }
  )
}
```

To Create A Product
```
mutation{
  createProduct(createProductInput:{
    name: "product1",
    price: 1.5,
  })
}
```

## Queries
Find A Single User From User ID
```
{
  findUser(id: 1) {
    id
    name
    email
    order {
      name
      price
    }
  }
}
```

Find All Users
```
{
  findAllUser{
    id
    name,
    age,
    email,
    order{
      name,
      price
    }
  }
}
```

Find Single Product From Product ID
```
{
  findProduct(id: 1){
    id,
    name,
    price
  }
}
```

Find All Products
```
{
  findAllProduct{
    id,
    name,
    price
  }
}
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
