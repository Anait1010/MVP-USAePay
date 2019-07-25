const faker = require('faker');
const moment = require('moment');
const { review } = require('./models.js');

const fakeData = [];


for (let i = 0; i < 30; i += 1) {
  let picArr = ['https://www.fodors.com/wp-content/uploads/2019/01/shutterstock_1255481941.jpg', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/75/c3/36.jpg', 'https://data.whicdn.com/images/69520055/original.jpg', 'https://drwyjmricaxm7.cloudfront.net/blog/wp-content/uploads/2018/07/St-Basils-Cathedral-in-Moscow-Russia.jpg', 'https://cdn.thecrazytourist.com/wp-content/uploads/2017/11/Kaiserburg.jpg', 'https://www.nyhabitat.com/blog/wp-content/uploads/2014/04/Paris-france-summer-guide-eiffel-tower-trocadero-fountains.jpg', 'https://i.ytimg.com/vi/4W2c7JJdZQY/maxresdefault.jpg'];
  let rand = picArr[Math.floor(Math.random() * picArr.length)];

  const document = {
    id: Math.floor(Math.random() * 10),
    image_url: rand,
    reviewer_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    star_rate: Math.floor(Math.random() * 6),
    // review_date: moment(faker.date.past()).format('MMM DD, YY'),
    review_description: faker.lorem.paragraphs(),
    likes_count: Math.floor(Math.random() * 1000),
  };

  fakeData.push(document);
}

review.insertMany(fakeData)
  .then(() => {
    console.log('data is successfully seeded!');
  });
