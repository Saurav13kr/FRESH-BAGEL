const Menu = require('../../models/menu')
const Table = require('../../models/table')
const Ind = require('../../models/individual')

function homeController(){
    return {
        async index(req, res){
            const freshbagel= await Menu.find()
            const freshbagel1= await Table.find()
            const freshbagel2= await Ind.find()
            return  res.render('home',{freshbagel:freshbagel,freshbagel1:freshbagel1,freshbagel2:freshbagel2}) 
            
        }
 
    }
}

module.exports = homeController

