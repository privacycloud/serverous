module.exports = ({ req, h, faker }) => {
  const pets = Array(faker.random.number(10))
    .fill()
    .map(() => {
      return {
        name: faker.random.word(),
      };
    });

  return h.response(pets).code(201);
};
