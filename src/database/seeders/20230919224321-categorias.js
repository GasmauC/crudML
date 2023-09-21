'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert(
        'Categories', 
      [
        {
        name: 'visited',
        image:null,
        createdAt: new Date(),// me crea una marca de tiempo
        updatedAt: new Date(),
        
      },
      {
        name: 'in-sale',
        image:null,
        createdAt: new Date(),// me crea una marca de tiempo
        updatedAt: new Date(),
        
      }
    ], 
    {}
    );
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
