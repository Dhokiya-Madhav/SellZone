var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    userId:String,
    product_title: String,
    product_desc: String,
    product_type: String, 
    product_price: Number,
    state:String,
    city:String,
    img: String
},
{
    collection: "product-details",
}
);

const product = mongoose.model('ProductInfo', productSchema);
module.exports={product}
