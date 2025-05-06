import axios from "axios"
export const getJudge0LanguageId = (langage)=>{
    const langageMap ={
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63
    }
    return langageMap[langage.toUpperCase()]
}

export const submitBatch = async (submissions)=>{
    const {data} = await axios.post()
}