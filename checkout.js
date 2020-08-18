const express = require('express')
//connect mongodb((
const mongodb =  require('mongodb')

// init router
const router = express.Router()


//connect db
const connection_string = encodeURI('mongodb+srv://illenium_backend:Sc97s820skQKJWQb@illenium.lyr07.gcp.mongodb.net/illenium?retryWrites=true&w=majority')

//load Userdetails details
const userdetails = require('../details/userdetails');

//Get method

router.get('/',(req,res) => res.send("checkout"))

// get the product details
router.get('/',(req ,res)=>{

    let order = req.query.order

    let order_status =  product(product_details)

    let order_ID = req.query.order_ID

    if(order_status>0){

        res.send('Your requested the order ID $ {req.params.order_ID}')
    }


else{

res.send('Product not found')

}
})

//Post method

router.post('/update/:order_ID',  async (req, res) => {

    let productid = req.params.productid
    let quantity = parseInt(req.query.quantity)
    let price = parseInt(req.query.mrp)
    let totalprice = parseInt(req.query.totalprice)

  
    
    jwt.verify(req, 'illenium', async (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            let result = await updateCart(authData['user']['email'] ,quantity,mrp ,totalprice,productid)

            if(result > 0) {
                res.json({
                    msg: 'Generate a bill && Add more to cart '
                 
                })

            } 
           
            
            else {
                res.json({
                    msg: 'Something is wrong please check again'
                })
            }

        }
    })
})





//database


async function updateCart(email, data, inc) {
    const client = await connectDB()

    const available = await (await client.db('illenium').collection('inventory').find({ _id: data},{ projection:{_id:0, quantity:1,mrp:int1,totalprice:int2} }).toArray())[0]['quantity']

    const quantity = await (await getCart(email, data))[0]['cart'][0]['quantity'][ini1]['mrp'][int2]['totalprice']

    console.log(available)
    console.log(quantity)
    console.log(mrp)
    console.log(totalprice)
    console.log(inc)

    if(quantity + inc <= available) {
        const result = await (await client.db('illenium').collection('users').updateOne({ cart: { $elemMatch: {product: data, mrp:int1,totalprice:int2}}}, {$inc: { 'cart.$.quantity': inc,} }).catch(Error)).modifiedCount
        console.log(result)
        return result
    } else {
        return 0
    }
    
}


async function getCart(email, data){
    const client = await connectDB()
    const result = await client.db('illenium').collection('users').find({ email:email, cart: { $elemMatch: {product: data,mrp,totalprice}} }, { projection:{_id:0, 'cart.$' : 1}}).toArray()
    client.close()
    return result
}
 
async function connectDB() {
    const client = await mongodb.MongoClient.connect(connection_string, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    return client
}



module.exports = router
