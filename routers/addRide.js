const express=require('express')
const Rider=require('../models/rider')
const router=express.Router();

router.get('/',async(req,res)=>{
    try{
        const aliens=await Rider.find()
        res.json(aliens)
    }catch(err){
        res.send('Error '+err)
    }
})
// router.get('/:id',async(req,res)=>{
//     try{
//         const aliens=await Rider.findById(req.params.id)
//         res.json(aliens)
//     }catch(err){
//         res.send('Error '+err)
//     }
// })
router.post('/addRide',async(req,res)=>{
    console.log(JSON.stringify(req.body));
    const rider=new Rider({
        name:req.user.displayName,
        phone:req.body.phone,
        vtype:req.body.vtype,
        vnum:req.body.vnum,
        vacancy:req.body.vacancy,
        start:req.body.start,
        dest:req.body.dest,
        departTime:req.body.departTime,
        arrivalTime:req.body.arrivalTime,
        fare:req.body.fare,
    })
    try{
        const a1=await rider.save()
        res.json(a1)
    }catch(err){
        res.send('Error '+err)
    }
})
module.exports=router 