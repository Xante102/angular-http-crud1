const faker = require("faker");
const database = { products: [] };
for (let i = 1; i <= 50; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.lorem.sentences(),
    imageUrl: "https://source.unsplash.com/1600x900/?food",
    quantity: faker.datatype.number(),
  });
}
console.log(JSON.stringify(database));
