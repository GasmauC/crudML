'use strict';
const productsJSON =  require('../../data/productsDataBase.json')
const products = productsJSON.map(({name, price, discount,description,image,category }) =>{
  return{
    name,
    price,
    discount,
    description,
    image,
    categoryId : category === "visited" ? 1 : 2,// si categoria es  = a visites le corersponde 1 sino 2
    createdAt : new Date(),
    updatedAt : new Date()
  }
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert("Products",
        products, // mandamos el array de products de arriba
    
    {}
    );
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Products', null, {});
    
  }
};
