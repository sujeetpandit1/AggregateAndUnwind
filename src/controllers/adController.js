const adsModel = require('../models/adsModel');
const adModel = require('../models/adsModel')


const createAd = async (req, res) => {
 
    try {
       
        let data= req.body
        if(Object.keys(data) === 0) return res.status(400).send({status:false, message: "enter the details"});
        const msg={};
        // if(!data.companyId) msg.companyIdError = "please enter companyId"
        if(!data.primaryText) msg.primaryTextError = "please enter primaryText"
        if(!data.headline) msg.headlineError = "please enter headline"
        if(!data.description) msg.descriptionError = "please enter description"
        if(!data.CTA) msg.CTAError = "please enter CTA"
        if(!data.imageUrl) msg.imageUrlError = "please enter imageUrl"
        if(Object.keys(msg).length > 0) return res.status(400).send({status:false, message:msg});

        const savedAd = await adModel.create(data)
        return res.status(201).send({status:true, data: "Ad Data Saved Successfully", savedAd});
        

    } catch (error) {
        console.log(error);

        return res.status(500).send({status:false, message: error.message});

        
    }


};


const getAdList = async (_req, res) =>{

  try {
    let getData= await adModel.find()
    if (!getData.length > 0) return res.status(404).send({ status: false, message: " Not Found" });
        return res.status(200).send({ status: true, count: getData.length, message: getData })
    
  } catch (error) {
    return res.status(500).send({status:false, message: error.message})
    
  }  
};


const search = async (req, res) => {

    try {
        const searchTerm= req.query.text
        const searchContetnt = [{
                $lookup: {
                from: 'companies',
                localField: 'companyId',
                foreignField: '_id',
                as: 'companyName'
              }
            },
            {$unwind: '$companyName'},
            {
                $match: {
                  $or: [
                    { 'companyName.companyName': { $regex: searchTerm, $options: 'i' } },
                    { primaryText: { $regex: searchTerm, $options: 'i' } },
                    { headline: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } }
                  ]
                }
              }
        ]

    let getAd = await adsModel.aggregate(searchContetnt);
    return res.status(200).send({ status: true, count: getAd.length, message:`Fetch Data Successfully`, getAd })
    } catch (error) {
    return res.status(500).send({status:false, message: error.message})
    }
}


module.exports={createAd, getAdList,search}