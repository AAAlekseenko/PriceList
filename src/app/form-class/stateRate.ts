export const stateRate: any = {
  "air": {
    "economy": {
      "type": 'Аэрофлот',
      "name": 'Эконом',
      "price": 4,
      "luggageBefore": 5,
      "luggage": 4000,
      "maxLuggage": 20,
    },
    "advanced": {
      "type": 'Аэрофлот',
      "name": 'Продвинутый',
      "price": 8,
      "luggageBefore": 20,
      "luggage": 5000,
      "maxLuggage": 50,
      "child": {
        "age": 7,
        "discount": 30,
        "withLuggage": false
      }
    },
    "suite": {
      "type": 'Аэрофлот',
      "name": 'Люкс',
      "price": 15,
      "luggageBefore": false,
      "luggage": false,
      "maxLuggage": 50,
      "child": {
        "age": 16,
        "discount": 30,
        "withLuggage": false
      }
    }
  },

  "railway": {
    "economy": {
      "type": 'РЖД',
      "name": 'Эконом',
      "price": 0.5,
      "luggageBefore": 15,
      "maxLuggage": 50,
      "afterMaxLuggagePrice": 50,
      "child": {
        "age": 5,
        "discount": 50,
        "withLuggage": false
      }
    },
    "advanced": {
      "type": 'РЖД',
      "name": 'Продвинутый',
      "price": 2,
      "luggageBefore": 20,
      "maxLuggage": 60,
      "afterMaxLuggagePrice": 50,
      "child": {
        "age": 8,
        "discount": 30,
        "withLuggage": false
      }
    },
    "suite": {
      "type": 'РЖД',
      "name": 'Люкс',
      "price": 4,
      "luggageBefore": false,
      "maxLuggage": 60,
      "child": {
        "age": 16,
        "discount": 20,
        "withLuggage": true
      }
    }
  }
}
