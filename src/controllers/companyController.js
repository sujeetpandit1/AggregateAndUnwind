const companyModel = require ('../models/companyModel')


const createCompany = async (req, res) => {
 
    try {
       
        let data= req.body
        if(Object.keys(data) === 0) return res.status(400).send({status:false, message: "enter Company Name  and URL"});
        const msg={};
        if(!data.companyName) msg.companyNameError = "please enter company name"
        if(!data.URL) msg.URLError = "please enter URL"
        if(Object.keys(msg).length > 0) return res.status(400).send({status:false, message:msg});

        const savedCompany = await companyModel.create(data)
        return res.status(201).send({status:true, data: "Company Data Saved Successfully", savedCompany});
        

    } catch (error) {
        return res.status(500).send({status:false, message: error.message})
        
    }


};


const getList = async (_req, res) =>{

  try {
    let getData= await companyModel.find()
    if (!getData.length > 0) return res.status(404).send({ status: false, message: " Not Found" });
        return res.status(200).send({ status: true, count: getData.length, message: getData })
    
  } catch (error) {
    return res.status(500).send({status:false, message: error.message})
    
  }  
};

module.exports={createCompany, getList}