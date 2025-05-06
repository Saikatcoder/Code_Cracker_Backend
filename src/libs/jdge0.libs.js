import axios from "axios"
export const getJudge0LanguageId = (langage)=>{
    const langageMap ={
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63
    }
    return langageMap[langage.toUpperCase()]
}

export const poolBatchResults = async (tokens)=>{
    // pooling for all time hit the end poind and ask its complete or not
    while(true){
        const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:false,
            }
        })

        const result = data.submissions
        const isAllDone = result.every((r)=>r.status.id !== 1 && r.status.id !== 2)
        if(isAllDone) return result
    }
}


export const submitBatch = async (submissions)=>{
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/?base64_encoded=false`,{submissions})

    console.log("submission Result:", data);
    return data
    
}



