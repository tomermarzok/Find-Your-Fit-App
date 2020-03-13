module.exports={
    QueryGenerator: (reqObj)=>{
        query ={};
        
        for (const [key, value] of Object.entries(reqObj)) {
                if(reqObj[key]!=''){
                    
                    query[key]=value;
                }
          }    
        return query;

    }
}