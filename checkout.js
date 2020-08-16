const express = require('express')

// init router
const router = express.Router()

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

router.get('/update/:order_ID',  async (req, res) => {

    let productid = req.params.productid
    let quantity = parseInt(req.query.quantity)
    let price = parseInt(req.query.price)
    let totalprice = parseInt(req.query.totalprice)
    
    jwt.verify(req, 'illenium', async (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            let result = await updateCart(authData['user']['email'], productid, quantity, price, totalprice)

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
//Post method




//database


async function updateCart(email, data, inc) {
    const client = await connectDB()

    const available = await (await client.db('illenium').collection('inventory').find({ _id: data},{ projection:{_id:0, quantity:1,price:int1,totalprice:int2} }).toArray())[0]['quantity']

    const quantity = await (await getCart(email, data))[0]['cart'][0]['quantity'][ini1]['price'][int2]['totalprice']

    console.log(available)
    console.log(quantity)
    console.log(price)
    console.log(totalprice)
    console.log(inc)

    if(quantity + inc <= available) {
        const result = await (await client.db('illenium').collection('users').updateOne({ cart: { $elemMatch: {product: data, price:int1,totalprice:int2}}}, {$inc: { 'cart.$.quantity': inc,} }).catch(Error)).modifiedCount
        console.log(result)
        return result
    } else {
        return 0
    }
    
}


async function getCart(email, data){
    const client = await connectDB()
    const result = await client.db('illenium').collection('users').find({ email:email, cart: { $elemMatch: {product: data,price,totalprice}} }, { projection:{_id:0, 'cart.$' : 1}}).toArray()
    client.close()
    return result
}
 

module.exports = router
