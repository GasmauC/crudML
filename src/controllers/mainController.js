/*BASE DE DATOS */
const { error } = require('console');
const db = require('../database/models')
const { Sequelize } = require('sequelize')
const Op = db.Sequelize.Op

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		/*return res.render('index',{
			visited: products.filter(product =>product.category === 'visited'),
			sale: products.filter(product=> product.category === 'in-sale'),
			toThousand
		}
	})*/
	const visited = db.Product.findAll({
		where:{
			categoryId: 1
		}
	});
	const sale = db.Product.findAll({
		where: {
			categoryId: 2
		}
	})
	Promise.all([visited,sale])
		.then(([visited,sale]) =>{
			return res.render('index',{
				visited,
				sale,
				toThousand
			})
		}).catch(error =>console.log(error))
},
	search: (req, res) => {
		// Do the magic
		const keywords = req.query.keywords
		
		//const results = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()))
		 const results =  db.Product.findAll({
			where: {
				name: {
				  [Op.like]: `%${keywords}%`
				}
			  },
		})
			
			.then((results)=>{
				return res.render('results',{
					results,
					toThousand,
					keywords
				})
			}).catch(error =>console.log(error))
	}
};

module.exports = controller;
