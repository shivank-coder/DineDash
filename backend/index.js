const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const Stripe = require('stripe')

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8080
//mongodb-connection
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connected to Database"))
.catch((err)=>console.log(err))



//cart schema 
// Cart Schema
const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const cartModel = mongoose.model('cart', cartSchema);

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type : String,
        unique : true
    },
    password: String,
    confirmpassword: String,
    image: String,
});

//
const userModel = mongoose.model("user",userSchema)

//api
app.get("/",(req,res)=>{
    res.send("server is running")
})

//sign up
app.post('/Signup', async(req, res) => {
    console.log(req.body)
    const {email} = req.body
  
    userModel.findOne({email : email},(err, result) => {
      console.log(result);
      console.log(err);
      if (result) {
        res.send({ message: "Email id is already registered",alert : false});
      } else {
        const data = userModel(req.body);
        const save = data.save();
        res.send({ message: "Successfully signed up",alert : true});
      }
    })
  })

//api login
app.post("/login", (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  userModel.findOne({ email: email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({
        message: "Login successfull",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  });
});


// //post request to card schema 
// app.post('/cart', async (req, res) => {
//   const { userId, items } = req.body;

//   try {
//     // Check if the user already has a cart
//     let cart = await cartModel.findOne({ userId });

//     if (cart) {
//       // Update existing cart
//       cart.items = items;
//     } else {
//       // Create a new cart
//       cart = new cartModel({ userId, items });
//     }

//     await cart.save();
//     res.status(200).json({ message: 'Cart saved successfully', cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving cart', error });
//   }
// });


//get request for card schema 
// app.get('/cart/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const cart = await cartModel.findOne({ userId }).populate('items.productId');
//     res.status(200).json(cart ? cart.items : []);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error retrieving cart', error });
//   }
// });






//product section
const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)

//save product in data 
//api
app.post("/uploadProduct",async(req,res)=>{
  const data = await productModel(req.body)
  //console.log(data);
  const datasave = await data.save()
  res.send({message : "Upload successfully"})
})
//const productModel = mongoose.model("product",schemaProduct)

//
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  //console.log(data);
  res.send(JSON.stringify(data))
})

/****Payment gateway****/
console.log(process.env.STRIPE_SECRET_KEY)


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    // Prepare the parameters for the checkout session
    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [{ shipping_rate: 'shr_1OdZA3SJ6Ij3FdkhiWHq19WM' }],
      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.name,
              // images: [item.image] // Add images if needed
            },
            unit_amount: item.price * 100, // Stripe uses the smallest currency unit (e.g., paise for INR)
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    // Create a session with Stripe
    const session = await stripe.checkout.sessions.create(params);

    // Return the sessionId to the frontend
    console.log(session.id);
    res.status(200).json({ sessionId: session.id });
  } catch (err) {
    // Handle any errors that occur during the session creation
    res.status(err.statusCode || 500).json(err.message);
  }
});




//server is running
app.listen(PORT,()=>console.log("server is running at port:" + PORT)) 