var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    userId:String,
    product_title: String,
    product_desc: String,
    product_type: String, 
    product_price: Number,
    state:String,
    city:String,
    img1:
    {
        data: Buffer,
        contentType: String
    },
    img2:
    {
        data: Buffer,
        contentType: String
    },
    img3:
    {
        data: Buffer,
        contentType: String
    },
    img4:
    {
        data: Buffer,
        contentType: String
    }
},
{
    collection: "product-details",
}
);

module.exports = mongoose.model('ProductInfo', productSchema);
